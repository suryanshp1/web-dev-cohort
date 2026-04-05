import gradio as gr
import os
import time
from dotenv import load_dotenv
from pageindex import PageIndexClient

load_dotenv()

client = PageIndexClient(api_key=os.getenv("PAGEINDEX_API_KEY"))


# ---- Upload PDF ----
def load_pdf(file):
    if file is None:
        return "❌ Please upload a PDF first.", ""

    try:
        result = client.submit_document(file.name)
        doc_id = result["doc_id"]

        # wait for processing
        while True:
            status = client.get_document(doc_id)["status"]
            if status == "completed":
                break
            elif status == "failed":
                return "❌ Processing failed.", ""
            time.sleep(2)

        return f"✅ PDF processed successfully!", doc_id

    except Exception as e:
        return f"❌ Error: {str(e)}", ""


# ---- Chat ----
def chat(message, history, doc_id):
    print("DEBUG DOC_ID:", doc_id)  # 👈 IMPORTANT DEBUG

    if history is None:
        history = []

    if not doc_id:
        history.append({
            "role": "assistant",
            "content": "❌ Upload a PDF first."
        })
        return history

    try:
        response = client.chat_completions(
            messages=[{"role": "user", "content": message}],
            doc_id=doc_id
        )

        answer = response["choices"][0]["message"]["content"]

        history.append({
            "role": "user",
            "content": message
        })
        history.append({
            "role": "assistant",
            "content": answer
        })

        return history

    except Exception as e:
        history.append({
            "role": "assistant",
            "content": f"❌ Error: {str(e)}"
        })
        return history


# ---- UI ----
with gr.Blocks() as app:
    gr.Markdown("# 📄 PageIndex Chat (Vectorless RAG 🚀)")

    # hidden storage (THIS FIXES EVERYTHING)
    doc_id_box = gr.Textbox(visible=False)

    with gr.Row():
        file_input = gr.File(label="Upload PDF", file_types=[".pdf"])
        upload_btn = gr.Button("Index PDF")

    status = gr.Textbox(label="Status", interactive=False)

    chatbot = gr.Chatbot(height=400)

    msg = gr.Textbox(label="Ask a question")

    send_btn = gr.Button("Send")

    # ---- Actions ----
    upload_btn.click(
        load_pdf,
        inputs=file_input,
        outputs=[status, doc_id_box]
    )

    send_btn.click(
        chat,
        inputs=[msg, chatbot, doc_id_box],
        outputs=chatbot
    ).then(lambda: "", None, msg)

    msg.submit(
        chat,
        inputs=[msg, chatbot, doc_id_box],
        outputs=chatbot
    ).then(lambda: "", None, msg)


app.launch()