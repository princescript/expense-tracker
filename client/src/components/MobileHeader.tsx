import { Menu, User } from "lucide-react";

type HeaderProps = {
    onMenuClick: () => void;
};

const MobileHeader = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface))]">

            <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-[rgb(var(--border))] transition"
            >
                <Menu size={20} />
            </button>

            <h1 className="text-sm font-semibold text-[rgb(var(--text))]">
                ExpenseTracker
            </h1>

            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-linear-to-br from-[rgb(var(--primary))] to-emerald-400 text-white">
                <User size={14} />
            </div>

        </header>
    );
};

export default MobileHeader;