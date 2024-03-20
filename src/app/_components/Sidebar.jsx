"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { CurrencyDollar, BellRinging, Target, SignOut, House ,Book, PlusCircle} from "phosphor-react";
import { resetNotificationCount } from "@/redux/ui-slice";


const Sidebar = () => {
  const { darkMode } = useSelector((state) => state.ui);
const dispatch = useDispatch()

  const reset = () => {
    dispatch(resetNotificationCount())
  }
  return (
    <>
      <div
        className={`lg:flex lg:flex-col sm:hidden lg-block gap-y-4 pt-4 w-48 z-10 min-h-screen  fixed top-0 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className=" text-3xl font-bold text-black">Logo</h1>
        <Link href="/dashboard">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 ml-2 p-3 w-40">
            <House size={20} /> Dashboard
          </button>
        </Link>
        <Link href="/budget">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <Book size={20} /> budget
          </button>
        </Link>
        <Link href="/transactions">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40">
            <CurrencyDollar size={20} /> transactions
          </button>
        </Link>
        <Link href="/notifications">
          <button
          onClick={reset} 
          className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40">
            <BellRinging size={20} />
            notifications
          </button>
        </Link>
        <Link href="/targets">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <Target size={20} />
            targets
          </button>
        </Link>
        <Link href="/new-expense">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <PlusCircle size={20} />
            Create
          </button>
        </Link>

        <Link href="/">
          <button className="bg-red-500 text-white mt-24 w-32 p-3 ml-6 rounded-md flex flex-row gap-x-3">
            <SignOut size={20} />
            Logout
          </button>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
