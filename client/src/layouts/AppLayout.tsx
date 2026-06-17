import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import MobileHeader from "../components/MobileHeader";

const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <div className="flex-1 flex flex-col min-w-0">
                <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};

export default AppLayout;