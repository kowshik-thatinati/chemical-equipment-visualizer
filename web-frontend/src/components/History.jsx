import React, { useState, useEffect } from 'react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Assuming backend is running on default 8000
                const response = await fetch('http://127.0.0.1:8000/api/history/');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setHistory(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch history:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString();
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>UPLOAD HISTORY</h2>
                <p style={styles.subtitle}>Recent Datasets (Last 5)</p>

                {loading ? (
                    <div style={styles.status}>Loading history...</div>
                ) : error ? (
                    <div style={{...styles.status, color: 'var(--accent-secondary)'}}>
                        Failed to load history. Ensure backend is running.
                    </div>
                ) : history.length === 0 ? (
                    <div style={styles.status}>No history found. Upload a file first!</div>
                ) : (
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Dataset Name</th>
                                    <th style={styles.th}>Upload Date</th>
                                    <th style={styles.th}>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item, index) => (
                                    <tr key={item.id} style={{
                                        background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'
                                    }}>
                                        <td style={styles.td}>
                                            <span style={styles.icon}>📄</span> {item.dataset_name}
                                        </td>
                                        <td style={styles.td}>{formatDate(item.uploaded_at)}</td>
                                        <td style={styles.td}>#{item.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 20px',
        width: '100%',
        boxSizing: 'border-box',
    },
    card: {
        maxWidth: '1000px',
        width: '100%',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontFamily: "'Orbitron', sans-serif",
        color: 'var(--accent-primary)',
        fontSize: '2.5rem',
        margin: '0 0 10px 0',
        textShadow: '0 0 15px rgba(0, 243, 255, 0.3)',
    },
    subtitle: {
        fontFamily: "'Rajdhani', sans-serif",
        color: 'var(--text-secondary)',
        fontSize: '1.2rem',
        marginBottom: '30px',
    },
    status: {
        padding: '40px',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
        fontSize: '1.2rem',
        fontFamily: "'Rajdhani', sans-serif",
    },
    tableWrapper: {
        overflowX: 'auto',
        borderRadius: '8px',
        border: '1px solid var(--table-border)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        color: 'var(--text-primary)',
        fontFamily: "'Rajdhani', sans-serif",
    },
    th: {
        textAlign: 'left',
        padding: '16px 20px',
        background: 'var(--table-header-bg)', 
        color: 'var(--accent-primary)',
        borderBottom: '1px solid var(--table-border)',
        fontWeight: '600',
        fontSize: '1.1rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    td: {
        padding: '16px 20px',
        borderBottom: '1px solid var(--table-border)',
        fontSize: '1.1rem',
    },
    icon: {
        marginRight: '8px',
    }
};

export default History;
