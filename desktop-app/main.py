import sys
import os
import requests
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QPushButton, QLabel, QFileDialog, 
                             QStackedWidget, QTableWidget, QTableWidgetItem, 
                             QMessageBox, QHeaderView, QFrame, QScrollArea)
from PyQt5.QtCore import Qt, QSize
from PyQt5.QtGui import QFont, QColor, QPalette, QIcon, QCursor
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure

# Configuration
API_BASE_URL = "http://127.0.0.1:8000/api"

class MplCanvas(FigureCanvas):
    def __init__(self, parent=None, width=5, height=4, dpi=100):
        self.fig = Figure(figsize=(width, height), dpi=dpi)
        self.axes1 = self.fig.add_subplot(121) # Bar chart
        self.axes2 = self.fig.add_subplot(122) # Pie chart
        super(MplCanvas, self).__init__(self.fig)
        self.set_theme('dark') # Default

    def set_theme(self, theme):
        if theme == 'dark':
            bg_color = '#050510'
            text_color = 'white'
            face_color = '#050510'
            spine_color = '#333'
        else:
            bg_color = '#f0f2f5'
            text_color = '#1a1a1a'
            face_color = '#f0f2f5' # Matches standard light gray bg
            spine_color = '#ccc'

        self.fig.patch.set_facecolor(bg_color)
        
        # Update Axes 1
        self.axes1.set_facecolor(face_color)
        self.axes1.tick_params(colors=text_color)
        self.axes1.xaxis.label.set_color(text_color)
        self.axes1.yaxis.label.set_color(text_color)
        self.axes1.title.set_color(text_color)
        for spine in self.axes1.spines.values():
            spine.set_color(spine_color)

        # Update Axes 2
        self.axes2.set_facecolor(face_color)
        self.axes2.tick_params(colors=text_color) 
        self.axes2.title.set_color(text_color)
        
        self.draw()

class ChemicalApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer (Desktop)")
        self.setGeometry(100, 100, 1400, 900)
        self.current_theme = 'dark'
        
        # Central Widget & Main Layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        self.main_layout = QHBoxLayout(central_widget)
        self.main_layout.setContentsMargins(0, 0, 0, 0)
        self.main_layout.setSpacing(0)

        # 1. Sidebar
        self.sidebar = QFrame()
        self.sidebar_layout = QVBoxLayout(self.sidebar)
        self.sidebar_layout.setContentsMargins(0, 20, 0, 20)
        self.sidebar_layout.setSpacing(10)
        
        # Sidebar Menu Items
        self.nav_buttons = []
        self.add_nav_button("🏠  Home", 0)
        self.add_nav_button("📊  Application", 1)
        self.add_nav_button("📜  History", 2)
        
        self.sidebar_layout.addStretch()
        
        # Theme Toggle in Sidebar
        self.theme_btn = QPushButton("☀️ Light Mode")
        self.theme_btn.setCursor(QCursor(Qt.PointingHandCursor))
        self.theme_btn.clicked.connect(self.toggle_theme)
        self.theme_btn.setFixedHeight(40)
        self.sidebar_layout.addWidget(self.theme_btn)
        
        self.main_layout.addWidget(self.sidebar)

        # 2. Main Content Area (Stacked)
        self.pages = QStackedWidget()
        self.main_layout.addWidget(self.pages)
        
        # -- Page 0: Home --
        self.home_page = self.create_home_page()
        self.pages.addWidget(self.home_page)
        
        # -- Page 1: Dashboard --
        self.dashboard_page = self.create_dashboard_page()
        self.pages.addWidget(self.dashboard_page)
        
        # -- Page 2: History --
        self.history_page = self.create_history_page()
        self.pages.addWidget(self.history_page)

        # Initial Setup
        self.apply_theme()
        self.nav_buttons[0].click() # Activate Home by default

    def add_nav_button(self, text, index):
        btn = QPushButton(text)
        btn.setCheckable(True)
        btn.setFixedHeight(50)
        btn.setCursor(QCursor(Qt.PointingHandCursor))
        btn.clicked.connect(lambda: self.switch_page(index, btn))
        self.sidebar_layout.addWidget(btn)
        self.nav_buttons.append(btn)

    def switch_page(self, index, active_btn):
        self.pages.setCurrentIndex(index)
        for btn in self.nav_buttons:
            btn.setChecked(False)
        active_btn.setChecked(True)
        
        # Refresh history if opening history tab
        if index == 2:
            self.load_history()

    def toggle_theme(self):
        self.current_theme = 'light' if self.current_theme == 'dark' else 'dark'
        self.apply_theme()

    def apply_theme(self):
        dark_style = """
            QMainWindow { background-color: #050510; }
            QFrame { background-color: #141423; border-right: 1px solid #333; }
            QPushButton { 
                color: #8892b0; border: none; text-align: left; padding-left: 20px; font-size: 16px; 
            }
            QPushButton:hover { color: #fff; background-color: rgba(255,255,255,0.05); }
            QPushButton:checked { 
                color: #00f3ff; border-left: 3px solid #00f3ff; background: linear-gradient(90deg, rgba(0, 243, 255, 0.2), transparent);
            }
            QLabel { color: #fff; }
            QTableWidget { 
                background-color: #050510; 
                alternate-background-color: #141423;
                color: #fff; 
                gridline-color: #333; 
                border: 1px solid #333; 
            }
            QTableWidget::item { padding: 5px; }
            QTableWidget::item:selected { background-color: #00f3ff; color: #000; }
            QHeaderView::section { background-color: #141423; color: #00f3ff; border: 1px solid #333; padding: 5px; }
            QScrollArea { border: none; }
        """
        
        light_style = """
            QMainWindow { background-color: #f0f2f5; }
            QFrame { background-color: #ffffff; border-right: 1px solid #ccc; }
            QPushButton { 
                color: #666; border: none; text-align: left; padding-left: 20px; font-size: 16px; 
            }
            QPushButton:hover { color: #000; background-color: rgba(0,0,0,0.05); }
            QPushButton:checked { 
                color: #0056b3; border-left: 3px solid #0056b3; background-color: rgba(0, 86, 179, 0.1);
            }
            QLabel { color: #1a1a1a; }
            QTableWidget { 
                background-color: #fff; 
                alternate-background-color: #f8f9fa;
                color: #1a1a1a; 
                gridline-color: #ccc; 
                border: 1px solid #ccc; 
            }
            QTableWidget::item { padding: 5px; }
            QTableWidget::item:selected { background-color: #0056b3; color: #fff; }
            QHeaderView::section { background-color: #f8f9fa; color: #0056b3; border: 1px solid #ccc; padding: 5px; }
            QScrollArea { border: none; }
        """

        if self.current_theme == 'dark':
            self.setStyleSheet(dark_style)
            self.theme_btn.setText("☀️ Light Mode")
            self.theme_btn.setStyleSheet("text-align: center; border: 1px solid #00f3ff; border-radius: 20px; color: #00f3ff; margin: 10px;")
        else:
            self.setStyleSheet(light_style)
            self.theme_btn.setText("🌙 Dark Mode")
            self.theme_btn.setStyleSheet("text-align: center; border: 1px solid #0056b3; border-radius: 20px; color: #0056b3; margin: 10px;")
            
        # Update Chart Theme
        if hasattr(self, 'canvas'):
            self.canvas.set_theme(self.current_theme)
        
        # Update Dashboard KPI boxes if they allow stylesheet override
        # We handle specific widgets by iterating or setting object names ideally, 
        # but here we rely on global QWidget styles or specific re-styling:
        if hasattr(self, 'kpi_containers'):
            for container in self.kpi_containers:
                bg = "rgba(20,20,35,0.8)" if self.current_theme == 'dark' else "rgba(255,255,255,0.8)"
                border = "#333" if self.current_theme == 'dark' else "#ccc"
                container.setStyleSheet(f"background: {bg}; border-radius: 8px; border: 1px solid {border};")
                
        if hasattr(self, 'home_card'):
             bg = "rgba(20,20,35,0.6)" if self.current_theme == 'dark' else "rgba(255,255,255,0.9)"
             border = "#00f3ff" if self.current_theme == 'dark' else "#0056b3"
             self.home_card.setStyleSheet(f".QFrame {{ background: {bg}; border-radius: 20px; border: 1px solid {border}; }}")


    # --- Page Creation Helpers ---

    def create_home_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        layout.setAlignment(Qt.AlignCenter)
        
        # Card Container
        self.home_card = QFrame()
        self.home_card.setFrameShape(QFrame.StyledPanel)
        self.home_card.setFixedWidth(800)
        
        card_layout = QVBoxLayout(self.home_card)
        card_layout.setContentsMargins(50, 50, 50, 50)
        card_layout.setSpacing(10)
        
        # 1. Title
        title_html = """
        <html><head/><body>
            <p align="center">
                <span style="font-size:36pt; font-weight:600; color:#00f3ff;">CHEM</span>
                <span style="font-size:36pt; font-weight:600; color:#bc13fe;">VISUALIZER</span>
            </p>
        </body></html>
        """
        title = QLabel(title_html)
        title.setAlignment(Qt.AlignCenter)
        
        # 2. Intro Paragraph
        intro_text = """
        <html><head/><body>
        <p style="font-size: 14pt; line-height: 1.6;">
        Welcome to the <b>Chemical Equipment Data Visualizer</b>. 
        This powerful tool is designed for chemical engineers and plant operators to analyze equipment performance metrics.
        </p>
        </body></html>
        """
        intro = QLabel(intro_text)
        intro.setWordWrap(True)
        intro.setAlignment(Qt.AlignLeft)
        
        # 3. Why Use This Tool
        why_text = """
        <html><head/><body>
        <h3 style="color: #00f3ff; font-size: 16pt; margin-bottom: 10px;">Why use this tool?</h3>
        <ul style="font-size: 12pt; margin-top: 0px; margin-bottom: 0px; margin-left: 10px;">
            <li style="margin-bottom: 10px;"><b>Instant Analytics:</b> Upload your CSV logs and get immediate visualizations of Flowrate, Pressure, and Temperature.</li>
            <li style="margin-bottom: 10px;"><b>Outlier Detection:</b> Quickly spot equipment operating outside of nominal parameters.</li>
            <li style="margin-bottom: 10px;"><b>Type Distribution:</b> Understand your equipment inventory breakdown (Pumps, Exchangers, Tanks) at a glance.</li>
            <li style="margin-bottom: 10px;"><b>History Tracking:</b> Review your 5 most recently uploaded datasets.</li>
        </ul>
        </body></html>
        """
        why_label = QLabel(why_text)
        why_label.setWordWrap(True)
        why_label.setAlignment(Qt.AlignLeft)

        # 4. Get Started Box
        instr_frame = QFrame()
        instr_frame.setObjectName("InstructionBox")
        # Inline style for visibility in both themes (semi-transparent)
        instr_frame.setStyleSheet("QFrame#InstructionBox { background-color: rgba(127, 127, 127, 0.15); border-radius: 8px; border: 1px solid rgba(127,127,127, 0.3); }")
        instr_layout = QVBoxLayout(instr_frame)
        instr_layout.setContentsMargins(15, 15, 15, 15)
        
        instr_lbl = QLabel('<html><head/><body><span style="font-size: 12pt;"><b>Get Started:</b> Use the sidebar menu to select <b>"Application"</b> and upload your first dataset.</span></body></html>')
        instr_lbl.setWordWrap(True)
        instr_layout.addWidget(instr_lbl)
        
        card_layout.addWidget(title)
        card_layout.addSpacing(10)
        card_layout.addWidget(intro)
        card_layout.addSpacing(10)
        card_layout.addWidget(why_label)
        card_layout.addSpacing(20)
        card_layout.addWidget(instr_frame)
        card_layout.addStretch()
        
        layout.addWidget(self.home_card)
        return page

    def create_dashboard_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        layout.setContentsMargins(30, 30, 30, 30)
        
        # Header
        header = QHBoxLayout()
        lbl = QLabel("DASHBOARD ANALYTICS")
        lbl.setFont(QFont("Segoe UI", 20, QFont.Bold))
        btn_upload = QPushButton("  UPLOAD CSV  ")
        btn_upload.clicked.connect(self.upload_file)
        # Custom style for upload button to make it pop
        btn_upload.setStyleSheet("background-color: #00f3ff; color: #000; border-radius: 4px; font-weight: bold; padding: 10px;")
        
        header.addWidget(lbl)
        header.addStretch()
        header.addWidget(btn_upload)
        layout.addLayout(header)
        
        layout.addSpacing(20)
        
        # KPIs
        self.kpi_layout = QHBoxLayout()
        self.kpi_labels = {}
        self.kpi_containers = []
        
        for metric in ["Total Equipment", "Avg Flowrate", "Avg Pressure", "Avg Temperature"]:
            container = QWidget()
            self.kpi_containers.append(container)
            vbox = QVBoxLayout()
            lbl_title = QLabel(metric.upper())
            lbl_title.setStyleSheet("font-size: 12px; opacity: 0.7;")
            lbl_value = QLabel("-")
            lbl_value.setStyleSheet("font-size: 22px; font-weight: bold; color: #bc13fe;")
            lbl_value.setAlignment(Qt.AlignCenter)
            
            vbox.addWidget(lbl_title)
            vbox.addWidget(lbl_value)
            container.setLayout(vbox)
            self.kpi_layout.addWidget(container)
            self.kpi_labels[metric] = lbl_value
            
        layout.addLayout(self.kpi_layout)
        layout.addSpacing(30)
        
        # Charts
        self.canvas = MplCanvas(self, width=5, height=4, dpi=100)
        layout.addWidget(self.canvas, 1) # '1' stretch factor to fill space
        
        return page

    def create_history_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        layout.setContentsMargins(30, 30, 30, 30)
        
        lbl = QLabel("UPLOAD HISTORY")
        lbl.setFont(QFont("Segoe UI", 20, QFont.Bold))
        layout.addWidget(lbl)
        
        layout.addSpacing(20)
        
        self.history_table = QTableWidget()
        self.history_table.setColumnCount(3)
        self.history_table.setHorizontalHeaderLabels(["ID", "Dataset Name", "Uploaded At"])
        
        # Adjust Column Sizes
        header = self.history_table.horizontalHeader()
        header.setSectionResizeMode(0, QHeaderView.ResizeToContents) # ID
        header.setSectionResizeMode(1, QHeaderView.Stretch)          # Name
        header.setSectionResizeMode(2, QHeaderView.Interactive)      # Date - Allow resizing or keep interactive width by default
        header.resizeSection(2, 200) # Set a wide enough default width for timestamp
        
        self.history_table.verticalHeader().setVisible(False)
        self.history_table.setAlternatingRowColors(True)
        layout.addWidget(self.history_table)
        
        return page

    # --- Logic ---

    def upload_file(self):
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getOpenFileName(self, "Select CSV", "", "CSV Files (*.csv);;All Files (*)", options=options)
        
        if file_path:
            try:
                files = {'file': open(file_path, 'rb')}
                response = requests.post(f"{API_BASE_URL}/upload/", files=files)
                
                if response.status_code == 201:
                    data = response.json()
                    self.update_dashboard(data)
                    QMessageBox.information(self, "Success", "File uploaded and analyzed successfully!")
                    # Switch to dashboard to see results if not there, but we are likely there
                else:
                    QMessageBox.warning(self, "Error", f"Upload failed: {response.text}")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Connection error: {str(e)}")

    def update_dashboard(self, data):
        # Update KPIs
        self.kpi_labels["Total Equipment"].setText(str(data.get("total_equipment_count", 0)))
        self.kpi_labels["Avg Flowrate"].setText(f"{data.get('average_flowrate', 0)}")
        self.kpi_labels["Avg Pressure"].setText(f"{data.get('average_pressure', 0)}")
        self.kpi_labels["Avg Temperature"].setText(f"{data.get('average_temperature', 0)}")
        
        # Update Charts
        self.canvas.axes1.clear()
        self.canvas.axes2.clear()
        
        # Color palettes based on theme
        if self.current_theme == 'dark':
             bar_colors = ['#36A2EB', '#FF6384', '#4BC0C0']
             pie_colors = ['#00f3ff', '#bc13fe', '#ff0064', '#ffff00', '#00ff9d']
             text_color = 'white'
        else:
             bar_colors = ['#0056b3', '#d63384', '#198754']
             pie_colors = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF']
             text_color = '#1a1a1a'

        # Bar Chart
        metrics = ['Flow', 'Pressure', 'Temp']
        values = [data.get('average_flowrate', 0), data.get('average_pressure', 0), data.get('average_temperature', 0)]
        self.canvas.axes1.bar(metrics, values, color=bar_colors, alpha=0.8)
        self.canvas.axes1.set_title("Average Metrics", color=text_color)
        
        # Pie Chart
        dist = data.get("equipment_type_distribution", {})
        labels = list(dist.keys())
        sizes = list(dist.values())
        self.canvas.axes2.pie(sizes, labels=labels, autopct='%1.1f%%', 
                              textprops=dict(color=text_color), colors=pie_colors)
        self.canvas.axes2.set_title("Equipment Distribution", color=text_color)
        
        self.canvas.draw()

    def load_history(self):
        try:
            response = requests.get(f"{API_BASE_URL}/history/")
            if response.status_code == 200:
                history_data = response.json()
                self.history_table.setRowCount(len(history_data))
                
                for row, item in enumerate(history_data):
                    self.history_table.setItem(row, 0, QTableWidgetItem(str(item['id'])))
                    self.history_table.setItem(row, 1, QTableWidgetItem(item['dataset_name']))
                    date_str = item['uploaded_at'].replace('T', ' ').split('.')[0]
                    self.history_table.setItem(row, 2, QTableWidgetItem(date_str))
            else:
                 print("Failed to load history")
        except Exception as e:
            print(f"Connection error: {e}")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    font = QFont("Segoe UI", 10)
    app.setFont(font)
    
    window = ChemicalApp()
    window.show()
    sys.exit(app.exec_())
