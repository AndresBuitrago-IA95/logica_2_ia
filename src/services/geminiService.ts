import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Check if key is missing or is the literal string "undefined" (common in some build environments)
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("API_KEY_MISSING");
  }

  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export interface TopicContent {
  explanation: string;
  codeExample: string;
  exercises: {
    question: string;
    type: "multiple-choice" | "coding";
    options?: string[];
    answer: string;
    hint: string;
  }[];
}

export async function getTopicContent(topicName: string): Promise<TopicContent> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `Genera contenido educativo profundo y altamente organizado para el tema: "${topicName}" de la materia Lógica y Representación II.
    
    REQUISITOS DE FORMATO:
    1. Explicación: Usa Markdown con subtítulos claros (###), listas y negritas para resaltar conceptos clave.
    2. Código: Proporciona una implementación limpia y comentada en Python. Usa bloques de código Markdown.
    3. Ejercicios: 3 retos que desafíen la comprensión lógica.
    
    El tono debe ser académico pero accesible. Idioma: Español.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING },
          codeExample: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["multiple-choice", "coding"] },
                options: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                answer: { type: Type.STRING },
                hint: { type: Type.STRING }
              },
              required: ["question", "type", "answer", "hint"]
            }
          }
        },
        required: ["explanation", "codeExample", "exercises"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as TopicContent;
} catch (error: any) {
  console.error("Gemini API Error:", error);
  throw error;
}
}
