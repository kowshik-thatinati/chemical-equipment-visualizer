import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import History from './components/History';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activePage, setActivePage] = useState('home');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Floating Theme Toggle Button Component
  const ThemeToggle = () => (
    <button 
      onClick={toggleTheme} 
      style={{
        position: 'fixed',
        top: '20px',
        right: '25px',
        zIndex: 1100, // Higher than sidebar
        background: 'var(--card-bg)',
        border: '1px solid var(--accent-primary)',
        color: 'var(--text-primary)',
        padding: '8px 15px',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '1rem',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 'bold',
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );

  return (
    <div className="App" style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <ThemeToggle />
      <Sidebar activePage={activePage} setActivePage={setActivePage} theme={theme} />
      
      {/* Main Content Area */}
      <main style={{ 
          flex: 1, 
          position: 'relative', 
          overflowY: 'auto', 
          height: '100vh',
          marginLeft: '0', // Sidebar is purely overlay or push? User asked for minimizing sidebar.
          // Since our sidebar is fixed position, we might want to add padding-left if it was persistent.
          // But user wants it to open/close. 
          // Let's just let it overlay, OR we can add padding if we want 'push' effect.
          // Let's stick to full width main content.
          width: '100%',
      }}>
        {activePage === 'home' && <Home />}
        {activePage === 'app' && <Dashboard theme={theme} />}
        {activePage === 'history' && <History />}
      </main>
    </div>
  );
}

export default App;
