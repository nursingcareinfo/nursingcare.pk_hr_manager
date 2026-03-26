import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function screenResume(resumeText: string, jobRequirements: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Analyze the following resume based on the job requirements.
    Provide a JSON response with:
    - score: (0-100)
    - strengths: string[]
    - concerns: string[]
    - recommendation: "Yes" | "No" | "Maybe"
    - summary: string

    Job Requirements:
    ${jobRequirements}

    Resume Text:
    ${resumeText}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Screening Error:", error);
    return null;
  }
}
