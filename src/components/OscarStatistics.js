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
        backgroundColor: "blue",
      },
      {
        label: "Wins",
        data: wins, // 1 for a win, 0 for no win
        backgroundColor: "green",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "category", // Explicitly set the x-axis scale
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="oscar-statistics">
      <h2>Oscar Statistics Overview</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OscarStatistics;
