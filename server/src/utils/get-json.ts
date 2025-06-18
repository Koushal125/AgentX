import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

if (dotenv && typeof dotenv.config === 'function') {
  dotenv.config();
} else {
  console.warn('dotenv package not properly imported');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// console.log(process.env.GEMINI_API_KEY);
const MODEL_NAME = 'models/gemini-2.0-flash';

/**
 * Generates a JSON object from a natural language prompt using Gemini API.
 *
 * @param prompt - The user-provided prompt.
 * @returns The generated JSON object.
 */
export async function generateJsonFromPrompt(prompt: string): Promise<any> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in your environment variables.');
  }

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const fullPrompt = `
You are a strict JSON generator for a platform called AgentX.

Your task is to read a user's natural language prompt describing a business workflow and convert it into a structured JSON object with the following fields:

{
  "name": string | null,
  "description": string | null,
  "roles": string[], // e.g., ["HR", "Manager", "Employee"]
  "actions": [ // ordered list of workflow actions
    {
      "step": number,
      "name": string,
      "performedBy": string,
      "type": string, // e.g., "email", "task", "notification"
      "details": object // e.g., { "template": "name", "deadlineHours": 24 }
    }
  ],
  "triggers": [
    {
      "type": string, // e.g., "event", "form", "apiCall"
      "event": string
    }
  ],
  "conditions": string[], // logical prerequisites like ["Manager approval required"]
  "deadlines": [
    {
      "action": string,
      "dueInHours": number,
      "escalation": {
        "to": string,
        "reason": string
      }
    }
  ]
}

Output rules:
- Respond ONLY with a valid JSON object — no extra commentary, text, or markdown.
- If any field is missing from the prompt, use null or [] appropriately.
- Use camelCase for all field names.
- Be as accurate and structured as possible.

Example Prompt:
"Whenever a new employee joins, HR should send onboarding documents, then the IT team should set up the laptop within 2 days. If not completed, escalate to the manager."

Prompt:
"${prompt}"
`;




  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response.text();

    // console.log(response)

    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}');
    const jsonString = response.slice(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to generate JSON from prompt:', error);
    throw new Error('Error generating JSON from prompt');
  }
}
