import { Search, Plus } from "lucide-react";
import { useGreetingDate } from "../hooks/useGreetingDate";

export default function DownHeader() {
    const { greeting, date } = useGreetingDate();

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-[rgb(var(--surface))] border-[rgb(var(--border))] px-6 backdrop-blur-md">

            {/* Left: Title */}
            <div className="flex flex-col">
                <h2 className="text-base font-light text-[rgb(var(--text))] tracking-tight">
                    {greeting}
                    <span className="text-[rgb(var(--primary))] font-medium">, Devil</span>
                </h2>

                <p className="text-xs font-light text-[rgb(var(--muted))] tracking-tight">
                    {date}
                </p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">

                {/* Search */}
                <div className="hidden md:flex items-center gap-2 rounded-xl bg-[rgb(var(--card))]/40 px-3 py-2 backdrop-blur-md">
                    <Search size={16} className="text-[rgb(var(--muted))]" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-60 bg-transparent text-sm text-[rgb(var(--text))] outline-none placeholder:text-[rgb(var(--muted))]"
                    />
                </div>

                {/* Add Button */}
                <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white bg-[rgb(var(--primary))] hover:opacity-90 transition">
                    <Plus size={16} />
                    ADD Expense
                </button>

            </div>
        </header>
    );
}