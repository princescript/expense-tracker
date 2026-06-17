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
const ChartContainer = lazy(() =>
  import("../components/charts/ChartContainer")
);
import RecentTransactions from "../components/Recenttransactions";

const donutData = [
  { name: "Food", value: 9000, color: "#6366F1" },
  { name: "Education", value: 7500, color: "#22C55E" },
  { name: "Others", value: 6000, color: "#F59E0B" },
  { name: "Transport", value: 200, color: "#EF4444" },
];

const trendData = [
  { date: "Mon", expense: 1200 },
  { date: "Tue", expense: 1800 },
  { date: "Wed", expense: 900 },
  { date: "Thu", expense: 2400 },
  { date: "Fri", expense: 1600 },
];

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
        <div className="flex flex-col gap-4 w-full md:flex-row">
          <div className="flex-1">
            <ChartContainer title="Expense Breakdown">
              <Suspense fallback={<div>Loading...</div>}>
                <ExpenseDonutChart data={donutData} />
              </Suspense>
            </ChartContainer>
          </div>

          <div className="flex-1">
            <ChartContainer title="Expense Trend">
              <Suspense fallback={<div>Loading...</div>}>
                <ExpenseTrendChart data={trendData} />
              </Suspense>
            </ChartContainer>
          </div>
        </div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;