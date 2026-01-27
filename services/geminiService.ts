import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
// Note: This relies on the API_KEY being present in the environment variables.
// In a real build pipeline, ensure process.env.API_KEY is replaced or injected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Summarizes a CRM thread or signal.
 * This is a foundational method for future expansion where users might 
 * want to summarize the "Last Activity" chain.
 */
export const summarizeSignal = async (signalText: string, activityContext: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key not found. Returning mock summary.");
    return "AI Summary unavailable (Missing Key).";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following CRM signal and activity into a concise 10-word status:
      Signal: ${signalText}
      Activity: ${activityContext}`,
    });
    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
};

/**
 * Generates a suggested response for a "Needs Attention" item.
 */
export const generateResponseSuggestion = async (customerName: string, context: string): Promise<string> => {
  if (!process.env.API_KEY) return "Draft reply unavailable.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a professional, short email response to ${customerName} regarding: ${context}. Keep it under 50 words.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating suggestion:", error);
    return "";
  }
};
