"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  addExpense,
  incrementNotificationCount,
  addExpenseFailure,
  setExpense,
} from "../../redux/ui-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Create = () => {
  const [dataid, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const dispatch = useDispatch();
  const categories = [
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Others",
    "Groceries",

    "Health & Fitness",
    "Shopping",
    "Travel",
    "Education",
    "Insurance",
    "Rent",
    "Utilities",
    "Gifts",
  ];
  const [category, setCategory] = useState("");

  const [newExpense, setNewExpense] = useState({
    id: "",
    category: "",
    name: "",
    amount: "",
  });
  const FetchExpenses = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);

         const userExpenses = res.data.data.expenses;
         dispatch(setExpenses(userExpenses));
  }
  const [empty, setEmpty] = useState(false);
  const handleAddExpense = async () => {
    if (newExpense.name !== "" && newExpense.amount !== "" && category !== "") {
      const expenseItem = {
        id: uuidv4(),
        category: category,
        name: newExpense.name,
        amount: newExpense.amount,
      };
      try {
        const response = await axios.post("/api/users/expenses", {
          dataid,
          expenseItem,
        });
        dispatch(addExpense(response.data));
        FetchExpenses()
      } catch (error) {
        dispatch(addExpenseFailure(error.message));
        console.error("error adding expenses", error);
      }

      dispatch(incrementNotificationCount());
      console.log(expenseItem);

      setNewExpense({ name: "", amount: "", category: "" });
      toast.success("Item added to expense list");
    }
    if (newExpense.name == "" || newExpense.amount == "" || category == "") {
      setEmpty(true);
    }
  };

  return (
    <>
      <div className="max-w-md pl-4 py-2 w-[20rem] h-96 my-8  bg-white border border-green-600 rounded-md">
        <h1 className="text-2xl font-semibold mb-6 text-red-600">
          Add Expense
        </h1>

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
        <div className="flex flex-col gap-y-8 justify-between">
          <div className="mb-4 ">
            <label className="block text-gray-600 font-semibold">
              {" "}
              Expense :
            </label>
            <input
              value={newExpense.name}
              onChange={(e) =>
                setNewExpense({ ...newExpense, name: e.target.value })
              }
              placeholder="e.g rent"
              type="text"
              className="w-48 p-2 border border-green-600 outline-none rounded text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">
              {" "}
              Amount :
            </label>
            <input
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              placeholder="$00.00"
              type="number"
              className="w-24 p-2 border border-green-600 outline-none rounded text-black"
            />
          </div>
          <button
            onClick={handleAddExpense}
            className="bg-blue-500 text-white px-2 rounded h-12 w-48 "
          >
            Add
          </button>
          {empty && (
            <p className="text-red-600">
              {" "}
              pls fill all inputs and select a category
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Create;
