"use client"
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  querySnapshot,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { addExpense, incrementNotificationCount } from "@/redux/ui-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Create = ({setIspopUp}) => {
{/*const addExpense = async (e) => {
  if (newExpense.name !== "" && newExpense.amount !== "") {
    //setExpense([...expense, newExpense]);
      setIspopUp(false);
    dispatch(addExpense(expense));
    dispatch(updateNotificationCount());
    
  
    await addDoc(collection(db, "expenses"), {
      name: newExpense.name.trim(),
      amount: newExpense.amount,
    });
    setNewExpense({ name: "", amount: "" });
   
    //come back to do toast
  */}



  const dispatch = useDispatch();
    const categories = [
      "Food",
      "Transportation",
      "Utilities",
      "Entertainment",
      "Others",
    ];
const [category, setCategory] = useState("");
const [expense, setExpense] = useState([]);
const [total, setTotal] = useState(0);
const [newExpense, setNewExpense] = useState({
  category: "",
  name: "",
  amount: "",
});
const [empty, setEmpty] = useState(false)
 const handleAddExpense = () => {
   if (
     newExpense.name !== "" &&
     newExpense.amount !== "" &&
     category !== ""
    
   ) {
      const expenseItem = {
        category: category,
        name: newExpense.name,
        amount: newExpense.amount,
      };
     dispatch(addExpense(expenseItem
      ));
     dispatch(incrementNotificationCount());
     console.log(expenseItem);
     //setIspopUp(false);
    
     setNewExpense({ name: "", amount: "", category: "" });
       toast.success("Item added to expense list");
   }
   if( newExpense.name =="" || newExpense.amount == "" || category == ""){
    setEmpty(true)
   }
 };

const close = () => {
  setIspopUp(false)
}
return (
  <>
    <div className="max-w-md pl-4 py-2 w-[20rem] h-96 my-8 z-10 bg-white border border-green-600 rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-red-600">Add Expense</h1>
      <p
        className="flex flex-row-reverse font-bold -mt-12 mr-2 cursor-pointer"
        onClick={close}
      >
        {" "}
        X
      </p>
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
          <label className="block text-gray-600 font-semibold"> Amount :</label>
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

      {/*<h2 className="text-xl font-semibold mt-6 mb-4">Expense List</h2>

  <ul className=" ">
    {expense.map((item, id) => (
      <li key={id} className="my-4 w-full flex justify-between">
        <div className=" p-4 w-full flex justify-between">
          <span>{item.name}</span>
          <span>${item.amount}</span>
        </div>
        <button onClick={() => remove(item.id)}>X</button>
      </li>
    ))}
    </ul>

    {expense.length < 1 ? <p>No Expense</p> : <p>Total ${total}</p>}*/}
    </div>
  </>
);
}


export default Create