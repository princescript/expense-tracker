import { useState } from "react";
import { tryParseTransaction } from "../utils/modelAI";
import type { TransactionType, TransactionCategory, PaymentMethod } from "../mocks/transactions";

type ParsedTransaction = {
  id: number;
  title: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  date: string;
  paymentMethod: PaymentMethod;
  description: string;
};

export default function AiDemo() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<ParsedTransaction | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const result = tryParseTransaction(prompt);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl border border-gray-300 space-y-4">
      <h2 className="text-xl font-semibold">Transaction Parser Demo</h2>

      <textarea
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: paid ₹500 for zomato food via gpay yesterday"
        className="w-full border rounded-lg p-3 outline-none"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
      >
        {loading ? "Processing..." : "Parse Transaction"}
      </button>

      {response && (
        <div className="rounded-lg border p-4 space-y-2 bg-black">
          <div><b>Title:</b> {response.title}</div>
          <div><b>Amount:</b> ₹{response.amount}</div>
          <div><b>Category:</b> {response.category}</div>
          <div><b>Type:</b> {response.type}</div>
          <div><b>Payment Method:</b> {response.paymentMethod}</div>
          <div><b>Date:</b> {new Date(response.date).toDateString()}</div>
          <div><b>Description:</b> {response.description}</div>
        </div>
      )}
    </div>
  );
}