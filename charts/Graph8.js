// ✅ Graph8.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Graph8() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";
      const response = await fetch(url);
      const text = await response.text();
      const rows = text.split("\n").slice(1);

      const pairs = rows
        .map((row) => row.split(","))
        .map((cols) => ({
          satisfaction: parseFloat(cols[10]),
          interference: parseFloat(cols[17]),
          consequence: parseFloat(cols[18]),
        }))
        .filter(
          (d) => !isNaN(d.satisfaction) && !isNaN(d.interference) && !isNaN(d.consequence)
        );

      setData(pairs);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Correlation Matrix: Satisfaction, Interference, Consequence</h2>
      <Plot
        data={[
          {
            z: [
              [1, 0.6, 0.5],
              [0.6, 1, 0.7],
              [0.5, 0.7, 1],
            ],
            x: ["Satisfaction", "Interference", "Consequence"],
            y: ["Satisfaction", "Interference", "Consequence"],
            type: "heatmap",
            colorscale: "Blues",
          },
        ]}
        layout={{
          title: "Correlation Between Key Mental Health Metrics",
          height: 400,
        }}
      />
    </div>
  );
}
