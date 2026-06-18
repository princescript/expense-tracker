import { Suspense } from "react";
import {
    Wallet,
    CalendarDays,
    TrendingUp,
    Receipt,
} from "lucide-react";

import ExpenseDonutChart from "../components/charts/ExpenseDonutChart";
import ExpenseTrendChart from "../components/charts/ExpenseTrendChart";
import StatCard from "../components/ui/StatCard";

import SpendingByCategory from "../components/charts/SpendingByCategory";
import { donutData, trendData } from "../mocks/transactions";


const categoryData = [
    {
        category: "Food",
        amount: 25000,
        color: "#f97316",
    },
    {
        category: "Education",
        amount: 22000,
        color: "#3b82f6",
    },
    {
        category: "Bills",
        amount: 18000,
        color: "#ef4444",
    },
    {
        category: "Transport",
        amount: 8000,
        color: "#22c55e",
    },
];

const Analytics = () => {
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-[rgb(var(--text))]">
                        Analytics
                    </h1>
                    <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                        Overview of your financial activity
                    </p>
                </div>
                <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-xs text-[rgb(var(--muted))]">
                    This Month
                </div>
            </div>
            {/* STATS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Expenses"
                    value="₹9,38,913"
                    change="-6.3%"
                    trend="down"
                    variant="red"
                    icon={<Wallet size={18} />}
                />
                <StatCard
                    title="Monthly Spending"
                    value="₹72,450"
                    change="+2.1%"
                    trend="up"
                    variant="red"
                    icon={<CalendarDays size={18} />}
                />
                <StatCard
                    title="Highest Expense"
                    value="₹18,000"
                    massage="Electricity Bill"
                    trend="up"
                    variant="purple"
                    icon={<TrendingUp size={18} />}
                />
                <StatCard
                    title="Transactions"
                    value="104"
                    massage="This Month"
                    trend="up"
                    variant="green"
                    icon={<Receipt size={18} />}
                />
            </div>

            {/* TOP CHARTS */}
            <div className="grid gap-4 xl:grid-cols-2">
                <Suspense fallback={<div>Loading...</div>}>
                    <ExpenseTrendChart data={trendData} />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <ExpenseDonutChart data={donutData} />
                </Suspense>
            </div>
            {/* SPENDING BY CATEGORY */}
            <Suspense fallback={<div>Loading...</div>}>
                <SpendingByCategory data={categoryData} />
            </Suspense>
        </div>
    );
};

export default Analytics;