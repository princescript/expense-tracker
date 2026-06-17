import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function ChartContainer({
  title,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-xl bg-[rgb(var(--surface))] p-4 shadow-sm ${className}`}
    >
      {/* TITLE */}
      {title && (
        <h2 className="mb-3 text-sm font-medium text-[rgb(var(--muted))]">
          {title}
        </h2>
      )}

      {/* CHART AREA */}
      <div className="h-72 w-full">
        {children}
      </div>
    </div>
  );
}