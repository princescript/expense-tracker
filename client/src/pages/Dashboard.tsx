import { Plus } from "lucide-react";
import { useGreetingDate } from "../hooks/useGreetingDate";

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
        {/* PAGE TITLE */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[rgb(var(--muted))]">
            Overview of your financial activity
          </p>
        </div>
        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
            <p className="text-sm text-[rgb(var(--muted))]">Total Balance</p>
            <h2 className="text-2xl font-semibold mt-2">₹0.00</h2>
          </div>

          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
            <p className="text-sm text-[rgb(var(--muted))]">Income</p>
            <h2 className="text-2xl font-semibold mt-2 text-[rgb(var(--primary))]">
              ₹0.00
            </h2>
          </div>

          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
            <p className="text-sm text-[rgb(var(--muted))]">Expenses</p>
            <h2 className="text-2xl font-semibold mt-2 text-red-400">
              ₹0.00
            </h2>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;