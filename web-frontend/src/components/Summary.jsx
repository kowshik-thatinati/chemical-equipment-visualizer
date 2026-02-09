import React from 'react';

const Summary = ({ data }) => {
  if (!data) return null;

  const { equipment_type_distribution } = data;

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>
        <span style={styles.neonDot}></span> 
        DATA INTELLIGENCE
      </h2>
      
      <div style={styles.statsGrid}>
        <div style={styles.glassCard}>
          <h4 style={styles.cardTitle}>Total Equipment</h4>
          <p style={styles.cardValue} className="neon-text-pink">{data.total_equipment_count}</p>
        </div>
        <div style={styles.glassCard}>
          <h4 style={styles.cardTitle}>Avg Flowrate</h4>
          <p style={styles.cardValue}>{data.average_flowrate} <span style={styles.unit}>L/hr</span></p>
        </div>
        <div style={styles.glassCard}>
          <h4 style={styles.cardTitle}>Avg Pressure</h4>
          <p style={styles.cardValue}>{data.average_pressure} <span style={styles.unit}>Bar</span></p>
        </div>
        <div style={styles.glassCard}>
          <h4 style={styles.cardTitle}>Avg Temperature</h4>
          <p style={styles.cardValue}>{data.average_temperature} <span style={styles.unit}>°C</span></p>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
           <h3 style={styles.tableTitle}>ASSET BREAKDOWN</h3>
           <div style={styles.badge}>{data.total_equipment_count} ITEMS</div>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>EQUIPMENT TYPE</th>
              <th style={styles.th}>COUNT</th>
              <th style={styles.th}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(equipment_type_distribution).map(([type, count]) => (
              <tr key={type} style={styles.tr}>
                <td style={styles.td}>{type}</td>
                <td style={styles.td}>{count}</td>
                <td style={styles.td}><span style={styles.statusOk}>ACTIVE</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '60px',
  },
  sectionTitle: {
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--accent-primary)',
    paddingBottom: '15px',
    marginBottom: '30px',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '2px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '1.8rem', /* Larger font */
  },
  neonDot: {
    width: '12px',
    height: '12px',
    backgroundColor: 'var(--accent-primary)',
    borderRadius: '50%',
    boxShadow: '0 0 10px var(--accent-primary)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', /* Wider cards */
    gap: '30px',
    marginBottom: '50px',
  },
  glassCard: {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid var(--card-border)',
    boxShadow: 'var(--card-shadow)',
    transition: 'transform 0.3s, border-color 0.3s',
  },
  cardTitle: {
    margin: '0 0 15px 0',
    color: 'var(--text-tertiary)',
    fontSize: '1rem',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  cardValue: {
    margin: 0,
    fontSize: '3rem', /* Much larger numbers */
    fontWeight: 'bold',
    fontFamily: "'Rajdhani', sans-serif",
    color: 'var(--text-primary)',
    textShadow: '0 0 20px rgba(255,255,255,0.1)',
  },
  unit: {
    fontSize: '1.4rem',
    color: 'var(--accent-primary)',
    marginLeft: '5px',
  },
  tableContainer: {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(10px)',
    borderRadius: '4px',
    border: '1px solid var(--card-border)',
    boxShadow: 'var(--card-shadow)',
    overflow: 'hidden',
    position: 'relative',
  },
  tableHeader: {
    padding: '25px 40px',
    background: 'var(--table-header-bg)',
    borderBottom: '1px solid var(--table-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableTitle: {
    margin: 0,
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '1.2rem',
    letterSpacing: '2px',
    color: 'var(--text-primary)',
  },
  badge: {
    background: 'rgba(0, 243, 255, 0.1)',
    color: 'var(--accent-primary)',
    padding: '8px 15px',
    borderRadius: '4px',
    fontSize: '0.9rem',
    border: '1px solid var(--card-border)',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: 'var(--text-secondary)',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '1.2rem', /* Larger table text */
  },
  th: {
    padding: '25px 40px',
    textAlign: 'left',
    fontSize: '1rem',
    color: 'var(--accent-primary)',
    fontWeight: 'bold',
    letterSpacing: '1px',
    borderBottom: '1px solid var(--table-border)',
  },
  td: {
    padding: '20px 40px',
    borderBottom: '1px solid var(--table-border)',
    color: 'var(--text-primary)',
  },
  tr: {
    transition: 'background 0.2s',
  },
  statusOk: {
    color: 'var(--accent-success)',
    background: 'rgba(0, 255, 157, 0.1)',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  }
};

export default Summary;
