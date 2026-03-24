const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function expandToSentence(rawInput) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_key_here') {
    // Return mock for local testing without key
    console.warn("No valid Gemini API key found, returning mock sentence.");
    return `Did you mean something related to ${rawInput}?`;
  }

  const prompt = `You are an AAC (Augmentative and Alternative Communication) assistant for a person with ALS who cannot speak. They have typed abbreviated letters to communicate a need. Expand their input into ONE natural, grammatically correct, compassionate sentence that a caregiver would understand. Keep it concise — one sentence only. No explanation, no quotes, just the sentence.

Input: "${rawInput}"
Output:`;

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 60 }
      })
    });

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "";
  }
}
