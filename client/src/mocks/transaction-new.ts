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