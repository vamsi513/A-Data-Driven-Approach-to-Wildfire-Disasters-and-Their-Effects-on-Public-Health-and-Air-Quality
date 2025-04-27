import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Graph1() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://raw.githubusercontent.com/Anirudh-Samala/An-Analytical-Analysis-of-Employment-Trends-Remote-Work-and-Mental-Health/refs/heads/main/merged_all_dataset.csv";

      const response = await fetch(url);
      const csvText = await response.text();
      const rows = csvText.trim().split("\n");
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        const obj = {};
        headers.forEach((header, i) => {
          obj[header.trim()] = values[i];
        });
        return obj;
      });

      const grouped = {};
      data.forEach((row) => {
        const dept = row.Department;
        const satisfaction = parseFloat(row.Employee_Satisfaction_Score);
        const unemployment = parseFloat(row.Avg_Unemployment_Rate);

        if (!grouped[dept]) grouped[dept] = { count: 0, satisfaction: 0, unemployment: 0 };
        if (!isNaN(satisfaction)) grouped[dept].satisfaction += satisfaction;
        if (!isNaN(unemployment)) grouped[dept].unemployment += unemployment;
        grouped[dept].count++;
      });

      const cleaned = Object.entries(grouped).map(([dept, stats]) => ({
        Department: dept,
        Satisfaction: +(stats.satisfaction / stats.count).toFixed(2),
        Unemployment: +(stats.unemployment / stats.count).toFixed(2),
      }));

      setChartData(cleaned);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Average Satisfaction vs. Unemployment Rate by Department</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 50 }}>
          <XAxis dataKey="Department" />
          <YAxis yAxisId="left" label={{ value: 'Satisfaction', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Unemployment', angle: -90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="Satisfaction" fill="#60A5FA" />
          <Bar yAxisId="right" dataKey="Unemployment" fill="#F87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}