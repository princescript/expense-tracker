import { Plus, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useGreetingDate } from "../hooks/useGreetingDate";
import StatCard from "../components/ui/StatCard";

import { lazy, Suspense } from "react";

const ExpenseDonutChart = lazy(() =>
  import("../components/charts/ExpenseDonutChart")
);
const ExpenseTrendChart = lazy(() =>
  import("../components/charts/ExpenseTrendChart")
);

import RecentTransactions from "../components/Recenttransactions";
import {
  getDonutData,
  getTrendData,
  transactions,
  type Transaction,
} from "../mocks/transactions";

/* =========================
   DATA ENGINE (ONLY FIX)
========================= */
const getSummary = (transactions :Transaction[]) => {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === "income") {
        acc.income += t.amount;
      } else {
        acc.expense += Math.abs(t.amount);
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
};

const Dashboard = () => {
  const { greeting, date } = useGreetingDate();

  const { income, expense } = getSummary(transactions);
  const savings = income - expense;

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="space-y-6">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-base font-light tracking-tight">
              {greeting}
              <span className="text-[rgb(var(--primary))] font-medium">
                , Devil
              </span>
            </h2>

            <p className="text-xs text-[rgb(var(--muted))]">
              {date}
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white bg-[rgb(var(--primary))] hover:opacity-90 transition">
            <Plus size={16} />
            ADD Expense
          </button>
        </header>

        {/* CARDS (NOW DYNAMIC) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <StatCard
            title="Income"
            value={`₹${income.toLocaleString("en-IN")}`}
            change="+12.5%"
            trend="up"
            variant="green"
            icon={<TrendingUp size={18} />}
          />

          <StatCard
            title="Expenses"
            value={`₹${expense.toLocaleString("en-IN")}`}
            change="+6.3%"
            trend="down"
            variant="red"
            icon={<TrendingDown size={18} />}
          />

          <StatCard
            title="Savings"
            value={`₹${savings.toLocaleString("en-IN")}`}
            change="+16.4%"
            trend="up"
            variant="purple"
            icon={<Wallet size={18} />}
          />

        </div>

        {/* CHARTS */}
        <div className="grid gap-4 xl:grid-cols-2">
          <Suspense fallback={<div>Loading...</div>}>
            <ExpenseDonutChart data={getDonutData(transactions)} />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <ExpenseTrendChart data={getTrendData(transactions)} />
          </Suspense>
        </div>

        <RecentTransactions transactions={transactions} />

      </div>
    </div>
  );
};

export default Dashboard;