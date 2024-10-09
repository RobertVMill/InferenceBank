// services/langchainService.ts

import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

const model = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const memory = new BufferMemory();

export const conversation = new ConversationChain({
  llm: model,
  memory: memory,
});

export const sendMessage = async (input: string) => {
  try {
    const response = await conversation.call({ input });
    return response.response;
  } catch (error) {
    console.error("Error in LangChain conversation:", error);
    throw new Error("Failed to process your request.");
  }
};
