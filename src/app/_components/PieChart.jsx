"use client"
// components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
//import { Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

Chart.register(ArcElement, LinearScale, CategoryScale, BarElement);

const PieChart = () => {
  const { expenses } = useSelector((state) => state.ui);
  const { revenues } = useSelector((state) => state.revenue)

  // Calculate total expense
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Calculate total revenue
  const totalRevenue = revenues.reduce(
    (total, revenue) => total + revenue.amount,
    0
  );

  const data = {
    labels: ["Expense", "Revenue"],
    datasets: [
      {
        data: [totalExpense, totalRevenue],
        backgroundColor: [
          "purple", // Expense
          "red", // Revenue
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
