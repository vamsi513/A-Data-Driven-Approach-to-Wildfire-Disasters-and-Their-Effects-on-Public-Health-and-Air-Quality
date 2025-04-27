// ✅ Graph3.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Graph3() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";
      const response = await fetch(url);
      const text = await response.text();
      const rows = text.split("\n").slice(1);

      const grouped = {};

      rows.forEach((row) => {
        const cols = row.split(",");
        const industry = cols[11]; // Industry
        const satisfaction = parseFloat(cols[10]); // Employee_Satisfaction_Score
        const interference = parseFloat(cols[17]); // Percent_Work_Interference

        if (!isNaN(satisfaction) && !isNaN(interference)) {
          if (!grouped[industry]) grouped[industry] = { satisfaction: [], interference: [] };
          grouped[industry].satisfaction.push(satisfaction);
          grouped[industry].interference.push(interference);
        }
      });

      const formatted = Object.entries(grouped).map(([industry, values]) => {
        const avgSat = values.satisfaction.reduce((a, b) => a + b, 0) / values.satisfaction.length;
        const avgInterf = values.interference.reduce((a, b) => a + b, 0) / values.interference.length;
        return { industry, avgSat, avgInterf };
      });

      setData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Employee Satisfaction vs. Mental Health Interference by Industry</h2>
      <Plot
        data={[
          {
            x: data.map((d) => d.avgSat),
            y: data.map((d) => d.avgInterf),
            text: data.map((d) => d.industry),
            mode: "markers",
            type: "scatter",
            marker: { size: 12, color: "#34d399" },
          },
        ]}
        layout={{
          title: "Satisfaction vs Interference",
          xaxis: { title: "Average Satisfaction Score" },
          yaxis: { title: "Average Work Interference (%)" },
          height: 400,
        }}
      />
    </div>
  );
}
