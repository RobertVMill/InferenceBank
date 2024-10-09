import { useEffect, useState } from 'react';
import NewsFeed from '@/components/NewsFeed';
import { fetchNewsArticles } from '@/services/newsService';
import { Sidebar } from '@/components/Sidebar';  // Add sidebar component
import { Header } from '@/components/Header';    // Add header component

// Define the type for the articles
type Article = {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true); // Start loading
        const fetchedArticles = await fetchNewsArticles();
        setArticles(fetchedArticles);
        setLoading(false); // Stop loading when data is fetched
      } catch (err) {
        setError('Failed to load articles');
        setLoading(false); // Stop loading on error
      }
    };

    getArticles();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header */}
        <Header />

        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Latest AI & Finance News</h2>

          {/* Display loading state */}
          {loading && <p>Loading articles...</p>}

          {/* Display error if any */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display the articles in the NewsFeed */}
          {!loading && !error && articles.length > 0 && (
            <NewsFeed articles={articles} />
          )}
        </main>
      </div>
    </div>
  );
}
