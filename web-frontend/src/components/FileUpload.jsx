import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      // POST request to Django backend
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Pass the response data (statistics) up to the parent component
      onUploadSuccess(response.data);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please check the file and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.glassCard}>
      <h3 style={styles.heading}>DATA INGESTION</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        <label style={styles.fileInputLabel}>
           <span style={styles.icon}>📂</span>
           {file ? file.name : "Select CSV Dataset"}
           <input 
             type="file" 
             accept=".csv" 
             onChange={handleFileChange} 
             style={styles.hiddenInput}
           />
        </label>

        <button 
          type="submit" 
          disabled={loading} 
          style={{
            ...styles.button, 
            opacity: loading ? 0.7 : 1, 
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'PROCESSING...' : 'INITIALIZE ANALYTICS'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  glassCard: {
    background: 'var(--card-bg)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '20px',
    border: '1px solid var(--card-border)',
    padding: '40px',
    width: '100%',
    maxWidth: '600px', /* Increased width */
    boxShadow: 'var(--card-shadow)',
    textAlign: 'center',
    color: 'var(--text-primary)',
    transform: 'translateY(0)',
    transition: 'all 0.3s ease',
  },
  heading: {
    marginTop: 0,
    marginBottom: '30px',
    fontSize: '1.4rem', /* Increased font */
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '2px',
    color: 'var(--accent-primary)',
    textShadow: '0 0 10px rgba(0, 243, 255, 0.5)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  fileInputLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    padding: '30px', /* Increased padding */
    border: '2px dashed var(--input-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text-primary)',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '1.3rem', /* Increased font */
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  icon: {
    fontSize: '2rem',
  },
  hiddenInput: {
    display: 'none',
  },
  button: {
    background: 'var(--button-gradient)',
    color: 'var(--button-text)',
    padding: '20px 40px', /* Larger button */
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.3rem', /* Larger font */
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 'bold',
    letterSpacing: '2px',
    boxShadow: '0 0 20px var(--accent-primary)',
    textTransform: 'uppercase',
    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
  error: {
    background: 'rgba(255, 0, 60, 0.1)',
    border: '1px solid rgba(255, 0, 60, 0.4)',
    color: '#ff4d4d',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '20px',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '1.1rem',
  },
};

export default FileUpload;
