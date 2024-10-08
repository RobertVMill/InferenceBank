const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Make sure this key is set correctly

export const fetchNewsArticles = async (query: string = 'AI finance') => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Log the raw text response before parsing JSON
    const textResponse = await response.text();
    console.log('Raw API Response:', textResponse);

    try {
      // Parse the JSON response
      const data = JSON.parse(textResponse);
      return data.articles; // Return only the articles
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError); // Catch JSON parsing errors
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch news articles:', error);
    return [];
  }
};
