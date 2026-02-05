
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AIResponse } from "../types";

const API_KEY = process.env.API_KEY || "";

export const processStudyMaterial = async (content: string): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Analyze the following study material and provide a structured JSON response.
    Content: "${content}"
    
    The response must follow this schema:
    {
      "summary": "Bullet points highlighting exam-oriented facts",
      "simpleExplanation": "Beginner-friendly explanation in simple English",
      "questions": "Generate short, long, and conceptual questions",
      "score": 0-100 (Speech Quality Score based on clarity, simplicity, readability),
      "feedback": "Why the score was given",
      "keywords": ["list", "of", "important", "keywords"],
      "difficulty": "Easy" | "Medium" | "Hard",
      "readingTime": "Estimated time like '5 mins'"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          simpleExplanation: { type: Type.STRING },
          questions: { type: Type.STRING },
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          difficulty: { type: Type.STRING },
          readingTime: { type: Type.STRING }
        },
        required: ["summary", "simpleExplanation", "questions", "score", "feedback", "keywords", "difficulty", "readingTime"]
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  return data;
};

export const generateStudySpeech = async (text: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read this study summary clearly and encouragingly: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("No audio generated");
  
  // Convert PCM raw to a play-ready format (for demo purposes, we treat it as data URI)
  // Note: Standard Gemini TTS returns raw PCM 24khz. In a real app we'd decode this.
  return base64Audio;
};

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
