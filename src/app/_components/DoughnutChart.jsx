'use client'
import React from "react"
import { Doughnut } from "react-chartjs-2"
import { useSelector } from "react-redux"
import {
  Chart,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";

Chart.register(ArcElement, LinearScale, CategoryScale, BarElement);

const DoughnutChart = ({}) => {
    const {budgets} = useSelector((state) => state.budget)
    const data = { 
        labels : budgets.map(budget => budget.category),
    datasets : [
        {
            label : 'budget',
            data : budgets.map(budget => budget.amount),
            backgroundColor : [
                'red',
                'blue',
                'green',
                'yellow',
                'purple',
            ],
        },
    ],
    
    };
    const options = {
    responsive: true,
  };
    return <Doughnut data={data} options={options} />
}

export default DoughnutChart