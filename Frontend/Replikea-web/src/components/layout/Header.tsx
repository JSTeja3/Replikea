
interface HeaderProps {
    onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
    return (
        <head className="app-header">
            <button type="button" onClick = {onMenuClick}></button>
        </head>
    );
}

export default Header;
