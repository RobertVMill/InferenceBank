"use client";

import { useEffect, useState } from "react";
import { fetchNewsArticles } from "@/services/newsService";
import CustomImage from "@/components/CustomImage";
import Image from "next/image";
import ChatInterface from "@/components/ChatInterface";

type Article = {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news articles when the component mounts
  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchNewsArticles();
        setArticles(fetchedArticles); // Set the articles in state
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch articles:", err); // Log the error in console
        setError("Could not load news at this time. Please try again later.");
        setLoading(false);
      }
    };

    getArticles(); // Invoke the function
  }, []);

  const validArticles = articles.filter(
    (article) => article.urlToImage && article.urlToImage !== "[Removed]"
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-gray-50">
      {/* Chat Interface */}
      <section className="w-full max-w-7xl flex flex-col items-center mb-12">
        <ChatInterface />
      </section>

      <main className="w-full max-w-7xl mx-auto flex flex-col gap-8 items-center sm:items-start">
        <div className="flex items-center justify-center w-full">
          <Image
            className="dark:invert"
            src="/images/IB.png"
            alt="InferenceBank logo"
            width={200}
            height={50}
            priority
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Welcome to InferenceBank
        </h1>
        <p className="text-lg sm:text-xl text-center sm:text-left max-w-xl">
          Stay ahead with the latest AI-driven financial insights, personalized to your preferences.
        </p>

        {/* News Section */}
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
            Latest AI & Finance News
          </h2>

          {loading ? (
            <p className="text-center">Loading news...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : validArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {validArticles.map((article, index) => (
                <article key={index} className="mb-8">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <CustomImage
                      src={article.urlToImage || "/images/placeholder.jpg"}
                      alt={article.title || "News article"}
                      width={600}
                      height={400}
                      className="rounded-lg object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p className="text-gray-600">
                      {article.description || "No description available."}
                    </p>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center">No articles found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mt-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/profile"
          aria-label="Manage Profile"
        >
          Manage Profile
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/learn"
          aria-label="Learn More"
        >
          Learn More
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/help"
          aria-label="Help & Support"
        >
          Help & Support
        </a>
      </footer>
    </div>
  );
}
