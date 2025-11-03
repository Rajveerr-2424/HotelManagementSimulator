# 🏨 Hotel Management Simulator — Algorithmic Revenue Optimization

A web-based **Hotel Management Simulator** that uses **Greedy (Fractional Knapsack)** and **Dynamic Programming (0/1 Knapsack)** algorithms to maximize hotel revenue through optimal guest selection and room allocation.  

This project simulates real-world hotel decision-making using algorithmic logic — balancing profit, occupancy, and resource utilization.

---

## 🚀 Features

- **Algorithmic Optimization:**
  - Greedy approach (Profit-to-Room ratio)
  - Dynamic Programming (Optimal Knapsack)
- **Interactive Input System:** Add or edit guest data (profit, room demand, stay duration)
- **Simulation Dashboard:** Displays algorithm results with:
  - Total revenue generated
  - Occupancy rate
  - Accepted vs rejected guests
- **Visual Analytics:**
  - Bar chart: profit comparison per guest
  - Pie chart: occupancy distribution
- **Exportable Reports:**
  - Download results as **PDF** for documentation

---

## 🧠 Tech Stack

**Frontend:** React.js, TailwindCSS  
**Backend:** Node.js, Express.js  
**Database:** SQLite (lightweight, local data storage)  
**Visualization:** Chart.js or Recharts  
**Export Utility:** jsPDF (for generating reports)

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hotel-management-simulator.git
cd hotel-management-simulator
```

```bash
# Install dependencies
npm install
```

```bash
# Start the development server
npm start
```

---

## 🧩 Algorithm Overview

### 1. Greedy Algorithm (Fractional Knapsack)
Sorts guests by **profit-to-room ratio**, selecting those with the **highest efficiency** first until hotel capacity is full.

### 2. Dynamic Programming (0/1 Knapsack)
Evaluates **all possible combinations** of guests to find the **true optimal selection** that maximizes revenue.

### Formula:
$$
\text{Maximize } \sum P[i] \quad \text{subject to } \sum W[i] \leq \text{Hotel Capacity}
$$


---

## 📊 Output Metrics

| Metric | Description |
|--------|--------------|
| **Total Revenue** | Sum of accepted guest profits |
| **Occupancy Rate** | Percentage of used room capacity |
| **Accepted Guests** | List of guests chosen by the algorithm |
| **Rejected Guests** | Guests not selected due to constraints |

---

## 🧾 Report Generation

- The simulator allows users to **export results as PDF** for easy sharing and record-keeping.
- CSV was not chosen to keep the focus on **report visualization** and formatted output.

---

## 💡 Why This Design

| Component | Reason |
|------------|--------|
| **Node.js Backend** | Efficient, event-driven server for algorithm processing |
| **SQLite Database** | Lightweight local DB ideal for simulations and quick resets |
| **Occupancy Rate Metric** | Key business indicator in hospitality management |
| **PDF Export** | Professional output format for reports and comparison |
| **Visualization (Bar/Pie Charts)** | Intuitive understanding of revenue and capacity usage |

---

## 📚 Example Flow

1. User inputs guest requests → profit, room requirement, stay duration  
2. User selects algorithm (Greedy / Knapsack)  
3. Simulator computes result → displays accepted guests, revenue, and occupancy  
4. Visual charts show data insights  
5. Option to export final report as PDF  

---

## 🧠 Future Enhancements

- Add **Genetic Algorithm** for hybrid optimization  
- Add **multi-hotel chain mode** for scalability testing  
- Enable **real-time parameter adjustment**

---

## 👨‍💻 Contributors

- **Rajveerr Awachat A6-B1-13**
- **Pranav Gandhi A6-B3-37**
- **Deepika Pampati A6-B1-16**

---

## 📄 License

This project is licensed under the MIT License — EDUCATIONAL USE ONLY.

---

### ⭐ If you find this project helpful, give it a star on GitHub!
