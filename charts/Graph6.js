// Graph6.js
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const Graph6 = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";
      const res = await fetch(url);
      const text = await res.text();
      const rows = text.split("\n").slice(1);

      const regionMap = {};

      rows.forEach((row) => {
        const cols = row.split(",");
        const region = cols[0]; // Region
        const treated = parseFloat(cols[16]); // Percent_Treated

        if (region && !isNaN(treated)) {
          if (!regionMap[region]) regionMap[region] = [];
          regionMap[region].push(treated);
        }
      });

      const formatted = Object.entries(regionMap)
        .map(([region, values]) => ({
          region,
          avgTreated: values.reduce((a, b) => a + b, 0) / values.length,
        }))
        .sort((a, b) => b.avgTreated - a.avgTreated); // Optional: Sort by value

      setChartData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Mental Health Treatment Rate by Region</h2>
      <Plot
        data={[
          {
            x: chartData.map((d) => d.region),
            y: chartData.map((d) => d.avgTreated),
            type: "bar",
            marker: { color: "#14B8A6" },
          },
        ]}
        layout={{
          xaxis: { title: "Region" },
          yaxis: { title: "Avg % Treated" },
          height: 400,
        }}
      />
    </div>
  );
};

export default Graph6;
