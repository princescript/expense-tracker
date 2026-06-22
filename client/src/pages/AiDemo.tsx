import { useState } from "react";
import type {
  TransactionType,
  TransactionCategory,
  PaymentMethod,
} from "../mocks/transactions";
import {  parseTransactionSync } from "../utils/modelAI";

/* ================================
   TYPE
================================ */
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

/* ================================
   TYPE GUARD
================================ */
const isValidTransaction = (data: any): data is ParsedTransaction => {
  return (
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    typeof data.amount === "number" &&
    typeof data.title === "string" &&
    typeof data.category === "string" &&
    typeof data.type === "string" &&
    typeof data.paymentMethod === "string" &&
    typeof data.date === "string" &&
    typeof data.description === "string"
  );
};

export default function AiDemo() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ParsedTransaction[]>([]);
  const [jsonOutput, setJsonOutput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

const handleParseAll = () => {
  if (!input.trim()) return;

  setLoading(true);
  setResults([]);
  setErrors([]);
  setJsonOutput("");

  try {
    const lines = input
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const parsed: ParsedTransaction[] = [];
    const failed: string[] = [];

    lines.forEach((line) => {
      const result = parseTransactionSync(line);

      if (isValidTransaction(result)) {
        parsed.push(result);
      } else {
        failed.push(line);
      }
    });

    setResults(parsed);
    setErrors(failed);
    setJsonOutput(JSON.stringify(parsed, null, 2));
  } catch (err) {
    console.error(err);
    setErrors(["Unexpected parsing error"]);
  } finally {
    setLoading(false);
  }
};
  const copyJSON = () => {
    navigator.clipboard.writeText(jsonOutput);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-xl border space-y-4">
      <h2 className="text-xl font-semibold">
        Transaction Parser — JSON Export Mode
      </h2>

      {/* INPUT */}
      <textarea
        rows={8}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`One per line:

paid ₹500 zomato food via gpay
refund ₹1200 amazon card yesterday
₹450 burger fries zomato`}
        className="w-full border rounded-lg p-3"
      />

      <button
        onClick={handleParseAll}
        disabled={loading}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white"
      >
        {loading ? "Processing..." : "Run Parser"}
      </button>

      {/* JSON OUTPUT */}
      {jsonOutput && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">JSON Output</h3>

            <button
              onClick={copyJSON}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded"
            >
              Copy JSON
            </button>
          </div>

          <pre className="bg-black text-green-400 p-3 rounded overflow-auto text-sm">
            {jsonOutput}
          </pre>
        </div>
      )}

      {/* RESULTS LIST VIEW */}
      <div className="space-y-3">
        {results.map((r, i) => (
          <div key={i} className="border p-3 rounded text-sm">
            <div><b>Title:</b> {r.title}</div>
            <div><b>Amount:</b> ₹{r.amount}</div>
            <div><b>Category:</b> {r.category}</div>
            <div><b>Type:</b> {r.type}</div>
            <div><b>Payment:</b> {r.paymentMethod}</div>
            <div><b>Date:</b> {new Date(r.date).toDateString()}</div>
          </div>
        ))}
      </div>

      {/* ERRORS */}
      {errors.length > 0 && (
        <div className="border border-red-400 p-3 text-red-500 text-sm">
          <b>Failed Inputs</b>
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}
    </div>
  );
}