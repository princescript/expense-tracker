import { Car, Lightbulb } from "lucide-react";

export interface TransactionUIConfig {
  icon:any;
  color: string;
}
/* =========================================================
   OPTIONAL UI CONFIG (UNCHANGED LOGIC SAFE)
========================================================= */
export const transactionUIConfig = {
  Bills: {
    icon: Lightbulb,
    color: "#f59e0b",
  },
  Transport: {
    icon: Car,
    color: "#f43f5e",
  },
  Education: {
    icon: Lightbulb,
    color: "#38bdf8",
  },
  Entertainment: {
    icon: Car,
    color: "#d946ef",
  },
  "Food & Drinks": {
    icon: Lightbulb,
    color: "#f97316",
  },
  Others: {
    icon: Lightbulb,
    color: "#22c55e",
  },
} as const;