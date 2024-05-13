"use client";
import React from "react";

import BarChart from "../../_components/Chart";
import PieChart from "../../_components/PieChart";
import Cards from "../../_components/Cards";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const { darkMode, expenses } = useSelector((state) => state.ui);
  const { revenues } = useSelector((state) => state.revenue)
  const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);

  // Display the top expenses (e.g., top 5)
  const topExpenses = sortedExpenses.slice(0, 5);
  return (
    <>
      <div
        className={`flex lg:flex-row sm:flex-col md:flex-row `}
      >
        <div className="flex flex-col gap-y-12 lg:ml-64 lg:mt-24 sm:mt-20">
          <Cards />
          <div
            className={`lg:w-[47rem] sm:w-[22rem] sm:h-[16rem] lg:h-[22rem] sm:ml-4 ${
              darkMode ? "bg-gray-300 " : "bg-white"
            } rounded-md`}
          >
            <BarChart />
          </div>
          <h2
            className={`${
              darkMode ? "text-white" : "text-black"
            } font-bold text-lg sm:ml-4`}
          >
            Items with biggest expense
          </h2>
          <div>
            <ul className="flex lg:flex-row sm:flex-col lg:gap-x-8 sm:gap-y-4 sm:ml-4 -mt-8">
              {topExpenses.map((expense, index) => (
                <li
                  key={index}
                  className={`  w-32 px-2 h-16 border border-blue-700 pl-2 overflow-x-hidden ${ darkMode ? 'bg-gray-200' : 'bg-white'} `}
                >
                  <h2 className="font-bold text-sm"> {expense.name}</h2>
                  <p>${expense.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 ml-12 mt-32">
          <div className={` w-64 h-96 rounded-md pl-2 pr-1 ${ darkMode ?'bg-gray-300' :'bg-gray-100'}`}>
            <h2 className="font-semibold text-green-700">Revenue sources</h2>
           <ul className = " mt-4 gap-y-4 pb-1">  {revenues.map((revenue, index) => (
                <div
                  key={index}
                  className=" flex flex-row justify-between  overflow-y-hidden border-b border-green-500"
                >
                  <h2 className="font-bold"> {revenue.name}:</h2>
                  <p className="text-sm ml-8">${revenue.amount}</p>
                </div>
              ))}
              </ul>
          </div>
          <div className="w-64 h-96 bg-gray-300 rounded-md py-10 px-4">
            <p className="font-bold pb-4">Summary</p>
           
            <PieChart />
            <div className="flex flex-row gap-x-10">
              <div className="flex flex-row">
                <div className="rounded-full w-3 h-3 bg-red-500 mt-2"></div>
                <span>Revenue</span>
              </div>
              <div className="flex flex-row">
                <div className="rounded-full w-3 h-3 bg-purple-500 mt-2"></div>
                <span>Expense</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
