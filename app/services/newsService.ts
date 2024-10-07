const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Use environment variable

export const fetchNewsArticles = async (query: string = 'AI finance') => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&apiKey=${NEWS_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles; // Return the array of articles
  } catch (error) {
    console.error('Failed to fetch news articles:', error);
    return []; // Return empty array on failure
  }
};
