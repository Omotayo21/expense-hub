import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBudget,incrementNotificationCount } from "@/redux/ui-slice";
import {toast} from 'react-toastify'
const BudgetForm = () => {
  const dispatch = useDispatch()
   const categories = [
     "Food",
     "Transportation",
     "Utilities",
     "Entertainment",
     "Others",
   ];
   const [category, setCategory] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [newBudget, setNewBudget] = useState({
    category : '',
    amount : "",
})
  const [validationError, setValidationError] = useState("");

  const handleBudgetSubmit = (e) => {
    e.preventDefault();

       if (
       newBudget.amount !== "" &&
         category !== ""
       ) {
         const budgetItem = {
           category: category,
          amount: newBudget.amount,
         };
         dispatch(addBudget(budgetItem));
         dispatch(incrementNotificationCount());
         console.log(budgetItem);
         //setIspopUp(false);

         setNewBudget({ amount: "", category: "" });
         toast.success("Item added to expense list");
       }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Set Monthly Budget</h2>
      <form onSubmit={handleBudgetSubmit}>
        <div className="mb-4">
          <label
            htmlFor="monthlyBudget"
            className="block text-sm font-medium text-gray-700"
          >
            Monthly Budget ($)
          </label>
          <div className="mb-4 mt-4">
            <label> Category </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>{" "}
          </div>
          <input
            type="number"
            id="monthlyBudget"
            name="monthlyBudget"
            value={newBudget.amount}
            onChange={(e) =>
              setNewBudget({ ...newBudget, amount: e.target.value })
            }
            placeholder="Enter your monthly budget"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
          {validationError && (
            <p className="text-red-500 text-sm mt-1">{validationError}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
