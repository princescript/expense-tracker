export interface TransactionDto {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: number;
}

export const DEFAULT_TRANSACTIONS: TransactionDto[] = [
  { id: 1, name: "Thus", category: "Bills", date: "17 Jun", amount: 50000 },
  { id: 2, name: "Vvv", category: "Transport", date: "17 Jun", amount: -200 },
  { id: 3, name: "Ggvv", category: "Education", date: "17 Jun", amount: -2580 },
  { id: 4, name: "Vbb", category: "Entertainment", date: "17 Jun", amount: -2888 },
  { id: 5, name: "Fee", category: "Education", date: "17 Jun", amount: -25000 },
];

export const donutData = [
  { name: "Food", value: 9000, color: "#6366F1" },
  { name: "Education", value: 7500, color: "#22C55E" },
  { name: "Others", value: 6000, color: "#F59E0B" },
  { name: "Transport", value: 200, color: "#EF4444" },
];

export const trendData = [
  { date: "Mon", expense: 1200 },
  { date: "Tue", expense: 1800 },
  { date: "Wed", expense: 900 },
  { date: "Thu", expense: 2400 },
  { date: "Fri", expense: 1600 },
];


import {
  Car,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export interface TransactionNew {
  id: number;
  description: string;
  category: string;
  date: string;
  payment: string;
  amount: number;
  type: "income" | "expense";
  icon: LucideIcon;
  iconColor: string;
}
export const transactions: TransactionNew[] = [
  {
    id: 1,
    description: "Electricity Bill",
    category: "Bills",
    date: "17 Jun 2026",
    payment: "UPI",
    amount: 50000,
    type: "income",
    icon: Lightbulb,
    iconColor: "text-yellow-400",
  },
  {
    id: 2,
    description: "Uber Ride",
    category: "Transport",
    date: "17 Jun 2026",
    payment: "UPI",
    amount: 200,
    type: "expense",
    icon: Car,
    iconColor: "text-blue-400",
  },
];