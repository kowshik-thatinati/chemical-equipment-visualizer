import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

const Charts = ({ data, theme }) => {
  if (!data) return null;

  const isLight = theme === 'light';
  const textColor = isLight ? '#2c3e50' : '#8892b0';
  const titleColor1 = isLight ? '#0984e3' : '#00f3ff';
  const titleColor2 = isLight ? '#8e44ad' : '#bc13fe';
  const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.05)';
  const legendColor = isLight ? '#2c3e50' : '#ffffff';

  // 1. Data for Average Metrics Bar Chart
  const averageData = {
    labels: ['Flowrate', 'Pressure', 'Temperature'],
    datasets: [
      {
        label: 'Average Values',
        data: [
          data.average_flowrate,
          data.average_pressure,
          data.average_temperature,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const averageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false
      },
      legend: { 
        display: false
      },
      title: { 
        display: true, 
        text: 'PARAMETER AVERAGES',
        color: titleColor1, 
        font: { size: 18, family: "'Orbitron', sans-serif" },
        align: 'start',
        padding: { bottom: 20 }
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { family: "'Rajdhani', sans-serif", size: 14 } },
        grid: { color: gridColor }
      },
      y: {
        ticks: { color: textColor, font: { family: "'Rajdhani', sans-serif", size: 14 } },
        grid: { color: gridColor }
      }
    }
  };

  // 2. Data for Equipment Type Distribution Pie Chart
  const typeLabels = Object.keys(data.equipment_type_distribution);
  const typeValues = Object.values(data.equipment_type_distribution);

  const distributionData = {
    labels: typeLabels,
    datasets: [
      {
        label: '# of Equipment',
        data: typeValues,
        backgroundColor: [
          'rgba(0, 243, 255, 0.6)',
          'rgba(188, 19, 254, 0.6)',
          'rgba(255, 0, 100, 0.6)',
          'rgba(255, 255, 0, 0.6)',
          'rgba(0, 255, 157, 0.6)',
          'rgba(255, 255, 255, 0.6)',
        ],
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
        hoverOffset: 10
      },
    ],
  };
  
  const pieOptions = {
     responsive: true,
     maintainAspectRatio: false,
     plugins: {
        datalabels: {
            color: '#fff',
            textShadowColor: 'black',
            textShadowBlur: 4,
            formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += (typeof data === 'number' ? data : 0);
                });
                let percentage = ((value * 100) / sum).toFixed(1) + "%";
                return percentage;
            },
            font: {
                weight: 'bold',
                size: 14,
                family: "'Rajdhani', sans-serif"
            }
        },
        legend: { 
            position: 'right',
            labels: { 
                color: legendColor, 
                font: { family: "'Rajdhani', sans-serif", size: 14 },
                boxWidth: 15
            } 
        },
        title: {
            display: true,
            text: 'DISTRIBUTION',
            color: titleColor2,
            font: { size: 18, family: "'Orbitron', sans-serif" },
            align: 'start',
            padding: { bottom: 20 }
        }
     }
  };


  return (
    <div style={styles.container}>
      <div style={styles.glassChartBox}>
        <div style={styles.chartWrapper}>
             <Bar data={averageData} options={averageOptions} />
        </div>
      </div>
      <div style={styles.glassChartBox}>
        <div style={styles.chartWrapper}>
             <Pie data={distributionData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    marginTop: '20px',
    width: '100%',
    justifyContent: 'center',
  },
  glassChartBox: {
    flex: '1 1 500px', // Grow, shrink, base width - larger base
    background: 'var(--card-bg)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: 'var(--card-shadow)',
    border: '1px solid var(--card-border)',
    position: 'relative',
    overflow: 'hidden',
  },
  chartWrapper: {
    height: '400px',
    width: '100%',
    position: 'relative',
  }
};

export default Charts;
