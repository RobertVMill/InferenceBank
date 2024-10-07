// app/components/ChatSummarizer.tsx

import { useState } from 'react';
import { fetchOpenAISummary } from '@/services/openAIService';

const ChatSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const messages = [
      { role: 'system', content: 'You are a helpful assistant that summarizes news articles and recommends related content.' },
      { role: 'user', content: inputText },
    ];

    const openAISummary = await fetchOpenAISummary(messages);
    setSummary(openAISummary);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Summarize News or Ask for Recommendations</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows={4}
          placeholder="Enter the news or article you want to summarize..."
          required
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Get Summary'}
        </button>
      </form>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default ChatSummarizer;
