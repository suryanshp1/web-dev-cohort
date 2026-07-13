import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

export const apiKeyChecker = () => {
    if(!API_KEY) {
        console.error("OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.");
        process.exit(1);
    }
};

export const checkOpenAI = async () => {
    const openai = (await import("openai")).default;
    const client = new openai({ apiKey: API_KEY });
    if (!client) {
        console.error("OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.");
        process.exit(1);
    }
    console.log("OpenAI client initialized.");
    return client;
}