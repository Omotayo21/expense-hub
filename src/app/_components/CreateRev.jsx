"use client";
import React, { useEffect, useState } from "react";

import { addRevenue, incrementNotificationCount } from "@/redux/ui-slice";
import { useDispatch } from "react-redux";

const Create = ({ setIspopUp }) => {
  const dispatch = useDispatch();
 
  const [expense, setExpense] = useState([]);
  const [total, setTotal] = useState(0);
  const [newRevenue, setNewRevenue] = useState({
  
    name: "",
    amount: "",
  });
  const [empty, setEmpty] = useState(false);
  const handleAddRevenue = () => {
    if (newRevenue.name !== "" && newRevenue.amount !== "" ) {
      const revenue = {
      
        name: newRevenue.name,
        amount: newRevenue.amount,
      };
      dispatch(addRevenue(revenue));
      dispatch(incrementNotificationCount());
      console.log(revenue);
    
      setNewRevenue({ name: "", amount: "", });
    }
    if (newRevenue.name == "" || newRevenue.amount == "" ) {
      setEmpty(true);
    }
  };

  
  return (
    <>
      <div className="max-w-md pl-4 py-2 w-[20rem] my-8 z-10 bg-white rounded-md h-96 border border-green-600 ">
        <h1 className="text-2xl font-semibold mb-4 text-green-600">Add Revenue</h1>
       
      
        <div className="flex flex-col gap-y-4 justify-between">
          <div className="mt-8 ">
            <label className="block text-gray-600 font-semibold"> Source :</label>
            <input
              value={newRevenue.name}
              onChange={(e) =>
                setNewRevenue({ ...newRevenue, name: e.target.value })
              }
              placeholder="e.g Salary"
              type="text"
              className="w-48 p-2 border border-green-600 rounded text-black outline-none"
            />
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-gray-600 font-semibold"> Amount :</label>
            <input
              value={newRevenue.amount}
              onChange={(e) =>
                setNewRevenue({ ...newRevenue, amount: e.target.value })
              }
              placeholder="$00.00"
              type="number"
              className="w-24 p-2 border border-green-600 rounded text-black outline-none"
            />
          </div>
          <button
            onClick={handleAddRevenue}
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
