"use client"
import React, {useState, useEffect} from "react";
import Header from "../_components/Navbar";

import Sidebar from "../_components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses} from "../../redux/ui-slice";
import { setRevenue } from "../../redux/revenue-slice"
import axios from 'axios';


export default function sharedLayout({ children }) {
  const dispatch = useDispatch()
       const fetchExpenses = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);

         const userExpenses = res.data.data.expenses;
         dispatch(setExpenses(userExpenses));
       };
       const fetchRevenues = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);

         const userRevenues = res.data.data.revenues;
         dispatch(setRevenue(userRevenues));
       };
        useEffect(() => {
          fetchExpenses();
          fetchRevenues()
        }, []);

   const { darkMode } = useSelector((state) => state.ui);
  return (
     <div
        className={`min-h-screen ${darkMode ? "bg-gray-700" : "bg-green-100"
        }`}
      >
      <ToastContainer />
      <Sidebar />
      <Header />
      
      <div>{children}</div>
    </div>
  );
}
