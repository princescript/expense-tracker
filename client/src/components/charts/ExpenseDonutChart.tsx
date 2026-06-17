import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type DataItem = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: DataItem[];
  total?: number;
};

export default function ExpenseDonutChart({ data, total }: Props) {
  const totalValue =
    total ?? data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          {/* DONUT */}
          <Pie
            data={data}
            dataKey="value"
            innerRadius={75}
            outerRadius={110}
            paddingAngle={4}
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>

          {/* CENTER TEXT */}
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-[rgb(var(--text))] text-lg font-semibold"
          >
            ₹{totalValue.toLocaleString("en-IN")}
          </text>

          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            className="fill-[rgb(var(--muted))] text-xs"
          >
            Total Spend
          </text>

          {/* THEME AWARE TOOLTIP */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(var(--surface))",
              border: "1px solid rgb(var(--border))",
              borderRadius: "12px",
              color: "rgb(var(--text))",
              fontSize: "12px",
            }}
            itemStyle={{
              color: "rgb(var(--text))",
            }}
            labelStyle={{
              color: "rgb(var(--muted))",
              marginBottom: "4px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}