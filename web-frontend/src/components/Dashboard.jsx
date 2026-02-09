import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Summary from './Summary';
import Charts from './Charts';

const Dashboard = ({ theme }) => {
  const [data, setData] = useState(null);

  const handleUploadSuccess = (responseData) => {
    setData(responseData);
  };

  return (
    <div style={styles.dashboard}>
      {/* 
        Removed large Header from Dashboard since app now has a Home page 
        and sidebar structure. Keeping a smaller title or just content 
        helps it feel like a "Tool" view.
      */}
      <header style={styles.header}>
        <p style={styles.subtitle}>DATA UPLOAD & ANALYSIS</p>
      </header>

      <main style={styles.main}>
        <div style={styles.uploadSection}>
           <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
        
        {data && (
          <div style={styles.contentFadeIn}>
            <Summary data={data} />
            <Charts data={data} theme={theme} />
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  dashboard: {
    minHeight: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: '60px', // Extra space for toggle button area if needed
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '0px',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '4rem', /* Increased size */
    margin: '0 0 15px 0',
    letterSpacing: '6px',
    lineHeight: 1.2,
  },
  neonTextBlue: {
    color: 'var(--accent-primary)',
    textShadow: '0 0 10px var(--accent-primary), 0 0 30px var(--accent-primary)',
  },
  neonTextPink: {
    color: 'var(--accent-secondary)',
    textShadow: '0 0 10px var(--accent-secondary), 0 0 30px var(--accent-secondary)',
    marginLeft: '20px',
  },
  subtitle: {
    fontSize: '1.6rem', /* Increased size */
    color: 'var(--text-secondary)',
    fontFamily: "'Rajdhani', sans-serif",
    marginTop: '10px',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    fontWeight: '500',
  },
  main: {
    width: '100%',
    maxWidth: 'none', /* Removed limit to fill screen */
    padding: '0 20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch', /* Ensure children stretch */
  },
  uploadSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '60px',
  },
  contentFadeIn: {
    width: '100%',
    animation: 'fadeIn 0.8s ease-in-out',
  },
};

// Add keyframes for animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

export default Dashboard;

