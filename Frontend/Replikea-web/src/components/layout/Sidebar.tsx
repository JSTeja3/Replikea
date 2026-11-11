
interface SidebarProps {
    isCollapsed: boolean;
}

function Sidebar({ isCollapsed }: SidebarProps) {
    return (
        <aside className={`app-sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-brand">
                {isCollapsed ? (
                    <img src="/replikea-icon.png" alt="Replikea" />
                ) : (
                    <img src="/replikea-logo.png" alt="Replikea Enterprise" />
                )}
            </div>

            <nav className="sidebar-nav">
                {/* Navigation items will go here */}
            </nav>
        </aside>
    );
}

export default Sidebar;
