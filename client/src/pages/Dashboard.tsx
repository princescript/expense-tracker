const Dashboard = () => {
  return (
    <div className="p-6 bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-[rgb(var(--muted))]">
          Overview of your financial activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Card 1 */}
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Total Balance</p>
          <h2 className="text-2xl font-semibold mt-2">₹0.00</h2>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Income</p>
          <h2 className="text-2xl font-semibold mt-2 text-[rgb(var(--primary))]">
            ₹0.00
          </h2>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Expenses</p>
          <h2 className="text-2xl font-semibold mt-2 text-red-400">
            ₹0.00
          </h2>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;