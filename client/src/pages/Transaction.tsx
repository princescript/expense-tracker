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

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white bg-[rgb(var(--primary))] hover:opacity-90 transition">
            <Plus size={16} />
            ADD New
          </button>
        </div>

        {/* FILTERS */}
        <div className="mb-5 rounded-2xl bg-[rgb(var(--surface))] p-4">

          {/* TOP ROW */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* SEARCH + SELECT GROUP */}
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">

              {/* SEARCH */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="h-10 w-full rounded-lg bg-[rgb(var(--background))] pl-10 pr-3 text-sm text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted))] outline-none transition ring-1 ring-[rgb(var(--primary))]/20 focus:ring-[rgb(var(--primary))]/40"
                />
              </div>

              {/* TYPE FILTER */}
              <div className="w-full sm:w-auto">
                <select
                  className="w-full sm:w-auto rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-sm text-[rgb(var(--text))] outline-none focus:ring-1 focus:ring-[rgb(var(--primary))]/20"
                  defaultValue="All"
                >
                  {["All", "Expense", "Income"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div className="mt-4">
            <div className="hide-scrollbar flex gap-5 overflow-x-auto whitespace-nowrap">

              {categories.map((item, index) => (
                <button
                  key={item}
                  className={`relative pb-2 text-xs font-medium whitespace-nowrap transition ${index === 0
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
        <div className="overflow-hidden rounded-2xl bg-[rgb(var(--surface))]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">

              <thead>
                <tr className="text-[rgb(var(--muted))]">
                  {["Transaction", "Category", "Date", "Payment", "Amount", "Actions"].map((head) => (
                    <th
                      key={head}
                      className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-wider"
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
                      className="transition hover:bg-[rgb(var(--card))]/40"
                    >

                      {/* TRANSACTION */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--card))]">
                            <Car
                              className={`h-4 w-4 ${isIncome
                                ? "text-[rgb(var(--success))]"
                                : "text-[rgb(var(--danger))]"
                                }`}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[rgb(var(--text))]">
                              {tx.description ?? tx.title}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* CATEGORY */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full bg-[rgb(var(--card))] px-2.5 py-1 text-xs text-[rgb(var(--muted))]">
                          {tx.category}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-5 py-4 text-sm text-[rgb(var(--muted))]">
                        {new Date(tx.date).toLocaleDateString("en-IN")}
                      </td>

                      {/* PAYMENT */}
                      <td className="px-5 py-4 text-sm text-[rgb(var(--text))]">
                        {tx.paymentMethod}
                      </td>

                      {/* AMOUNT */}
                      <td
                        className={`px-5 py-4 text-sm font-semibold ${isIncome
                          ? "text-[rgb(var(--success))]"
                          : "text-[rgb(var(--danger))]"
                          }`}
                      >
                        {isIncome ? "+" : "-"}₹
                        {Number(tx.amount).toLocaleString("en-IN")}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4 text-center">
                        <button className="rounded-md p-2 text-[rgb(var(--muted))] transition hover:bg-red-500/10 hover:text-red-400">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
                {!transactions?.length && (
                  <tr>
                    <td colSpan={6} className="py-14 text-center text-sm text-[rgb(var(--muted))]">
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