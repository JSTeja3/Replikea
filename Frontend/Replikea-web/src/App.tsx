// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { useAuth } from './context/useAuth'

function App() {
  const {isAuthenticated, isLoading} = useAuth();

  if(isLoading){
    return (
            <div className="session-loading">
                <img src="/replikea_icon.png" alt="Replikea" className="session-logo" />
                <div className="loading-spinner"></div>
                <p>Checking your session...</p>
            </div>
        );
  }
  return isAuthenticated? <HomePage /> : <LoginPage />;
}

export default App
