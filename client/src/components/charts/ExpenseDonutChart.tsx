import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

type DataItem = {
  name: string;
  value: number;
  color?: string;
};

type Props = {
  data: DataItem[];
  totalBalance?: number;
};

export default function ExpenseDonutChart({
  data,
  totalBalance = 0,
}: Props) {
  const totalExpense = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={`rounded-xl bg-[rgb(var(--surface))] p-4 shadow-sm select-none `}
    >
      <h2 className="mb-3 text-sm font-medium text-[rgb(var(--muted))] select-none">
        Expense Breakdown
      </h2>
      <div className="w-full flex flex-col  text-[rgb(var(--text))] select-none">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[rgb(var(--muted))]">Total Balance</p>
            <p
              className={`text-lg font-semibold ${totalBalance < 0
                ? "text-[rgb(var(--danger))]"
                : "text-[rgb(var(--text))]"
                }`}
            >
              ₹{totalBalance.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-[rgb(var(--muted))]">This Month</p>
            <p className="text-lg font-semibold">
              ₹{totalExpense.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-col md:flex-row items-center gap-6">

          {/* DONUT */}
          <div className="relative w-full md:w-1/2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}

                  <Label
                    position="center"
                    content={() => (
                      <g>
                        <text
                          x="50%"
                          y="45%"
                          textAnchor="middle"
                          fill="currentColor"
                          className="text-lg font-semibold"
                        >
                          ₹{totalExpense.toLocaleString("en-IN")}
                        </text>

                        <text
                          x="50%"
                          y="58%"
                          textAnchor="middle"
                          fill="rgb(var(--muted))"
                          className="text-xs"
                        >
                          Total Spend
                        </text>
                      </g>
                    )}
                  />
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgb(var(--surface))",
                    border: "1px solid rgb(var(--border))",
                    borderRadius: "10px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* LEGEND */}
          <div className="w-full md:w-1/2 space-y-3">
            {[...data]
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-[rgb(var(--muted))]">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-sm font-medium">
                    ₹{item.value.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}