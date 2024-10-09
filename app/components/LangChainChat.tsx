// components/LangChainChat.tsx

import { useState } from "react";

const LangChainChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("/api/langchainChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data && data.response) {
        const assistantMessage = { role: "assistant", content: data.response };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("Failed to fetch LangChain response:", error);
    } finally {
      setLoading(false);
      setInput(""); // Clear the input field
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Chat with AI (LangChain)</h2>

      <div className="chat-box mb-4 max-h-64 overflow-y-auto border p-2 rounded-lg bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}
          >
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                message.role === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center">
        <textarea
          className="flex-1 p-2 border rounded-lg max-h-24 overflow-y-auto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI anything..."
          required
          rows={1}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LangChainChat;
