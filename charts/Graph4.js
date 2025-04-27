// Graph4.js
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const Graph4 = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";
      const res = await fetch(url);
      const text = await res.text();
      const rows = text.split("\n").slice(1);

      const data = {};
      rows.forEach((row) => {
        const cols = row.split(",");
        const age = parseInt(cols[3]); // Age
        const treated = parseFloat(cols[16]); // Percent_Treated

        if (!isNaN(age) && !isNaN(treated)) {
          const ageGroup = Math.floor(age / 10) * 10; // Group by decades
          if (!data[ageGroup]) data[ageGroup] = [];
          data[ageGroup].push(treated);
        }
      });

      const formatted = Object.keys(data)
        .sort((a, b) => a - b)
        .map((group) => ({
          ageGroup: `${group}s`,
          avgTreated:
            data[group].reduce((a, b) => a + b, 0) / data[group].length,
        }));

      setChartData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Percent Treated for Mental Health by Age Group</h2>
      <Plot
        data={[
          {
            x: chartData.map((d) => d.ageGroup),
            y: chartData.map((d) => d.avgTreated),
            type: "bar",
            marker: { color: "#4F46E5" },
          },
        ]}
        layout={{
          xaxis: { title: "Age Group" },
          yaxis: { title: "Avg % Treated" },
          height: 400,
        }}
      />
    </div>
  );
};

export default Graph4;
