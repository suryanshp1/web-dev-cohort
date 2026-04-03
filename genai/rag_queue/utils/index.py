from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore
from dotenv import load_dotenv

load_dotenv()

pdf_path = Path(__file__).parent / "ddia.pdf"

# Load this file in program
loader = PyPDFLoader(pdf_path)

docs = loader.load()

# print(docs[12])

# split the docs into smaller chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=150
)
chunks = text_splitter.split_documents(documents=docs)

# vector embeddings
embedding_model = OpenAIEmbeddings(
    model="text-embedding-3-large"
)

# check here database dashboard : http://localhost:6333/dashboard
vector_store = QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embedding_model,
    url="http://localhost:6333",
    collection_name="learning_rag",
)

print("Indexing of documents done")