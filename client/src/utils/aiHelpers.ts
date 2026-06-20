export const buildTransactionPrompt = (prompt: string) => `
You are a strict data extraction engine.
Convert the user input into a single JSON object that exactly matches this TypeScript interface:
Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string; // format YYYY-MM-DD
  paymentMethod: "UPI" | "Cash" | "Card" | "Bank Transfer" | "Other";
  description?: string;
}
Rules:
- Return ONLY valid JSON. No markdown, no explanation, no text.
- Infer values from natural language.
- If date is not given, use today's date: ${new Date().toISOString().split("T")[0]}
- id should be 1 (frontend will overwrite later).
- category should be inferred (Food, Travel, Bills, Shopping, etc.)
- type should be "expense" if money is spent, otherwise "income"
- amount must be a number only
- paymentMethod must be inferred (UPI, Cash, Card, Bank Transfer, Other)
- description should be a clean rewritten sentence of the input

User input:
"${prompt}"
`;

export const cleanAIResponse = (text: string) => {
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};