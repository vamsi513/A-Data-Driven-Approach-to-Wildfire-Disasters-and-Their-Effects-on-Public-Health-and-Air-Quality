// ✅ Graph5.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Graph5() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";
      const response = await fetch(url);
      const text = await response.text();
      const rows = text.split("\n").slice(1);

      const filtered = rows
        .map((row) => row.split(","))
        .map((cols) => ({
          workingHours: parseFloat(cols[12]), // Actual_Working_Hours
          satisfaction: parseFloat(cols[10]), // Employee_Satisfaction_Score
        }))
        .filter((d) => !isNaN(d.workingHours) && !isNaN(d.satisfaction));

      setData(filtered);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Employee Satisfaction vs. Actual Working Hours</h2>
      <Plot
        data={[
          {
            x: data.map((d) => d.workingHours),
            y: data.map((d) => d.satisfaction),
            mode: "markers",
            type: "scatter",
            marker: { color: "#6366f1", size: 8 },
          },
        ]}
        layout={{
          title: "Correlation Between Work Hours and Satisfaction",
          xaxis: { title: "Actual Working Hours" },
          yaxis: { title: "Satisfaction Score" },
          height: 400,
        }}
      />
    </div>
  );
}