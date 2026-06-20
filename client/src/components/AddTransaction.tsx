import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { TRANSACTION_CATEGORIES, type PaymentMethod, type Transaction, type TransactionCategory } from "../mocks/transactions";
import { toast } from "sonner";
import { askGemini } from "../services/geminiService";
import { buildTransactionPrompt } from "../utils/aiHelpers";
import { addTransaction } from "../services/addTransactionService";
import { parseTransactionHybrid } from "../utils/modelAI";

interface AddTransactionProps {
    open: boolean;
    onClose: () => void;
}

export default function AddTransaction({ open, onClose }: AddTransactionProps) {
    // Standard Form States
    const [type, setType] = useState<"expense" | "income">("expense");
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Food & Drinks");
    const [date, setDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");

    // Smart Add Sub-view Statess
    const [smartOpen, setSmartOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const baseInput =
        "w-full mt-1 px-3 py-2 rounded-lg bg-[rgb(var(--surface))] border border-[rgb(var(--border))] outline-none text-[rgb(var(--text))] focus:border-[rgb(var(--primary))] transition text-sm";

    if (!open) return null;

    const handleSave = () => {
        if (!amount || !title) {
            toast.error("Please fill in all required fields.");
            return;
        }
        const payload = {
            title,
            category: category as TransactionCategory,
            amount: Number(amount),
            type,
            date,
            paymentMethod
        };
        try {
            addTransaction(payload);
            onClose();
            toast.success("Transaction added successfully.");
            // Reset form
            setAmount("");
            setTitle("");
        } catch {
            toast.error("Something went wrong.");
        }
    };
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
        const parsed = parseTransactionHybrid(prompt);

        // -------------------------------
        // 1. FAST PATH (NO AI)
        // -------------------------------
        if (Object.keys(parsed).length > 0) {
            const tx = parsed as Transaction;

            const safeTx: Transaction = {
                ...tx,
                id: Date.now(), // FIX: prevent duplicate keys
            };

            console.log("PIPELINE (NO AI USED)", safeTx);

            addTransaction(safeTx);
            onClose();

            toast.success("Transaction added successfully (fast mode).");

            setAmount("");
            setTitle("");
            return;
        }

        // -------------------------------
        // 2. AI FALLBACK
        // -------------------------------
        const data = await askGemini(buildTransactionPrompt(prompt));

        if (!data) {
            toast.error("Empty AI response");
            return;
        }

        const aiTx: Transaction = {
            ...data,
            id: Date.now(), // FIX: unique ID
        };

        console.log("AI PIPELINE", aiTx);

        addTransaction(aiTx);
        onClose();

        toast.success("Transaction added successfully (AI mode).");

        setAmount("");
        setTitle("");
    } catch (error) {
        console.error(error);
        toast.error("Could not parse transaction. Please try again.");
    } finally {
        setLoading(false);
    }
};

    // const handleGenerate = async () => {
    //     if (!prompt.trim()) return;
    //     setLoading(true);
    //     try {
    //         const data = await askGemini(buildTransactionPrompt(prompt));
    //         if (!data) {
    //             toast.error("Empty AI response");
    //             return;
    //         }
    //         console.log("AI", data)
    //         data.id = 0;
    //         addTransaction(data);
    //         onClose();
    //         toast.success("Transaction added successfully.");
    //         // reset
    //         setAmount("");
    //         setTitle("");
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Could not parse AI response. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            {/* Modal Body Container */}
            <div
                className="relative w-105 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-5 text-[rgb(var(--text))] shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {!smartOpen ? (
                    /* ---------------- MANUAL FORM VIEW ---------------- */
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-medium">Add {type}</h2>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSmartOpen(true)}
                                    className="flex items-center gap-1 rounded-md border border-[rgb(var(--primary))] bg-[rgb(var(--primary))/0.12] px-2.5 py-1.5 text-xs font-medium text-[rgb(var(--primary))] transition hover:bg-[rgb(var(--primary))/0.18]"
                                >
                                    ✨ Smart Add
                                </button>
                                <button
                                    onClick={onClose}
                                    className="text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Type Toggle */}
                        <div className="flex bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-lg p-1 mb-4">
                            <button
                                onClick={() => setType("expense")}
                                className={`flex-1 py-2 text-sm rounded-md transition ${type === "expense" ? "bg-[rgb(var(--danger))] text-white" : "text-[rgb(var(--muted))]"
                                    }`}
                            >
                                Expense
                            </button>
                            <button
                                onClick={() => setType("income")}
                                className={`flex-1 py-2 text-sm rounded-md transition ${type === "income" ? "bg-[rgb(var(--success))] text-white" : "text-[rgb(var(--muted))]"
                                    }`}
                            >
                                Income
                            </button>
                        </div>

                        {/* Amount */}
                        <div className="mb-3">
                            <label className="text-xs text-[rgb(var(--muted))]">Amount *</label>
                            <input
                                type="number"
                                placeholder="₹ 0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className={baseInput}
                            />
                        </div>

                        {/* Title */}
                        <div className="mb-3">
                            <label className="text-xs text-[rgb(var(--muted))]">Title *</label>
                            <input
                                type="text"
                                placeholder="Pizza and Cold Drink"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={baseInput}
                            />
                        </div>

                        {/* Category & Date */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="text-xs text-[rgb(var(--muted))]">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={baseInput}
                                >
                                    {TRANSACTION_CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-[rgb(var(--muted))]">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={baseInput}
                                />
                            </div>
                        </div>

                        {/* Payment Method & Wallet */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div>
                                <label className="text-xs text-[rgb(var(--muted))]">Payment</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                    className={baseInput}
                                >
                                    <option value="UPI">UPI</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-[rgb(var(--muted))]">Wallet</label>
                                <select className={baseInput}>
                                    <option>Main Wallet</option>
                                    <option>Savings Wallet</option>
                                </select>
                            </div>
                        </div>

                        {/* Main Action Button */}
                        <button
                            onClick={handleSave}
                            className={`w-full py-2 rounded-lg font-medium text-white transition ${type === "expense" ? "bg-[rgb(var(--danger))]" : "bg-[rgb(var(--success))]"
                                } hover:opacity-90`}
                        >
                            Save {type}
                        </button>
                    </>
                ) : (
                    /* ---------------- SMART NLP VIEW ---------------- */
                    <>
                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles size={18} className="text-[rgb(var(--primary))]" />
                                <h2 className="text-base font-medium text-[rgb(var(--text))]">Smart Add</h2>
                            </div>
                            <button
                                onClick={() => setSmartOpen(false)}
                                className="text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="mb-3 text-sm text-[rgb(var(--muted))]">
                            Describe your transaction naturally.
                        </p>

                        <textarea
                            rows={4}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Example: Paid ₹350 by UPI for dinner at Domino's yesterday."
                            className={`${baseInput} resize-none`}
                        />

                        {/* UI Actions for Smart Add */}
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => setSmartOpen(false)}
                                className="w-1/3 py-2 rounded-lg text-sm font-medium border border-[rgb(var(--border))] text-[rgb(var(--text))] transition hover:bg-[rgb(var(--surface))]"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleGenerate}
                                disabled={loading || !prompt.trim()}
                                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Sparkles size={16} />
                                {loading ? "Understanding..." : "Autofill Form"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}