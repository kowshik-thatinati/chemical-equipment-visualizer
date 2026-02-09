# Chemical Equipment Visualizer

**A cross-platform data visualization tool for chemical equipment analytics.**  
*Developed for the FOSSEE Semester Long Internship 2026 Screening Task.*

This project implements a full-stack solution featuring a **Shared Django Backend**, a **React Web Client**, and a **PyQt5 Desktop Client**. It enables chemical engineers to upload equipment logs (CSV), view real-time performance metrics, and track historical data in a modern, Cyberpunk-themed interface.

## 🚀 Features

### Core Functionality
*   **CSV Data Processing**: Upload and analyze equipment logs instantly.
*   **Smart Analytics**: Calculates Average Flowrate, Pressure, and Temperature automatically via Pandas.
*   **Visualizations**:
    *   **Bar Charts**: Comparative analysis of key parameters.
    *   **Pie Charts**: Equipment type distribution (Pumps, Tanks, Exchangers).
*   **History Tracking**: Retains the last 5 uploaded datasets for quick reference.

### User Interface
*   **Dual Frontend**: Access the tool via a Web Browser or a Native Desktop App.
*   **Theme System**: Toggle between **Cyberpunk Dark Mode** and **Clean Light Mode**.
*   **Responsive Design**: Full-screen layouts with collapsible sidebars.

## 🛠️ Tech Architecture

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | Django 5.0 + DRF | REST API handling data processing & storage. |
| **Database** | SQLite | Stores uploaded file metadata (History). |
| **Data Engine** | Pandas | High-performance CSV parsing & calculation. |
| **Web Client** | React 19 + Vite | Modern, responsive web interface using Chart.js. |
| **Desktop Client** | PyQt5 + Matplotlib | Native Windows application consuming the same API. |

## 📂 Project Structure

```
chemical-equipment-visualiser/
├── backend/                # Server Side
│   ├── api/                # API Logic (Views, Serializers)
│   ├── core/               # Django Settings
│   └── manage.py           # Entry point
│
├── web-frontend/           # Web Client
│   ├── src/
│   │   ├── components/     # React Components (Sidebar, Dashboard, History)
│   │   └── App.jsx         # Main App Wrapper
│   └── package.json        
│
├── desktop-app/            # Desktop Client
│   ├── main.py             # PyQt5 Application Entry Point
│   └── requirements.txt    # Desktop-specific dependencies
│
└── sample_equipment_data.csv # Test Dataset
```

## ⚡ Installation & Setup

### Prerequisites
*   **Python 3.9+**
*   **Node.js 16+** & **npm**

### Step 1: Backend Setup (Required)
The backend must be running for both clients to work.

```bash
cd backend

# Create & Activate Virtual Environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
# source venv/bin/activate

# Install Dependencies
pip install django djangorestframework pandas django-cors-headers

# Initialize Database
python manage.py migrate

# Start Server
python manage.py runserver
```
*Server running at: `http://127.0.0.1:8000/`*

---

### Step 2: Web Client Setup (Optional)

```bash
# Open a new terminal
cd web-frontend

# Install Dependencies
npm install

# Start Web App
npm run dev
```
*Access Web App at: `http://localhost:5173/`*

---

### Step 3: Desktop Client Setup (Optional)

```bash
# Open a new terminal
# Ensure you have the Python dependencies installed
pip install pyqt5 matplotlib requests

# Run Desktop App
python desktop-app/main.py
```
*The native application window will launch.*

## 📖 How to Use

1.  **Launch the App**: Open either the Web URL or the Desktop App.
2.  **Navigation**: Use the **Sidebar (☰)** to switch between:
    *   **Home**: Project overview.
    *   **Application**: The main dashboard.
    *   **History**: Log of recent uploads.
3.  **Analyze Data**:
    *   Go to **Application**.
    *   Click **Upload CSV**.
    *   Select `sample_equipment_data.csv`.
    *   View generated KPIs (Cards) and Charts.
4.  **Check History**: Go to **History** to see your upload record.
5.  **Change Theme**: Click the **Sun/Moon** button in the sidebar to toggle themes.

## 📡 API Reference

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/upload/` | `POST` | Accepts `.csv` file, returns JSON stats. |
| `/api/history/` | `GET` | Returns list of last 5 CSVs. |

## 🔮 Future Roadmap

*   **Export Reports**: Download charts as PDF/PNG.
*   **User Auth**: Multi-user login support.
*   **Live Data**: WebSocket integration for real-time sensor streams.

## 📤 Submission Info

*   **Repository**: [GitHub Link](https://github.com/kowshik-thatinati/chemical-equipment-visualizer)
*   **Role**: FOSSEE Internship Screening Task

---
*Built with ❤️ using Django, React, and Python.*
