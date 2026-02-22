import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface ChartsProps {
  barData: { feature: string; count: number }[];
  lineData: { date: string; count: number }[];
  onBarClick: (data: any) => void;
}

const Charts: React.FC<ChartsProps> = ({ barData, lineData, onBarClick }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "2rem",
      }}
    >
      <div className="card" style={{ height: "400px" }}>
        <h3>Feature Usage (Click Bars to Filter Trend)</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={barData}
            onClick={(data: any) => {
              if (data && data.activePayload && data.activePayload.length > 0) {
                onBarClick(data.activePayload[0].payload);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="feature" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            <Legend />
            <Bar dataKey="count" fill="var(--accent)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ height: "400px" }}>
        <h3>Time Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--success)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--success)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
