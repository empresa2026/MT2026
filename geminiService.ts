
import { GoogleGenAI } from "@google/genai";

const DEFAULT_KNOWLEDGE = `
MARKETING TEOLÓGICO: SEGREDOS MILENARES PARA INFLUENCIAR.

INTRODUÇÃO: A Bíblia é o maior compêndio de narrativas de liderança e movimentos da humanidade. Toda mensagem nasce da essência do maior Mensageiro.

PILARES E CONCEITOS CHAVE:
1. O CHAMADO: Não é racional, é visceral. É a centelha que separa quem vende de quem movimenta. Nasce da indignação ("O que você não suporta mais no mundo?").
2. ESTILO DE LIDERANÇA: Mestre, Profeta, Pastor, Evangelista/Guerreiro.
3. POVO ESCOLHIDO: Comunidade unida por rituais, símbolos e linguagem comum.
4. TERRA PROMETIDA: O destino que inspira. Representa quem a pessoa se tornará.
5. NOVA ALIANÇA: O produto como veículo concreto. 
6. O INIMIGO: O obstáculo que unifica.
7. A PROFECIA (GRANDE VERDADE): A revelação de uma verdade inevitável.
`;

const DEFAULT_INSTRUCTION = `
Você é o Mentor de IA do Marketing Teológico. Use o tom de um Mentor Sábio: Encorajador, mas estratégico e profundo. Analogie com Figuras Bíblicas sempre que possível. Formate as respostas com Markdown elegante.
`;

export const getGeminiResponse = async (prompt: string, context: string = "") => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Recupera configurações do Admin salvas no localStorage
  const savedKnowledge = localStorage.getItem('mt_ai_knowledge') || DEFAULT_KNOWLEDGE;
  const savedInstruction = localStorage.getItem('mt_ai_instruction') || DEFAULT_INSTRUCTION;

  const systemInstruction = `
    Base de Conhecimento:
    ${savedKnowledge}

    Instruções de Comportamento:
    ${savedInstruction}
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context ? `Contexto do Movimento:\n${context}\n\nLíder: ${prompt}` : prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Líder, houve uma interrupção na conexão profética. Poderia repetir sua reflexão?";
  }
};
