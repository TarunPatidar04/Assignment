import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Filters from "../components/Filters";
import Charts from "../components/Charts";
import api, { track } from "../api";
import Cookies from "js-cookie";
import type { AnalyticsData } from "../types";

const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext)!;

  // Initialize state from cookies or default
  const [startDate, setStartDate] = useState(
    Cookies.get("startDate") ||
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    Cookies.get("endDate") || new Date().toISOString().split("T")[0],
  );
  const [age, setAge] = useState(Cookies.get("age") || "");
  const [gender, setGender] = useState(Cookies.get("gender") || "");

  const [data, setData] = useState<AnalyticsData>({
    barChartData: [],
    lineChartData: [],
  });

  // Persistence
  useEffect(() => {
    Cookies.set("startDate", startDate);
    Cookies.set("endDate", endDate);
    Cookies.set("age", age);
    Cookies.set("gender", gender);
  }, [startDate, endDate, age, gender]);

  // Fetch Data
  const fetchData = async () => {
    try {
      const res = await api.get("/analytics", {
        params: { startDate, endDate, age, gender },
      });
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll for updates (simplified "real-time")
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [startDate, endDate, age, gender]);

  const handleBarClick = (payload: any) => {
    track(`clicked_bar_${payload.feature}`);
    alert(`You clicked ${payload.feature}. This event has been tracked!`);
    // Ideally this would filter the line chart or do something more complex
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Product Analytics</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>Welcome, {user?.username}</span>
          <button onClick={logout} style={{ backgroundColor: "var(--danger)" }}>
            Logout
          </button>
        </div>
      </header>

      <Filters
        startDate={startDate}
        endDate={endDate}
        age={age}
        gender={gender}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setAge={setAge}
        setGender={setGender}
      />

      <Charts
        barData={data.barChartData}
        lineData={data.lineChartData}
        onBarClick={handleBarClick}
      />
    </div>
  );
};

export default Dashboard;
