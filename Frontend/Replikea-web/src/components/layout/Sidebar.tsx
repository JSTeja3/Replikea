import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  FileText,
  Bell,
  CircleHelp,
} from "lucide-react";
interface SidebarProps {
  isCollapsed: boolean;
}

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Product Management",
    path: "/products",
    icon: PackagePlus,
  },
  {
    label: "Product Design",
    path: "/product-design",
    icon: FileText,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    label: "Help",
    path: "/help",
    icon: CircleHelp,
  },
];

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
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} />

              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
