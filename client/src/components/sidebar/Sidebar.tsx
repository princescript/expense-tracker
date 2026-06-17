import {
    LayoutDashboard,
    Receipt,
    BarChart3,
    Target,
    Calendar,
    Wallet,
    Settings,
    Moon,
    Sun,
    LogOut,
    User,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import clsx from "clsx";
import { useTheme } from "../../contexts/theme-context";

const menuItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        to: "/",
    },
    {
        label: "Transactions",
        icon: Receipt,
        to: "/transactions",
    },
    {
        label: "Analytics",
        icon: BarChart3,
        to: "/analytics",
    },
    {
        label: "Budget",
        icon: Target,
        to: "/budget",
    },
    {
        label: "Calendar",
        icon: Calendar,
        to: "/calendar",
    },
    {
        label: "Wallets",
        icon: Wallet,
        to: "/wallets",
    },
    {
        label: "Settings",
        icon: Settings,
        to: "/settings",
    },
];
type SidebarProps = {
    open: boolean;
    onClose: () => void;
}; export default function Sidebar({ open, onClose }: SidebarProps) {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            {/* Overlay (mobile only) */}
            {open && (
                <div
                    onClick={onClose}
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                />
            )}
            <aside
                className={clsx(
                    "fixed lg:static z-50 top-0 left-0 w-72 flex flex-col",
                    "h-dvh",
                    "border-r bg-[rgb(var(--surface))] border-[rgb(var(--border))]",
                    "transition-transform duration-300",
                    open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo */}
                <div className="border-b border-[rgb(var(--border))] px-5 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--primary))]/90 text-lg">
                            💰
                        </div>

                        <div>
                            <h1 className="text-sm font-semibold text-[rgb(var(--text))] tracking-tight">
                                ExpenseTracker
                            </h1>

                            <p className="text-[11px] text-[rgb(var(--muted))]">
                                Personal Finance
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="sidebar-scroll flex-1 overflow-y-auto px-3 py-3">
                    <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-[rgb(var(--muted))]">
                        Overview
                    </p>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.label}
                                icon={item.icon}
                                label={item.label}
                                to={item.to}
                            />
                        ))}
                    </nav>
                </div>
                {/* User Section */}
                <div className="px-3 py-3 flex flex-col gap-1.5">
                    {/* Theme */}
                    <div className="flex items-center justify-between rounded-xl bg-[rgb(var(--card))] px-3 py-2.5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--card))]">
                                <Moon size={14} className="text-[rgb(var(--muted))]" />
                            </div>
                            <p className="text-sm font-medium text-[rgb(var(--text))]">
                                Dark Mode
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={clsx(
                                "relative flex h-5.5 w-11 items-center rounded-full transition-all duration-300",
                                theme === "dark"
                                    ? "bg-[rgb(var(--primary))]/25"
                                    : "bg-[rgb(var(--border))]"
                            )}>

                            <span
                                className={clsx(
                                    "absolute flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300",
                                    theme === "dark" ? "translate-x-6" : "translate-x-0.5"
                                )}>

                                {theme === "dark" ? (
                                    <Moon size={9} className="text-[rgb(var(--primary))]" />
                                ) : (
                                    <Sun size={9} className="text-amber-500" />
                                )}
                            </span>
                        </button>
                    </div>
                    {/* Profile */}
                    <div
                        className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[rgb(var(--border))] transition-all cursor-pointer ">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[rgb(var(--primary))] to-emerald-400  text-white
                        transition-transform duration-200 group-hover:scale-105 ">
                            <User size={17} />
                        </div>
                        <div className="leading-tight min-w-0">
                            <p className="text-sm font-medium text-[rgb(var(--text))] truncate">
                                Devil
                            </p>
                            <p className="text-[11px] text-[rgb(var(--muted))] truncate">
                                devil@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Logout */}
                    <div className=" group flex items-center gap-3 rounded-xl px-3 py-2  hover:bg-red-500/10  transition-all cursor-pointer ">

                        <div className=" flex h-9 w-9 items-center justify-center rounded-full  bg-[rgb(var(--card))]  text-red-400 ">
                            <LogOut size={17} className="text-red-400" />
                        </div>
                        <p className="text-sm text-red-400">
                            Logout
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}