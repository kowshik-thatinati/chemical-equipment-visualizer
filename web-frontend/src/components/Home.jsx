import React from 'react';

const Home = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>
                    <span style={styles.neonTextBlue}>CHEM</span>
                    <span style={styles.neonTextPink}>VISUALIZER</span>
                </h1>
                
                <div style={styles.content}>
                    <p style={styles.paragraph}>
                        Welcome to the <strong>Chemical Equipment Data Visualizer</strong>. 
                        This powerful tool is designed for chemical engineers and plant operators to analyze equipment performance metrics.
                    </p>
                    
                    <h3 style={styles.subHeader}>Why use this tool?</h3>
                    <ul style={styles.list}>
                        <li style={styles.listItem}>
                            <strong>Instant Analytics:</strong> Upload your CSV logs and get immediate visualizations of Flowrate, Pressure, and Temperature.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Outlier Detection:</strong> Quickly spot equipment operating outside of nominal parameters.
                        </li>
                        <li style={styles.listItem}>
                            <strong>Type Distribution:</strong> Understand your equipment inventory breakdown (Pumps, Exchangers, Tanks) at a glance.
                        </li>
                        <li style={styles.listItem}>
                             <strong>History Tracking:</strong> Review your 5 most recently uploaded datasets.
                        </li>
                    </ul>

                    <div style={styles.instructionBox}>
                        <p style={{margin:0}}>
                            <strong>Get Started:</strong> Open the sidebar menu ☰ and select <strong>"Application"</strong> to upload your first dataset.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        padding: '40px',
        boxSizing: 'border-box',
    },
    card: {
        maxWidth: '900px',
        width: '100%',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        padding: '60px',
        textAlign: 'left',
    },
    title: {
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '3.5rem',
        margin: '0 0 40px 0',
        lineHeight: 1.1,
        textAlign: 'center',
    },
    neonTextBlue: {
        color: 'var(--accent-primary)',
        textShadow: '0 0 10px var(--accent-primary)',
    },
    neonTextPink: {
        color: 'var(--accent-secondary)',
        textShadow: '0 0 10px var(--accent-secondary)',
        marginLeft: '20px',
    },
    content: {
        color: 'var(--text-primary)',
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '1.2rem',
    },
    paragraph: {
        lineHeight: '1.6',
        fontSize: '1.4rem',
        marginBottom: '30px',
    },
    subHeader: {
        color: 'var(--accent-primary)',
        fontSize: '1.8rem',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        display: 'grid',
        gap: '15px',
    },
    listItem: {
        background: 'rgba(255,255,255,0.03)',
        padding: '15px 20px',
        borderRadius: '8px',
        borderLeft: '4px solid var(--accent-secondary)',
        fontSize: '1.2rem',
        lineHeight: 1.4
    },
    instructionBox: {
        marginTop: '40px',
        padding: '20px',
        borderRadius: '8px',
        background: 'linear-gradient(90deg, rgba(0, 243, 255, 0.1) 0%, transparent 100%)',
        border: '1px solid var(--accent-primary)',
        color: 'var(--text-primary)',
        fontSize: '1.2rem',
        textAlign: 'center'
    }
};

export default Home;
