
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppLayoutProps {
    children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    function toggleSidebar() {
        setIsSidebarCollapsed(previous => !previous);
    }

    return (
        <div className="app-layout">
            <Sidebar isCollapsed={isSidebarCollapsed}/>

            <div className="app-main">
                <Header onMenuClick={toggleSidebar}/>

                <main className="app-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
