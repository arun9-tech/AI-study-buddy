
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { View, User, StudySession } from './types';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import ResultsPage from './pages/ResultsPage';
import Navbar from './components/Navbar';
import BackgroundEffect from './components/BackgroundEffect';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);

  useEffect(() => {
    // Session persistent check
    const savedUser = localStorage.getItem('studybuddy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView(View.DASHBOARD);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studybuddy_user');
    setUser(null);
    setCurrentView(View.LANDING);
  };

  const navigateTo = (view: View) => setCurrentView(view);

  return (
    <div className="min-h-screen text-slate-200 relative">
      <BackgroundEffect />
      
      {user && (
        <Navbar 
          user={user} 
          currentView={currentView} 
          onNavigate={navigateTo} 
          onLogout={handleLogout} 
        />
      )}

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === View.LANDING && (
            <LandingPage key="landing" onGetStarted={() => navigateTo(View.LOGIN)} />
          )}
          {currentView === View.LOGIN && (
            <LoginPage 
              key="login" 
              onSuccess={(u) => { setUser(u); navigateTo(View.DASHBOARD); }} 
              onToggle={() => navigateTo(View.REGISTER)} 
            />
          )}
          {currentView === View.REGISTER && (
            <RegisterPage 
              key="register" 
              onSuccess={(u) => { setUser(u); navigateTo(View.DASHBOARD); }} 
              onToggle={() => navigateTo(View.LOGIN)} 
            />
          )}
          {currentView === View.DASHBOARD && user && (
            <DashboardPage 
              key="dashboard" 
              user={user} 
              onProcessed={(session) => {
                setActiveSession(session);
                navigateTo(View.RESULT);
              }} 
            />
          )}
          {currentView === View.RESULT && activeSession && (
            <ResultsPage 
              key="result" 
              session={activeSession} 
              onBack={() => navigateTo(View.DASHBOARD)} 
            />
          )}
          {currentView === View.HISTORY && user && (
            <HistoryPage 
              key="history" 
              user={user} 
              onViewResult={(session) => {
                setActiveSession(session);
                navigateTo(View.RESULT);
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
