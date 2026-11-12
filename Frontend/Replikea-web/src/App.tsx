// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AppLayout from './components/layout/AppLayout';
import { useAuth } from './context/useAuth';
import { Navigate, Route, Routes } from "react-router-dom";


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
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={isAuthenticated? <Navigate to="/"/> : <LoginPage/>}/>

      {/* Protected routes */}
      <Route element={isAuthenticated? <AppLayout /> : <Navigate to="/login" replace />}>
                <Route path="/" element={<HomePage />} />
      </Route>
                
      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />}/>

    </Routes>
  )
}

export default App
