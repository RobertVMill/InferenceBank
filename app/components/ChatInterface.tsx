import { useState } from 'react';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]); // Chat history
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add the user's message to the chat history
    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    try {
      // Send the user input to the OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage], // Include all past messages in the request
        }),
      });

      const data = await response.json();

      // Validate the assistant message format
      if (data && data.message && data.message.role && data.message.content) {
        const assistantMessage = data.message;
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        console.error('Invalid assistant message format:', data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: 'Error: Could not retrieve a valid response. Please try again.' },
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch OpenAI response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, there was an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
      setInput(''); // Clear the input field
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Chat with AI</h2>

      {/* Chat history with scrollable container */}
      <div className="chat-box mb-4 max-h-64 overflow-y-auto border p-2 rounded-lg bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message?.role === 'user' ? 'text-right' : 'text-left'}`} // Handle undefined role
          >
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                message?.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {message?.content || 'No content available.'} {/* Handle undefined content */}
            </p>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>

      {/* Input and button section */}
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

export default ChatInterface;
