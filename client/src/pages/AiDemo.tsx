import { useState } from "react";
import { askGemini } from "../services/geminiService";

export default function AiDemo() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const result = await askGemini(prompt);
      setResponse(result ?? "No response received.");
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl border border-gray-300 space-y-4">
      <h2 className="text-xl font-semibold">Gemini Demo</h2>

      <textarea
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask Gemini anything..."
        className="w-full border rounded-lg p-3 outline-none"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
      >
        {loading ? "Thinking..." : "Ask Gemini"}
      </button>

      {response && (
        <div className="rounded-lg border p-4 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}