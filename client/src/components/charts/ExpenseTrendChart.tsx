import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DataPoint = {
  date: string;
  expense: number;
};

type Props = {
  data: DataPoint[];
};

export default function ExpenseTrendChart({ data }: Props) {
  return (
    <div
      className={`rounded-xl bg-[rgb(var(--surface))] p-4 shadow-sm select-none`}
    >

      <h2 className="mb-3 text-sm font-medium text-[rgb(var(--muted))] select-none">

      </h2>

      <div className="h-72 w-full select-none">
        <div className="h-full w-full select-none text-[rgb(var(--text))]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>

              {/* GRID */}
              <CartesianGrid
                stroke="rgb(var(--border))"
                strokeDasharray="3 3"
                opacity={0.25}
              />

              {/* X AXIS */}
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgb(var(--muted))", fontSize: 12 }}
              />

              {/* Y AXIS */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgb(var(--muted))", fontSize: 12 }}
              />

              {/* TOOLTIP */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgb(var(--surface))",
                  border: "1px solid rgb(var(--border))",
                  borderRadius: "10px",
                  color: "rgb(var(--text))",
                  fontSize: "12px",
                }}
                labelStyle={{
                  color: "rgb(var(--muted))",
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "rgb(var(--text))",
                }}
              />

              {/* LINE */}
              <Line
                type="monotone"
                dataKey="expense"
                stroke="rgb(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "rgb(var(--primary))",
                  strokeWidth: 2,
                }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}