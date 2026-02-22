import React from "react";
import { track } from "../api";

interface FiltersProps {
  startDate: string;
  endDate: string;
  age: string;
  gender: string;
  setStartDate: (val: string) => void;
  setEndDate: (val: string) => void;
  setAge: (val: string) => void;
  setGender: (val: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  startDate,
  endDate,
  age,
  gender,
  setStartDate,
  setEndDate,
  setAge,
  setGender,
}) => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            track("date_filter");
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            track("date_filter");
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Age</label>
        <select
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            track("age_filter");
          }}
        >
          <option value="">All</option>
          <option value="&lt;18">&lt;18</option>
          <option value="18-40">18-40</option>
          <option value=">40">&gt;40</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Gender</label>
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            track("gender_filter");
          }}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
