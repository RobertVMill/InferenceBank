const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Use environment variable for security

export const fetchNewsArticles = async (query: string = 'AI finance', pageSize: number = 10, page: number = 1) => {
  try {
    // Build the API URL with query parameters
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}&pageSize=${pageSize}&page=${page}&sortBy=publishedAt&language=en`;

    // Make the fetch request to the News API
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();

    // Return the array of articles
    return data.articles;
  } catch (error) {
    console.error('Failed to fetch news articles:', error);
    return []; // Return an empty array in case of error
  }
};
