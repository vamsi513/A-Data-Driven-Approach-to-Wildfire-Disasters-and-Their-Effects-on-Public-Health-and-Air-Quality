// ✅ App.js (Updated for 8 Graphs)
import React, { useState } from "react";
import "./index.css";

import Graph1 from "./charts/Graph1";
import Graph2 from "./charts/Graph2";
import Graph3 from "./charts/Graph3";
import Graph4 from "./charts/Graph4";
import Graph5 from "./charts/Graph5";
import Graph6 from "./charts/Graph6";
import Graph7 from "./charts/Graph7";
import Graph8 from "./charts/Graph8";

const App = () => {
  const [activeChart, setActiveChart] = useState("Graph 1");

  const renderChart = () => {
    switch (activeChart) {
      case "Graph 1":
        return <Graph1 />;
      case "Graph 2":
        return <Graph2 />;
      case "Graph 3":
        return <Graph3 />;
      case "Graph 4":
        return <Graph4 />;
      case "Graph 5":
        return <Graph5 />;
      case "Graph 6":
        return <Graph6 />;
      case "Graph 7":
        return <Graph7 />;
      case "Graph 8":
        return <Graph8 />;
      default:
        return <Graph1 />;
    }
  };

  const chartTabs = [
    "Graph 1",
    "Graph 2",
    "Graph 3",
    "Graph 4",
    "Graph 5",
    "Graph 6",
    "Graph 7",
    "Graph 8",
  ];

  return (
    <div style={{ display: "flex" }}>
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav className="nav-buttons">
          {chartTabs.map((chart) => (
            <button
              key={chart}
              onClick={() => setActiveChart(chart)}
              className={activeChart === chart ? "active" : ""}
            >
              {chart}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <h1>{activeChart}</h1>
        <div className="chart-container">{renderChart()}</div>
      </main>
    </div>
  );
};

export default App;