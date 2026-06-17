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
      className={`rounded-xl bg-[rgb(var(--surface))] p-4 shadow-sm select-none ${className}`}
    >
      {title && (
        <h2 className="mb-3 text-sm font-medium text-[rgb(var(--muted))] select-none">
          {title}
        </h2>
      )}

      <div className="h-72 w-full select-none">
        {children}
      </div>
    </div>
  );
}