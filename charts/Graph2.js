// ✅ Graph2.jsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Graph2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";
      const response = await fetch(url);
      const text = await response.text();
      const rows = text.split("\n").slice(1);

      const regionData = {};
      rows.forEach((row) => {
        const cols = row.split(",");
        const region = cols[0];
        const consequence = parseFloat(cols[cols.length - 1]); // Percent_Consequences

        if (!isNaN(consequence)) {
          if (!regionData[region]) regionData[region] = [];
          regionData[region].push(consequence);
        }
      });

      const formattedData = Object.entries(regionData).map(([region, values]) => ({
        region,
        avgConsequence:
          values.reduce((sum, val) => sum + val, 0) / values.length,
      }));

      setData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Average Mental Health Consequences by Region</h2>
      <Plot
        data={[
          {
            x: data.map((d) => d.region),
            y: data.map((d) => d.avgConsequence),
            type: "bar",
            marker: { color: "#a855f7" },
          },
        ]}
        layout={{
          title: "Average Percent of Mental Health Consequences",
          xaxis: { title: "Region" },
          yaxis: { title: "Avg Consequence (%)" },
          height: 400,
        }}
      />
    </div>
  );
}