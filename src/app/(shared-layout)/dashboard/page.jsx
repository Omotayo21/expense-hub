"use client";
import React from "react";
import Header from "../../_components/Navbar";
import Sidebar from "../../_components/Sidebar";
import BarChart from "../../_components/Chart";
import PieChart from "../../_components/PieChart";
import Cards from "../../_components/Cards";
import ExpenseCalendar from "../../_components/ExpenseCalendar";
import { CurrencyDollar } from "phosphor-react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { darkMode, expenses } = useSelector((state) => state.ui);
  const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);

  // Display the top expenses (e.g., top 5)
  const topExpenses = sortedExpenses.slice(0, 5);
  return (
    <>
      <div
        className={`flex flex-row ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
      >
        <div className="flex flex-col gap-y-12 ml-64 mt-24">
          <Cards />
          <div
            className={`lg:w-[47rem] sm:w-[22rem] sm:h-[16rem] lg:h-[22rem] ${
              darkMode ? "bg-gray-500 " : "bg-white"
            } rounded-md`}
          >
            <BarChart />
          </div>
          <h2
            className={`${
              darkMode ? "text-white" : "text-black"
            } font-bold text-lg`}
          >
            Items with biggest expense
          </h2>
          <div>
            <ul className="flex flex-row gap-x-8 -mt-8">
              {topExpenses.map((expense, index) => (
                <li
                  key={index}
                  className=" bg-white w-24 h-16 border border-blue-700 pl-2"
                >
                  <h2 className="font-bold"> {expense.name}</h2>
                  <p>${expense.amount}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 ml-12 mt-32">
          <div className=" w-64 h-96 bg-gray-100 rounded-md pl-2 pr-1 ">
            <ExpenseCalendar />
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
