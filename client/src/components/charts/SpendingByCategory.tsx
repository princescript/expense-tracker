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



// import {
//     ResponsiveContainer,
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Cell,
//     Tooltip,
// } from "recharts";

// type DataItem = {
//   category: string;
//   amount: number;
//   color: string;
// };
// type Props = {
//   data: DataItem[];
// };

// export function SpendingByCategory({data}:Props) {
//     const totalSpent = data.reduce((sum, item) => sum + item.amount, 0);

//     if (!data || data.length === 0) {
//         return (
//             <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold text-slate-900">
//                     Spending by Category
//                 </h3>
//                 <p className="text-sm text-slate-500">
//                     Expense distribution across categories
//                 </p>
//                 <div className="h-80 flex items-center justify-center text-sm text-slate-500">
//                     No spending recorded yet
//                 </div>
//             </div>
//         );
//     }
//     return (
//         <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
//             <div className="mb-6 flex items-start justify-between">
//                 <div>
//                     <h3 className="text-lg font-semibold text-slate-900">
//                         Spending by Category
//                     </h3>
//                     <p className="text-sm text-slate-500">
//                         Expense distribution across categories
//                     </p>
//                 </div>
//                 <div className="text-right">
//                     <p className="text-2xl font-bold text-slate-900">
//                         ₹{totalSpent.toLocaleString("en-IN")}
//                     </p>
//                     <p className="text-xs text-slate-500">Total spent</p>
//                 </div>
//             </div>

//             <div className="h-80 mb-2">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                         data={data}
//                         margin={{ top: 10, right: 10, left: 0, bottom: 24 }}
//                     >
//                         <CartesianGrid
//                             stroke="#e2e8f0"
//                             strokeDasharray="3 3"
//                             vertical={false}
//                         />
//                         <XAxis
//                             dataKey="category"
//                             axisLine={false}
//                             tickLine={false}
//                             interval={0}
//                             angle={-20}
//                             textAnchor="end"
//                             height={50}
//                             tick={{ fill: "#64748b", fontSize: 12 }}
//                         />
//                         <YAxis
//                             width={60}
//                             axisLine={false}
//                             tickLine={false}
//                             tick={{ fill: "#64748b", fontSize: 12 }}
//                             tickFormatter={(value) => {
//                                 if (value >= 100000) {
//                                     return `₹${(value / 100000).toFixed(1)}L`;
//                                 }
//                                 if (value >= 1000) {
//                                     return `₹${(value / 1000).toFixed(0)}k`;
//                                 }
//                                 return `₹${value}`;
//                             }}
//                         />
//                         <Tooltip
//                             cursor={{ fill: "rgba(15, 23, 42, 0.06)" }}
//                             contentStyle={{
//                                 background: "#fff",
//                                 border: "1px solid #e2e8f0",
//                                 borderRadius: "12px",
//                                 boxShadow: "0 10px 30px rgba(0,0,0,.15)",
//                                 color: "#0f172a",
//                             }}
//                             formatter={(value) => [
//                                 `₹${Number(value).toLocaleString("en-IN")}`,
//                                 "Spent",
//                             ]}
//                         />
//                         <Bar
//                             dataKey="amount"
//                             radius={[10, 10, 0, 0]}
//                             maxBarSize={48}
//                             animationDuration={800}
//                         >
//                             {data.map((item, index) => (
//                                 <Cell key={`${item.category}-${index}`} fill={item.color} />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }
