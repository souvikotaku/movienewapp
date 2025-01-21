import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/LanguageInsights.css";

// Registering the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageInsights = ({ data }) => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "cyan",
  ];

  const chartData = {
    labels: data.languages,
    datasets: [
      {
        data: data.counts,
        backgroundColor: data.languages?.map(
          (_, index) => colors[index % colors.length]
        ),
      },
    ],
  };

  if (!data || !data.languages || !data.counts || data.languages.length === 0) {
    return (
      <div className="language-insights">
        <h2>Language Insights</h2>
        <p>No language data available.</p>
      </div>
    );
  }

  return (
    <div className="language-insights">
      <h2>Language Insights</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default LanguageInsights;
