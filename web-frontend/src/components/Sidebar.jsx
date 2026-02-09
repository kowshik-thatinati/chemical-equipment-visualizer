import React, { useState } from 'react';

const Sidebar = ({ activePage, setActivePage, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'app', label: 'Application', icon: '📊' },
    { id: 'history', label: 'History', icon: '📜' }
  ];

  return (
    <>
        {/* Toggle Button (Hamburger) - Visible when sidebar is closed or on mobile */}
        <button 
            onClick={toggleSidebar}
            style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 1001,
                background: 'var(--card-bg)',
                border: '1px solid var(--accent-primary)',
                color: 'var(--text-primary)',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
            }}
        >
            <div style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '4px',
                width: '24px'
            }}>
                <span style={{height: '2px', background: 'currentColor', width: '100%'}}></span>
                <span style={{height: '2px', background: 'currentColor', width: '100%'}}></span>
                <span style={{height: '2px', background: 'currentColor', width: '100%'}}></span>
            </div>
        </button>

        {/* Sidebar Container */}
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: isOpen ? '250px' : '0px',
            background: 'var(--card-bg)', // Use CSS variable for theme
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid var(--card-border)',
            overflowX: 'hidden',
            transition: 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '80px', // Space for the toggle button
            boxShadow: isOpen ? '5px 0 15px rgba(0,0,0,0.3)' : 'none',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '0 15px',
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.2s ease',
                pointerEvents: isOpen ? 'all' : 'none',
            }}>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActivePage(item.id);
                            setIsOpen(false); 
                        }}
                        style={{
                            background: activePage === item.id 
                                ? 'linear-gradient(90deg, rgba(0, 243, 255, 0.2) 0%, transparent 100%)' 
                                : 'transparent',
                            border: 'none',
                            borderLeft: activePage === item.id 
                                ? '3px solid var(--accent-primary)' 
                                : '3px solid transparent',
                            color: activePage === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            padding: '15px 20px',
                            textAlign: 'left',
                            fontSize: '1.1rem',
                            fontFamily: "'Rajdhani', sans-serif",
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            borderRadius: '0 8px 8px 0',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                             if(activePage !== item.id) e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                             if(activePage !== item.id) e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </div>
            
            {/* Footer / Branding in Sidebar */}
            <div style={{
                marginTop: 'auto',
                padding: '20px',
                textAlign: 'center',
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.3s ease 0.2s',
            }}>
                 <small style={{ color: 'var(--text-tertiary)' }}>ChemVisualizer v1.0</small>
            </div>
        </div>
    </>
  );
};

export default Sidebar;
