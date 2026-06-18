import { useMemo, useState } from "react";
import RecentTransactions from "../components/Recenttransactions";
import { CalendarDays } from "lucide-react";

function Calendar() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const days = useMemo(() => {
        const end = new Date(year, month + 1, 0);

        const arr: Date[] = [];
        for (let i = 1; i <= end.getDate(); i++) {
            arr.push(new Date(year, month, i));
        }
        return arr;
    }, [year, month]);

    const changeMonth = (dir: number) => {
        const d = new Date(selectedDate);
        d.setMonth(d.getMonth() + dir);
        setSelectedDate(d);
    };

    const changeYear = (dir: number) => {
        const d = new Date(selectedDate);
        d.setFullYear(d.getFullYear() + dir);
        setSelectedDate(d);
    };

    return (
        <div className="space-y-4">

            {/* Header */}
            <div className="space-y-0.5">
                <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
                    Calendar
                </h2>
                <p className="text-xs text-[rgb(var(--muted))]">
                    Filter transactions by date
                </p>
            </div>

            {/* Calendar Card */}
            <div className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3">

                {/* Controls */}
                <div className="mb-3 flex items-center justify-between gap-3">

                    {/* Month */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => changeMonth(-1)}
                            className="h-7 w-7 rounded-md border border-[rgb(var(--border))] text-xs hover:bg-[rgb(var(--surface))]"
                        >
                            ‹
                        </button>

                        <span className="min-w-22.5 text-center text-xs font-medium">
                            {selectedDate.toLocaleString("default", { month: "short" })}
                        </span>

                        <button
                            onClick={() => changeMonth(1)}
                            className="h-7 w-7 rounded-md border border-[rgb(var(--border))] text-xs hover:bg-[rgb(var(--surface))]"
                        >
                            ›
                        </button>
                    </div>

                    {/* Year */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => changeYear(-1)}
                            className="h-7 w-7 rounded-md border border-[rgb(var(--border))] text-xs hover:bg-[rgb(var(--surface))]"
                        >
                            ‹
                        </button>

                        <span className="min-w-13.75 text-center text-xs font-medium">
                            {year}
                        </span>

                        <button
                            onClick={() => changeYear(1)}
                            className="h-7 w-7 rounded-md border border-[rgb(var(--border))] text-xs hover:bg-[rgb(var(--surface))]"
                        >
                            ›
                        </button>
                    </div>
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">

                    {days.map((date) => {
                        const isSelected =
                            date.toDateString() === selectedDate.toDateString();

                        const isToday =
                            date.toDateString() === new Date().toDateString();

                        return (
                            <button
                                key={date.toISOString()}
                                onClick={() => setSelectedDate(date)}
                                className={`
                                        relative h-9 rounded-lg text-xs font-medium
                                        transition-all duration-200 border border-transparent
                                    ${isSelected
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-text hover:bg-surface"
                                    }
                                    hover:scale-[1.02]`}>
                                {date.getDate()}
                                {/* today indicator */}
                                {isToday && !isSelected && (
                                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary/70" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between rounded-lg  bg-[rgb(var(--card))] p-3">
                <div className="flex items-center gap-2.5">
                    <CalendarDays className="h-6 w-6 text-[rgb(var(--primary))]/40" />
                    <div>
                        <p className="text-[10px] text-[rgb(var(--muted))]">
                            Total for{" "}
                            {selectedDate.toLocaleString("default", {
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                        <p className="text-lg font-semibold text-[rgb(var(--text))]">
                            80,000
                        </p>
                    </div>
                </div>
            </div>
            {/* Transactions */}
            <RecentTransactions star={false} viewAll={false} />
        </div>
    );
}

export default Calendar;