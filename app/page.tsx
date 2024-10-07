"use client"; // This tells Next.js that this is a Client Component

import { useEffect, useState } from "react";
import { fetchNewsArticles } from "@/services/newsService"; // Import the fetch function
import CustomImage from "@/components/CustomImage"; // Import the custom image component for external images
import Image from "next/image";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]); // State to hold news articles
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch news articles when the component mounts
  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchNewsArticles(); // Call the API
        setArticles(fetchedArticles); // Set the articles in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Failed to fetch articles", error);
        setLoading(false);
      }
    };

    getArticles(); // Invoke the function
  }, []);

  // Filter articles that have missing or removed images
  const validArticles = articles.filter(
    (article) => article.urlToImage && article.urlToImage !== "[Removed]"
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Logo and App Name */}
        <Image
          className="dark:invert"
          src="/images/IB.png" // Replace with your logo path
          alt="InferenceBank logo"
          width={200}
          height={50}
          priority
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Welcome to InferenceBank
        </h1>
        <p className="text-lg sm:text-xl text-center sm:text-left max-w-xl">
          Stay ahead with the latest AI-driven financial insights, personalized
          to your preferences.
        </p>

        {/* News Section */}
        <div className="mt-8 w-full max-w-7xl">
          <h2 className="text-2xl font-semibold mb-4">Latest AI & Finance News</h2>
          {loading ? (
            <p>Loading news...</p>
          ) : validArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {validArticles.map((article, index) => (
                <div key={index} className="mb-8">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <CustomImage
                      src={article.urlToImage || "/images/placeholder.jpg"} // Use placeholder if no image
                      alt={article.title}
                      width={600}
                      height={400}
                      className="rounded-lg object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p className="text-gray-600">{article.description}</p>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No articles found.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <a
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-600 text-sm sm:text-base h-10 sm:h-12 px-5 sm:px-7"
            href="/dashboard"
            aria-label="Go to Dashboard"
          >
            Go to Dashboard
          </a>
          <a
            className="rounded-full border border-solid border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-5 sm:px-7"
            href="/insights"
            aria-label="Explore Insights"
          >
            Explore Insights
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mt-10">
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
