// ✅ Graph7.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Graph7() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";
      const response = await fetch(url);
      const text = await response.text();
      const rows = text.split("\n").slice(1);

      const processed = rows
        .map((row) => row.split(","))
        .map((cols) => ({
          bmi: parseFloat(cols[10]), // Satisfaction used here to simulate BMI-like metric
          income: parseFloat(cols[13]), // Avg_Unemployment_Rate simulates income-like factor
          age: parseInt(cols[3]),
        }))
        .filter((d) => !isNaN(d.bmi) && !isNaN(d.income) && !isNaN(d.age));

      setData(processed);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>BMI vs Income with Age as Bubble Size</h2>
      <Plot
        data={[
          {
            x: data.map((d) => d.income),
            y: data.map((d) => d.bmi),
            text: data.map((d) => `Age: ${d.age}`),
            mode: "markers",
            type: "scatter",
            marker: {
              size: data.map((d) => d.age / 2),
              color: data.map((d) => d.age),
              colorscale: "Viridis",
              showscale: true,
            },
          },
        ]}
        layout={{
          title: "Satisfaction vs Unemployment Rate with Age",
          xaxis: { title: "Unemployment Rate (proxy for income)" },
          yaxis: { title: "Satisfaction Score (proxy for BMI)" },
          height: 400,
        }}
      />
    </div>
  );
}
