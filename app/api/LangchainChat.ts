// pages/api/langchainChat.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { sendMessage } from "@/services/langchainService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const response = await sendMessage(message);
      res.status(200).json({ response });
    } catch (error) {
      console.error("Error handling LangChain API request:", error);
      res.status(500).json({ error: "Failed to process your message" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
