import { Menu, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../../context/useAuth";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
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
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
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
