import { useState } from "react";
import { Sparkles, X } from "lucide-react";

interface SmartAddProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => Promise<void>;
}

export default function SmartAdd({
  open,
  onClose,
  onGenerate,
}: SmartAddProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const baseInput =
    "w-full mt-1 px-3 py-2 rounded-lg bg-[rgb(var(--surface))] border border-[rgb(var(--border))] outline-none text-[rgb(var(--text))] focus:border-[rgb(var(--primary))] transition text-sm resize-none";

  if (!open) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      await onGenerate(prompt);
      setPrompt("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-115 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-xl"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles
              size={18}
              className="text-[rgb(var(--primary))]"
            />
            <h2 className="text-base font-medium text-[rgb(var(--text))]">
              Smart Add
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mb-3 text-sm text-[rgb(var(--muted))]">
          Describe your transaction naturally.
        </p>

        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Paid ₹350 by UPI for dinner at Domino's yesterday."
          className={baseInput}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles size={16} />
          {loading ? "Understanding..." : "Generate Transaction"}
        </button>
      </div>
    </div>
  );
}