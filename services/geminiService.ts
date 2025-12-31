
import { GoogleGenAI } from "@google/genai";
import { CandidateData } from "../types";

export const generateCoverLetter = async (data: CandidateData): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const prompt = `
    Persona:
    You are an expert Career Coach and Senior Recruiter. You excel at taking raw data about a candidate's background and weaving it into a compelling, cohesive narrative that fits a specific job opening.

    Task:
    Write a professional cover letter by synthesizing the data from the following input slots:
    - Personal Details: ${data.personalDetails}
    - Current Status: ${data.currentStatus}
    - Education: ${data.education}
    - Experience: ${data.experience}
    - Skills: ${data.skills}
    - Job Description: ${data.jobDescription}

    Tailor this narrative specifically to fit the requirements found in the Job Description.

    Instructions:
    1. Start the letter by contextualizing who they are based on Current Status.
    2. Connect the dots: Use Skills and Experience to prove they can handle the responsibilities listed in the Job Description.
    3. Format correctly: Use Personal Details for the header and contact info.
    4. Tone: Confident, professional, and non-robotic.
    5. Layout: Standard business cover letter with Header, Salutation, Opening, Body, and Closing (Call to Action).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    if (!response || !response.text) {
      throw new Error("Failed to generate content from AI");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
