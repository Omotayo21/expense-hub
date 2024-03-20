"use client";
import React, { useState } from "react";
import BudgetForm from "../../_components/BudgetForm";
import UpcomingForm from "../../_components/UpcomingForm"; // Import the BudgetForm component
import { useSelector } from "react-redux";
const Targets = () => {
  const [upcomingExpenses, setUpcomingExpenses] = useState([]);
  const { darkMode } = useSelector((state) => state.ui);

  // Function to handle budget submission

  // Function to handle upcoming expense submission
  const handleUpcomingExpenseSubmit = (date, expenseDetails) => {
    setUpcomingExpenses((prevExpenses) => [
      ...prevExpenses,
      { date, expenseDetails },
    ]);
  };

  return (
    <div
      className={` mt-16 max-w-full min-h-screen mx-auto pl-64 pr-40 pt-24 border border-gray-300 rounded-lg ${
        darkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <h1
        className={`text-3xl font-semibold mb-6 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Targets
      </h1>
      <UpcomingForm />
      {/* Render BudgetForm with the handleBudgetSubmit function */}

      {/* Render Upcoming Expenses List */}
      <div className="mt-8">
        <h2
          
          className={`text-3xl font-semibold mb-6 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Upcoming Expenses
        </h2>
        {upcomingExpenses.length === 0 ? (
          <p className="text-gray-600">No upcoming expenses.</p>
        ) : (
          <ul className="list-disc pl-6">
            {upcomingExpenses.map((expense, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{expense.date}: </span>
                {expense.expenseDetails}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Targets;
