import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/OscarStatistics.css";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OscarStatistics = ({ data }) => {
  console.log("oascardata", data);

  // Ensure the required data exists
  if (!data || !data.oscar_nominations_list || !data.oscar_winning_list) {
    return <div>Invalid data provided for the chart.</div>;
  }

  // Prepare the categories, nominations, and wins data
  const categories = data.oscar_nominations_list;
  const nominations = new Array(categories.length).fill(1); // Each category has 1 nomination
  const wins = categories?.map((category) =>
    data.oscar_winning_list.includes(category) ? 1 : 0
  ); // Check if it's a win

  const chartData = {
    labels: categories, // Oscar categories as x-axis labels
    datasets: [
      {
        label: "Nominations",
        data: nominations, // Each category has 1 nomination
        backgroundColor: "#ADD8E6", // Soft light blue for nominations
      },
      {
        label: "Wins",
        data: wins, // 1 for a win, 0 for no win
        backgroundColor: "#98FB98", // Soft light green for wins
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable automatic aspect ratio
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // Set legend text color to white
        },
      },
      tooltip: {
        bodyColor: "white", // Set tooltip text color to white
        titleColor: "white", // Set tooltip title color to white
      },
    },
    scales: {
      x: {
        type: "category", // Explicitly set the x-axis scale
        ticks: {
          color: "white", // Set x-axis labels color to white
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        ticks: {
          color: "white", // Set y-axis labels color to white
        },
        beginAtZero: true,
      },
    },
    responsive: true, // Ensure responsiveness is enabled
  };

  return (
    <div
      className="oscar-statistics"
      style={{
        color: "white", // Set general text color of the container to white
      }}
    >
      <h2
        style={{
          marginTop: "0px",
        }}
      >
        Oscar Statistics Overview
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OscarStatistics;
