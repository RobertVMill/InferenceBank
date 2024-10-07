import { useEffect, useState } from 'react';
import NewsFeed from '@/components/NewsFeed';
import { fetchNewsArticles } from '@/services/newsService';

export default function NewsPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from NewsAPI when the component mounts
    const getArticles = async () => {
      const fetchedArticles = await fetchNewsArticles();
      setArticles(fetchedArticles);
    };

    getArticles();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Latest AI & Finance News</h1>

      {/* Display the articles in the NewsFeed */}
      <NewsFeed articles={articles} />
    </div>
  );
}
