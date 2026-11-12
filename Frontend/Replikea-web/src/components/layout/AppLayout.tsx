
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";


function AppLayout() {
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
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
