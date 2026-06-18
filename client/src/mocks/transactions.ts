
/* =========================================================
   TYPES
========================================================= */

import { transactionUIConfig } from "../utils/transactionUIConfig";

export type TransactionType = "income" | "expense";

export type PaymentMethod = "UPI" | "Cash" | "Card" | "Bank Transfer";

export interface Transaction {
  id: number;
  title: string;
  category: string;

  // IMPORTANT:
  // income = +value
  // expense = -value
  amount: number;

  type: TransactionType;
  date: string;

  paymentMethod: PaymentMethod;
  description?: string;
}

/* =========================================================
   DATA (FIXED FOR YOUR UI LOGIC)
========================================================= */

export const transactions: Transaction[] = [
  {
    id: 1,
    title: "Salary Credit",
    category: "Bills",
    amount: 50000,
    type: "income",
    date: "2026-06-17",
    paymentMethod: "UPI",
    description: "Monthly salary credited",
  },
  {
    id: 2,
    title: "Uber Ride",
    category: "Transport",
    amount: -200,
    type: "expense",
    date: "2026-06-17",
    paymentMethod: "UPI",
  },
  {
    id: 3,
    title: "Course Fee",
    category: "Education",
    amount: -2580,
    type: "expense",
    date: "2026-06-16",
    paymentMethod: "Card",
  },
  {
    id: 4,
    title: "Movie Night",
    category: "Entertainment",
    amount: -2888,
    type: "expense",
    date: "2026-06-15",
    paymentMethod: "Cash",
  },
  {
    id: 5,
    title: "College Fee",
    category: "Education",
    amount: -25000,
    type: "expense",
    date: "2026-06-14",
    paymentMethod: "Bank Transfer",
  },

  /* =========================
     NEW +5 TRANSACTIONS
  ========================= */

  {
    id: 6,
    title: "Freelance Payment",
    category: "Income",
    amount: 12000,
    type: "income",
    date: "2026-06-13",
    paymentMethod: "UPI",
    description: "UI project payment",
  },
  {
    id: 7,
    title: "Grocery Shopping",
    category: "Food & Drinks",
    amount: -3200,
    type: "expense",
    date: "2026-06-13",
    paymentMethod: "Card",
  },
  {
    id: 8,
    title: "Internet Bill",
    category: "Bills",
    amount: -999,
    type: "expense",
    date: "2026-06-12",
    paymentMethod: "UPI",
  },
  {
    id: 9,
    title: "Train Ticket",
    category: "Transport",
    amount: -850,
    type: "expense",
    date: "2026-06-12",
    paymentMethod: "UPI",
  },
  {
    id: 10,
    title: "Stock Dividend",
    category: "Income",
    amount: 5000,
    type: "income",
    date: "2026-06-11",
    paymentMethod: "Bank Transfer",
    description: "Quarterly dividend",
  },
];

/* =========================================================
   DONUT DATA (DERIVED)
========================================================= */
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

/* =========================================================
   TREND DATA (DERIVED)
========================================================= */
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
