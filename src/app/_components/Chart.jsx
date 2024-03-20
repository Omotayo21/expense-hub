"use client"
// components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, ArcElement, LinearScale, CategoryScale, BarElement } from "chart.js";
import { useSelector } from 'react-redux';

Chart.register(ArcElement, LinearScale, CategoryScale, BarElement);

const BarChart = () => {
  const { expenses } = useSelector((state) => state.ui);

  // Extract labels and amounts from expenses
  const labels = expenses.map((expense) => expense.category);
  const amounts = expenses.map((expense) => expense.amount);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses',
        data: amounts,
        backgroundColor: 'green',
        borderColor: 'rgba(75,192,192,1)',
        Width: 1,
      },
    ],
  };

  const options = {
  
    xAxes: [
      {
        width : 8, // Set minimum bar width in pixels
      },
    ],
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
