"use client"
import React, { useEffect} from "react";
import Header from "../_components/Navbar";

import Sidebar from "../_components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses} from "../../redux/ui-slice";
import { setRevenue } from "../../redux/revenue-slice"
import axios from 'axios';


export default function SharedLayout({ children }) {
  const dispatch = useDispatch()
       const FetchExpenses = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);

         const userExpenses = res.data.data.expenses;
         dispatch(setExpenses(userExpenses));
       };
       const FetchRevenues = async () => {
         const res = await axios.get("/api/users/me");
         console.log(res.data);

         const userRevenues = res.data.data.revenues;
         dispatch(setRevenue(userRevenues));
       };
        useEffect(() => {
          FetchExpenses();
          FetchRevenues()
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
