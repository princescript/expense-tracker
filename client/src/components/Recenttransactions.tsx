import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lightbulb,
  Car,
  GraduationCap,
  UtensilsCrossed,
  Sparkles,
  Star,
  PartyPopper,
} from "lucide-react";

import {
  DEFAULT_TRANSACTIONS,
  type TransactionDto,
} from "../mocks/transactions";

const CATEGORY_STYLES = {
  Bills: { icon: Lightbulb, color: "text-amber-400" },
  Transport: { icon: Car, color: "text-rose-400" },
  Education: { icon: GraduationCap, color: "text-sky-400" },
  Entertainment: { icon: PartyPopper, color: "text-fuchsia-400" },
  "Food & Drinks": { icon: UtensilsCrossed, color: "text-orange-400" },
  Others: { icon: Sparkles, color: "text-emerald-400" },
};

type CategoryKey = keyof typeof CATEGORY_STYLES;

function isCategoryKey(value: string): value is CategoryKey {
  return value in CATEGORY_STYLES;
}

export type Props = {
  transactions?: TransactionDto[];
};

export default function RecentTransactions({
  transactions = DEFAULT_TRANSACTIONS,
}: Props) {
  const [highlighted, setHighlighted] = useState<Record<number, boolean>>({});

  function toggleHighlight(id: number) {
    setHighlighted((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="w-full rounded-2xl bg-[rgb(var(--surface))]">

      {/* HEADER (no border) */}
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-sm font-semibold text-[rgb(var(--text))]">
          Recent Transactions
        </h2>

        <Link
          to="/transactions"
          className="flex items-center gap-1 text-xs text-[rgb(var(--primary))] hover:opacity-80"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* LIST */}
      <div className="space-y-2 px-3 pb-4">
        {transactions.map((tx) => {
          const category: CategoryKey = isCategoryKey(tx.category)
            ? tx.category
            : "Others";

          const style = CATEGORY_STYLES[category];
          const Icon = style.icon;

          const isHighlighted = !!highlighted[tx.id];
          const isIncome = tx.amount >= 0;

          return (
            <div
              key={tx.id}
              onClick={() => toggleHighlight(tx.id)}
              className={`relative flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition
                hover:bg-[rgb(var(--card))] ${
                  isHighlighted ? "bg-yellow-500/5" : ""
                }`}
            >

              {/* LEFT YELLOW BAR */}
              {isHighlighted && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-yellow-400" />
              )}

              {/* LEFT */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--card))]">
                  <Icon className={`h-4.5 w-4.5 ${style.color}`} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[rgb(var(--text))]">
                    {tx.name}
                  </p>
                  <p className="text-[11px] text-[rgb(var(--muted))]">
                    {tx.category} • {tx.date}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">

                <span
                  className={`text-sm font-semibold ${
                    isIncome
                      ? "text-[rgb(var(--success))]"
                      : "text-[rgb(var(--danger))]"
                  }`}
                >
                  {tx.amount.toLocaleString("en-IN")}
                </span>

                <button
                  className={`p-1.5 transition ${
                    isHighlighted
                      ? "text-yellow-400"
                      : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                  }`}
                >
                  <Star
                    className="h-4 w-4"
                    fill={isHighlighted ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}