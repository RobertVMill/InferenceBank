// app/services/openAIService.ts

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const fetchOpenAISummary = async (messages: Array<{ role: string, content: string }>) => {
  const url = `https://api.openai.com/v1/chat/completions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4', // You can also use 'gpt-3.5-turbo'
        messages,
        temperature: 0.7, // Adjust the temperature for creativity
        max_tokens: 500, // Limit the response length
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content; // Return the response from OpenAI
  } catch (error) {
    console.error('Failed to fetch summary:', error);
    return 'Sorry, I am unable to provide a summary at the moment.';
  }
};
