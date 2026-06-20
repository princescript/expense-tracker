import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
} from "recharts";

type DataItem = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: DataItem[];
};

export default function SpendingByCategory({ data }: Props) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div
      className="
        w-full
        rounded-2xl
        border border-[rgb(var(--border))]
        bg-[rgb(var(--surface))]
        p-5
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[rgb(var(--text))]">
            Spending by Category
          </h3>
          <p className="mt-1 text-xs text-[rgb(var(--muted))]">
            {data.length} categories tracked
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-85">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{
              top: 4,
              right: 20,
              left: 10,
              bottom: 4,
            }}
            barCategoryGap={16}
          >
            <CartesianGrid
              horizontal
              vertical={false}
              stroke="rgb(var(--border))"
              strokeOpacity={0.25}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgb(var(--muted))",
                fontSize: 11,
              }}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `₹${(value / 1000000).toFixed(1)}M`;
                }

                if (value >= 100000) {
                  return `₹${(value / 100000).toFixed(1)}L`;
                }

                if (value >= 1000) {
                  return `₹${(value / 1000).toFixed(0)}K`;
                }

                return `₹${value}`;
              }}
            />

            {/* FIXED HERE */}
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgb(var(--text))",
                fontSize: 13,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.03)",
              }}
              contentStyle={{
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: "14px",
                boxShadow: "0 12px 32px rgba(0,0,0,.12)",
                color: "rgb(var(--text))",
              }}
              formatter={(value: any) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Spent",
              ]}
              labelStyle={{
                color: "rgb(var(--muted))",
              }}
            />

            {/* FIXED HERE */}
            <Bar
              dataKey="value"
              radius={[0, 999, 999, 0]}
              barSize={18}
              animationDuration={900}
            >
              {sortedData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


