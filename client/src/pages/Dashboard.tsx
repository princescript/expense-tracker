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
import { donutData, trendData } from "../mocks/transactions";

const Dashboard = () => {
  const { greeting, date } = useGreetingDate();
  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className=" space-y-6">
        <header className="flex items-center justify-between">
          {/* Left */}
          <div className="flex flex-col">
            <h2 className="text-base font-light text-[rgb(var(--text))] tracking-tight">
              {greeting}
              <span className="text-[rgb(var(--primary))] font-medium">
                , Devil
              </span>
            </h2>
            <p className="text-xs text-[rgb(var(--muted))] tracking-tight">
              {date}
            </p>
          </div>
          {/* Right */}
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white bg-[rgb(var(--primary))] hover:opacity-90 transition">
            <Plus size={16} />
            ADD Expense
          </button>
        </header>
        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Income"
            value="₹8,50,000"
            change="+12.5%"
            trend="up"
            variant="green"
            icon={<TrendingUp size={18} />}
          />
          <StatCard
            title="Expenses"
            value="₹9,38,913"
            change="+6.3%"
            trend="down"
            variant="red"
            icon={<TrendingDown size={18} />}
          />
          <StatCard
            title="Savings"
            value="₹-88,913"
            change="+16.4%"
            trend="up"
            variant="purple"
            icon={<Wallet size={18} />}
          />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <Suspense fallback={<div>Loading...</div>}>
            <ExpenseDonutChart data={donutData} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <ExpenseTrendChart data={trendData} />
          </Suspense>
        </div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;