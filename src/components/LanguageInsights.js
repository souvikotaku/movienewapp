import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/LanguageInsights.css";

// Registering the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageInsights = ({ data }) => {
  // Aesthetically pleasing pastel colors
  const colors = [
    "#FFB6C1", // Soft pink
    "#ADD8E6", // Light blue
    "#98FB98", // Light green
    "#FFFACD", // Soft yellow
    "#FFDAB9", // Peach
    "#E6E6FA", // Lavender
    "#98FF98", // Mint green
    "#FF7F50", // Light coral
    "#B0E0E6", // Pale blue
    "#AFEEEE", // Light teal
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
        <h2 style={{ color: "white" }}>Language Insights</h2>
        <p style={{ color: "white" }}>No language data available.</p>
      </div>
    );
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Set legend text color to white
        },
      },
      tooltip: {
        bodyColor: "white", // Set tooltip body text color to white
        titleColor: "white", // Set tooltip title color to white
      },
    },
    responsive: true, // Ensure the chart is responsive
  };

  return (
    <div className="language-insights">
      <h2 style={{ color: "white" }}>Language Insights</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default LanguageInsights;
