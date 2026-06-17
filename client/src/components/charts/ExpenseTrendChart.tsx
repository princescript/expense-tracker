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
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>

        {/* GRID */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgb(var(--border))"
          opacity={0.3}
        />

        {/* X AXIS */}
        <XAxis
          dataKey="date"
          tick={{ fill: "rgb(var(--muted))", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        {/* Y AXIS */}
        <YAxis
          tick={{ fill: "rgb(var(--muted))", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
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
  );
}