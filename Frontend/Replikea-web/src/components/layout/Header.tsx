import { PanelLeftClose, PanelLeftOpen, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../../context/useAuth";

interface HeaderProps {
  isCollapsed: boolean;
  onMenuClick: () => void;
}

function Header({ isCollapsed, onMenuClick }: HeaderProps) {
  const {user, logout} = useAuth();


  async function handleLogout(){
    await logout();
  }

  return (
    <header className="app-header">
      <button
        type="button"
        className="menu_button"
        onClick={onMenuClick}
        aria-label={isCollapsed? "Expand sidebar":"Collapse sidebar"}
        title={isCollapsed? "Expand sidebar":"Collapse sidebar"}
      >
        {isCollapsed? <PanelLeftOpen size={21} /> : <PanelLeftClose size={21} />
    }

      </button>
      <div className="header-actions">
        <div className="header-user">
          <div className="user-avatar">
            <UserRound size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">
              {user?.firstName} {user?.lastName}
            </span>

            <span className="user-role">{user?.role}</span>
          </div>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
