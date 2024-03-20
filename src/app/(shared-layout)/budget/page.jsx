"use client";
import React, { useState } from "react";
import BudgetForm from "../../_components/BudgetForm";
import { useSelector } from "react-redux";

const Budget = ({ monthlyBudget, actualSpending, transactions }) => {
     const { expenses, budgets } = useSelector((state) => state.ui);
     

     const totalExpense = expenses.reduce(
       (total, expense) => total + parseFloat(expense.amount),
       0
     );
    
  const [budget, setBudget] = useState(null);
  const handleBudgetSubmit = (newBudget) => {
    setBudget(newBudget);
  };
  const remainingBudget = budget - totalExpense;
const { darkMode } = useSelector((state) => state.ui);
  return (
    <div
      className={`max-w-full  mt-8 p-24 ml-24 border border-gray-300 p rounded-lg ${
        darkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <BudgetForm onBudgetSubmit={handleBudgetSubmit} />

   
      <h2 className="text-2xl font-semibold mb-4">Budget Overview</h2>
      <div className="mb-4">
        <label className="block text-gray-600">Monthly Budget:</label>
         <div className="w-96 p-2 border border-green-600 text-black rounded bg-white"> { budgets.map((budget, index) => (
         
         <p> ${budget.amount}</p>
        
        ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Actual Spending:</label>
        <div className="w-96 p-2 border border-green-600 rounded bg-white">
          ${totalExpense}
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold mb-2 text-black">
          Remaining Budget: ${remainingBudget}
        </p>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        {transactions ? (
          <ul>
            {transactions.map((transaction, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>{transaction.title}</span>
                <span
                  className={
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  ${transaction.amount}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Budget;
