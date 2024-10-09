const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNewsArticles = async (query: string = 'AI finance') => {
  if (!NEWS_API_KEY) {
    console.error('Missing News API Key');
    return [];
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${NEWS_API_KEY}`;

    console.log('Fetching News Articles from:', url); // Debugging URL

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const textResponse = await response.text();
    console.log('Raw API Response:', textResponse); // Raw response for inspection

    try {
      const data = JSON.parse(textResponse);
      console.log('Parsed API Response:', data); // Parsed response for inspection

      // Verify if articles exist in the response
      if (data.articles && Array.isArray(data.articles)) {
        return data.articles;
      } else {
        console.warn('No articles found in API response.');
        return [];
      }
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch news articles:', error);
    return [];
  }
};
