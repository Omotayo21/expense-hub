"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { addRevenue, addRevenueFailure, incrementNotificationCount } from "../../redux/revenue-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Create = () => {
  const dispatch = useDispatch();
 
   const [dataid, setData] = useState("nothing");

   const getUserDetails = async () => {
     const res = await axios.get("/api/users/me");
     console.log(res.data);
     setData(res.data.data._id);
   };
   useEffect(() => {
     getUserDetails();
   }, []);
  const [newRevenue, setNewRevenue] = useState({
  
    name: "",
    amount: "",
  });
  const [empty, setEmpty] = useState(false);
  const handleAddRevenue = async () => {
    if (newRevenue.name !== "" && newRevenue.amount !== "" ) {
     const revenueItem = {
       id:uuidv4(),
        name: newRevenue.name,
        amount: newRevenue.amount,
      };
       try {

const response = await axios.post('/api/users/revenues',{dataid, revenueItem})
dispatch(addRevenue(response.data))
toast.success('Revenue added successfully')

      } catch (error) {
        dispatch(addRevenueFailure(error.message))
        console.error('error adding revenuees', error)
      }
      //dispatch(addRevenue(revenueItem));
      //dispatch(addRevenueAsync(revenueItem))
      dispatch(incrementNotificationCount());
      console.log(revenueItem);
    
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
