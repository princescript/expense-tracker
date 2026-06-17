type StatCardProps = {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: React.ReactNode;
    variant?: "green" | "red" | "purple";
};

export default function StatCard({
    title,
    value,
    change,
    trend,
    icon,
    variant = "green",
}: StatCardProps) {

    const styles = {
        green: {
            iconBg: "bg-emerald-500/10 text-emerald-400",
            change: "text-emerald-400",
        },
        red: {
            iconBg: "bg-red-500/10 text-red-400",
            change: "text-red-400",
        },
        purple: {
            iconBg: "bg-violet-500/10 text-violet-400",
            change: "text-violet-400",
        },
    };

    const s = styles[variant];

    return (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4">
            
            <div className="flex items-center gap-3">

                {/* ICON */}
                <div className={`p-2.5 rounded-lg ${s.iconBg}`}>
                    {icon}
                </div>

                {/* TEXT */}
                <div className="leading-tight">
                    <p className="text-xs text-[rgb(var(--muted))]">
                        {title}
                    </p>

                    <h2 className="text-xl font-semibold text-[rgb(var(--text))]">
                        {value}
                    </h2>

                    <p className={`text-[11px] ${s.change}`}>
                        {trend === "up" ? "↗" : "↘"} {change}
                    </p>
                </div>

            </div>
        </div>
    );
}