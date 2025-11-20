import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface VerseData {
  reference: string;
  text: string;
}

export async function generateMeaningAndApplication(
  verse: VerseData,
  userName?: string
): Promise<{ meaning: string; application: string }> {
  const nameSnippet = userName ? `Their name is ${userName}.` : "";

  const system = `
You are a warm, Christ-centered Bible teacher.
Explain Scripture in clear, simple, everyday language with faithful application.
Keep your response concise and encouraging - 2-4 sentences each for meaning and application.
  `.trim();

  const user = `
Give a brief "Meaning" and "Application" for this verse.

Verse: ${verse.reference}
Text: "${verse.text}"
${nameSnippet}

Return your answer as JSON with:
{
  "meaning": "...",
  "application": "..."
}
Use 2–4 sentences for each.
  `.trim();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content || "{}";
    const parsed = JSON.parse(raw) as { meaning: string; application: string };
    
    return {
      meaning: parsed.meaning || "God's Word is living and active, revealing His truth to us.",
      application: parsed.application || "Take time today to reflect on how this verse applies to your life."
    };
  } catch (error) {
    console.error("[DailyVerseAI] Error generating meaning/application:", error);
    return {
      meaning: "God's Word is living and active, revealing His truth to us.",
      application: "Take time today to reflect on how this verse applies to your life."
    };
  }
}
