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
        <div className="flex h-screen overflow-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
            {/* Sidebar */}
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main wrapper */}
            <div className="flex flex-1 flex-col min-w-0">
                
                {/* Header */}
                <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

                {/* Scrollable area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AppLayout;