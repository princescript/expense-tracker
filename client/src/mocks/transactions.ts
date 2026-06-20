import { transactionUIConfig } from "../utils/transactionUIConfig";
export type TransactionType = "income" | "expense";
export type PaymentMethod = "UPI" | "Cash" | "Card" | "Bank Transfer";

export interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
  paymentMethod: PaymentMethod;
  description?: string;
}

/* =========================
   CLEAN DATASET
========================= */

export let transactions: Transaction[] = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Salary",
    amount: 50000,
    type: "income",
    date: "2026-06-17",
    paymentMethod: "Bank Transfer",
    description: "Monthly salary credited.",
  },
  {
    id: 2,
    title: "Uber Ride",
    category: "Transport",
    amount: 200,
    type: "expense",
    date: "2026-06-17",
    paymentMethod: "UPI",
    description: "Uber ride to office.",
  },
  {
    id: 3,
    title: "Java Course",
    category: "Education",
    amount: 2580,
    type: "expense",
    date: "2026-06-16",
    paymentMethod: "Card",
    description: "Purchased an online Java course.",
  },
  {
    id: 4,
    title: "Movie Night",
    category: "Entertainment",
    amount: 850,
    type: "expense",
    date: "2026-06-15",
    paymentMethod: "Cash",
    description: "Weekend movie tickets.",
  },
  {
    id: 5,
    title: "College Fee",
    category: "Education",
    amount: 25000,
    type: "expense",
    date: "2026-06-14",
    paymentMethod: "Bank Transfer",
    description: "Semester college fee payment.",
  },
  {
    id: 6,
    title: "Freelance Payment",
    category: "Freelance",
    amount: 12000,
    type: "income",
    date: "2026-06-13",
    paymentMethod: "UPI",
    description: "Received payment for a freelance project.",
  },
  {
    id: 7,
    title: "Grocery Shopping",
    category: "Food & Drinks",
    amount: 3200,
    type: "expense",
    date: "2026-06-13",
    paymentMethod: "Card",
    description: "Weekly grocery shopping.",
  },
  {
    id: 8,
    title: "Internet Bill",
    category: "Bills",
    amount: 999,
    type: "expense",
    date: "2026-06-12",
    paymentMethod: "UPI",
    description: "Monthly broadband bill.",
  },
  {
    id: 9,
    title: "Train Ticket",
    category: "Transport",
    amount: 850,
    type: "expense",
    date: "2026-06-12",
    paymentMethod: "UPI",
    description: "Train ticket booking.",
  },
  {
    id: 10,
    title: "Stock Dividend",
    category: "Investment",
    amount: 5000,
    type: "income",
    date: "2026-06-11",
    paymentMethod: "Bank Transfer",
    description: "Quarterly stock dividend received.",
  },
];
export const getDonutData = (transactions: Transaction[]) => {
  const map = new Map<string, number>();

  transactions.forEach((t) => {
    if (t.type !== "expense") return;

    map.set(
      t.category,
      (map.get(t.category) || 0) + Math.abs(t.amount)
    );
  });

  return Array.from(map.entries()).map(([name, value]) => {
    const config = transactionUIConfig[name as keyof typeof transactionUIConfig];

    return {
      name,
      value,
      color: config?.color ?? "#6366f1", // SAFE fallback
    };
  });
};

export const getTrendData = (transactions: Transaction[]) => {
  const map = new Map<string, number>();

  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  transactions.forEach((t) => {
    const day = new Date(t.date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    // ONLY EXPENSES for chart correctness
    if (t.type !== "expense") return;

    map.set(day, (map.get(day) || 0) + Math.abs(t.amount));
  });

  return order
    .filter((d) => map.has(d))
    .map((date) => ({
      date,
      expense: map.get(date) || 0,
    }));
};


