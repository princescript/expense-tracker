import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
    icon: LucideIcon;
    label: string;
    to: string;
};

export default function SidebarItem({
    icon: Icon,
    label,
    to,
}: SidebarItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium
                border
                transition-colors duration-200
                ${
                    isActive
                        ? `
                            border-[rgb(var(--primary))]/25
                            bg-[rgb(var(--primary))]/10
                            text-[rgb(var(--primary))]
                        `
                        : `
                            border-transparent
                            text-[rgb(var(--muted))]
                            hover:bg-[rgb(var(--card))]
                            hover:border-[rgb(var(--border))]/60
                            hover:text-[rgb(var(--text))]
                        `
                }
                `
            }
        >
            <Icon size={18} />
            <span>{label}</span>
        </NavLink>
    );
}