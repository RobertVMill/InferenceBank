// app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Log the messages being sent to OpenAI
    console.log('Messages being sent to OpenAI:', messages);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4', // or 'gpt-3.5-turbo'
        messages,
        max_tokens: 150, // Limit the response length
        temperature: 0.7, // Control randomness
      }),
    });

    const data = await response.json();

    // Log the response from OpenAI
    console.log('Response from OpenAI:', data);

    if (!response.ok) {
      console.error(`OpenAI API Error: ${response.statusText}`);
      return NextResponse.json({ error: 'Failed to fetch OpenAI response' }, { status: 500 });
    }

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', data);
      return NextResponse.json({ error: 'Invalid OpenAI response format' }, { status: 500 });
    }

    const message = data.choices[0].message;
    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    return NextResponse.json({ error: 'Failed to fetch OpenAI response' }, { status: 500 });
  }
}
