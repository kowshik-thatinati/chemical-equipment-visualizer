# Chemical Equipment Visualizer

A full-stack web application designed for chemical engineers and plant operators to visualize equipment performance metrics. This tool allows users to upload CSV logs, analyze key parameters (Flowrate, Pressure, Temperature), and view interactive visualizations with a modern, responsive Cyberpunk-themed UI.

## 📌 Internship Screening Task Context

This project was developed as part of the **FOSSEE Semester Long Internship 2026 screening task**.

The screening task required:
- A common Django REST backend
- A Web frontend (React) and a Desktop frontend (PyQt5)
- CSV upload, analytics, visualization, and history tracking

Due to time constraints, the **web application is fully implemented**, and the **desktop application architecture is planned and documented**. The backend APIs are designed to be reusable by both web and desktop clients.



## 🚀 Features

*   **CSV Data Upload**: Seamlessly upload equipment data logs for processing.
*   **Automated Analytics**: Instantly calculates average operational metrics and equipment type distributions using Pandas.
*   **Interactive Visualizations**:
    *   **Bar Charts**: Compare average Flowrate, Pressure, and Temperature.
    *   **Pie Charts**: Visualize the distribution of equipment types (Pumps, Heat Exchangers, Tanks, etc.).
*   **Upload History**: Tracks the last 5 uploaded datasets for quick reference.
*   **Modern UI/UX**:
    *   **Cyberpunk & Light Themes**: One-click toggle between a futuristic dark mode and a clean light mode.
    *   **Responsive Dashboard**: Full-screen layout with a collapsible sidebar navigation.
    *   **Data Validation**: Ensures uploaded files meet the required schema before processing.

## 🛠️ Tech Stack

### Backend
*   **Python 3.x**
*   **Django 5.0** & **Django REST Framework (DRF)**
*   **Pandas**: For high-performance data manipulation and analysis.
*   **SQLite**: Lightweight database for history tracking.

### Frontend
*   **React 19**: Modern UI library for building interactive interfaces.
*   **Vite**: Next-generation frontend tooling.
*   **Chart.js** & **React-Chartjs-2**: For rendering responsive charts.
*   **CSS Modules & Variables**: For dynamic theming and glassmorphism effects.

## 📂 Project Structure

```
chemical-equipment-visualiser/
├── backend/                # Django Backend
│   ├── api/                # API App (Models, Views, Serializers)
│   ├── core/               # Project Settings
│   └── manage.py           # Django entry point
├── web-frontend/           # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Dashboard, Charts, History)
│   │   └── App.jsx         # Main Application wrapper
│   └── package.json        # Dependencies
└── sample_equipment_data.csv # Sample dataset for testing
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v16+) & npm
*   Python (v3.9+)

### 1. Backend Setup (Django)

Navigate to the backend directory and set up the Python environment.

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install django djangorestframework pandas django-cors-headers

# Apply Migrations
python manage.py migrate

# Run the Server
python manage.py runserver
```
*The backend API will run at `http://127.0.0.1:8000/`*

### 2. Frontend Setup (React)

Open a new terminal and navigate to the frontend directory.

```bash
cd web-frontend

# Install dependencies
npm install

# Run the Development Server
npm run dev
```
*The web application will run at `http://localhost:5173/` (or the port shown in your terminal)*

## 📖 Usage Guide

1.  **Home**: Overview of the application capabilities.
2.  **Application**:
    *   Click **"Upload CSV"** and select a file (use `sample_equipment_data.csv` for a quick test).
    *   Ideally, your CSV should have columns: `Equipment ID`, `Equipment Name`, `Type`, `Flowrate`, `Pressure`, `Temperature`, `Status`.
    *   View the generated KPIS and Charts immediately.
3.  **History**: Check the "History" tab to see a log of your recent 5 uploads with their timestamps.
4.  **Theming**: Click the Sun/Moon icon in the top right to switch visual themes.

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/upload/` | Upload a CSV file and return analysis stats (JSON). |
| `GET` | `/api/history/` | Retrieve metadata for the last 5 uploaded datasets. |

## 🔮 Future Roadmap
Desktop application implementation is planned using PyQt5 to consume the same REST APIs.

*   **Desktop Application (PyQt5)**: Backend APIs are ready and reusable; desktop client implementation planned as an extension.
*   **Export Reports**: PDF/Image export for analysis results.
*   **User Authentication**: Multi-user login system.

## 📤 Submission Details

- **GitHub Repository**: https://github.com/kowshik-thatinati/chemical-equipment-visualizer
- **Demo Video**: (Provided in the FOSSEE submission form)


---
*Created for the Chemical Equipment Visualization Project.*
