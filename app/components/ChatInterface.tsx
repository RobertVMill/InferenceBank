import { useState } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid"; // Adjusted icon import for Heroicons v2

const ChatInterface = ({ isChatOpen, toggleChat }: { isChatOpen: boolean; toggleChat: () => void }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data && data.message && data.message.role && data.message.content) {
        const assistantMessage = data.message;
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        console.error("Invalid assistant message format:", data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content:
              "Error: Could not retrieve a valid response. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch OpenAI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, there was an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
        onClick={toggleChat} // Toggle chat visibility
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </button>

      {/* Chat interface as a wider shelf */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        } w-96`} // Increased width to 24rem (w-96)
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat with AI</h2>
          <button onClick={toggleChat} className="text-gray-500">
            ✖
          </button>
        </div>

        {/* Chat history */}
        <div className="chat-box p-4 flex-grow overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.role === "user" ? "bg-blue-400" : "bg-gray-200"
                }`}
              >
                {message.content || "No content available."}
              </p>
            </div>
          ))}
          {loading && <p>Loading...</p>}
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-4 border-t flex items-center">
          <textarea
            className="flex-1 p-2 border rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything..."
            required
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
    </>
  );
};

export default ChatInterface;
