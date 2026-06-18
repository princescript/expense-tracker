import { Car, Plus, Search, Trash2 } from "lucide-react";
import { transactions } from "../mocks/transactions";

const categories = [
  "All",
  "Food & Drinks",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Others",
];

const Transaction = () => {
  return (
    <div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--text))]">
      <main>

        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Transactions
            </h1>

            <p className="mt-1 text-xs text-[rgb(var(--muted))]">
              Manage your income and expenses
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-3.5 py-2 text-xs font-medium text-white transition hover:opacity-90">
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>

        {/* FILTERS */}
        <div className="mb-5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-3">

          {/* TOP ROW */}
          <div className="flex flex-col gap-3 lg:flex-row">

            {/* SEARCH */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />

              <input
                type="text"
                placeholder="Search transactions..."
                className="h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] pl-10 pr-3 text-sm outline-none transition focus:border-[rgb(var(--primary))]"
              />
            </div>

            {/* TYPE FILTER */}
            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
              {["All", "Expense", "Income"].map((item, index) => (
                <button
                  key={item}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition whitespace-nowrap ${index === 0
                    ? "bg-[rgb(var(--primary))] text-white"
                    : "border border-[rgb(var(--border))] text-[rgb(var(--muted))] hover:bg-[rgb(var(--background))]"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

          </div>

          {/* CATEGORY FILTER */}
          <div className="mt-4 border-b border-[rgb(var(--border))]">
            <div className="hide-scrollbar flex gap-5 overflow-x-auto whitespace-nowrap pb-2">

              {categories.map((item, index) => (
                <button
                  key={item}
                  className={`relative pb-2.5 text-xs font-medium whitespace-nowrap ${index === 0
                      ? "text-[rgb(var(--text))]"
                      : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                    }`}
                >
                  {item}

                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[rgb(var(--primary))]" />
                  )}
                </button>
              ))}

            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">

          <div className="overflow-x-auto">
            <table className="w-full min-w-225">

              <thead>
                <tr className="border-b border-[rgb(var(--border))]">
                  {["Transaction", "Category", "Date", "Payment", "Amount", "Actions"].map((head) => (
                    <th
                      key={head}
                      className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--muted))]"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {transactions?.map((tx) => {

                  const isIncome = tx.type === "income";

                  return (
                    <tr
                      key={tx.id}
                      className="border-b border-[rgb(var(--border))] transition hover:bg-[rgb(var(--card))]"
                    >

                      {/* TRANSACTION */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--card))]">
                            <Car
                              className={`h-4 w-4 ${isIncome
                                ? "text-[rgb(var(--success))]"
                                : "text-[rgb(var(--danger))]"
                                }`}
                            />
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {tx.description ?? tx.title}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-4 py-3">
                        <span className=" px-2.5 py-1 text-sm font-medium text-[rgb(var(--muted))]">
                          {tx.category}
                        </span>
                      </td>

                      {/* DATE (FIXED FORMAT) */}
                      <td className="px-4 py-3 text-sm text-[rgb(var(--muted))]">
                        {new Date(tx.date).toLocaleDateString("en-IN")}
                      </td>

                      {/* PAYMENT */}
                      <td className="px-4 py-3 text-sm">
                        {tx.paymentMethod}
                      </td>

                      {/* AMOUNT (SAFE DISPLAY ONLY) */}
                      <td
                        className={`px-4 py-3 text-left text-sm font-semibold ${isIncome
                          ? "text-[rgb(var(--success))]"
                          : "text-[rgb(var(--danger))]"
                          }`}
                      >
                        {isIncome ? "+" : "-"}₹
                        {Number(tx.amount).toLocaleString("en-IN")}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-4 py-3 text-center">
                        <button className="rounded-md p-1.5 text-[rgb(var(--muted))] transition hover:bg-red-500/10 hover:text-red-400">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })}

                {!transactions?.length && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-[rgb(var(--muted))]">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Transaction;