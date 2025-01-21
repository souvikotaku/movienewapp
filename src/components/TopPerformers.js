import React from "react";
import "../styles/TopPerformers.css";

const TopPerformers = ({ performers }) => (
  <div className="top-performers">
    <h2>Top Performers</h2>
    <ul>
      {performers.map((performer, index) => (
        <li key={index}>
          <strong>{performer.name}</strong> - {performer.awards} awards
        </li>
      ))}
    </ul>
  </div>
);

export default TopPerformers;
