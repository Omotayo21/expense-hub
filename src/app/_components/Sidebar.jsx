"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { CurrencyDollar, BellRinging, Target, SignOut, House , ChatTeardropDots, Book, PlusCircle} from "phosphor-react";
import { resetNotificationCount } from "../../redux/ui-slice";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Header from "./Header";


const Sidebar = () => {
  const router = useRouter()
  const { darkMode } = useSelector((state) => state.ui);
const dispatch = useDispatch()

  const reset = () => {
    dispatch(resetNotificationCount())
  }
  const logout = async () => {
try {
  await axios.get("/api/users/logout")
  router.push('/login')
  
} catch (error) {
  console.log(error.message);
  toast.error(error.message)
  
}
  }
  return (
    <>
      <div
        className={`lg:flex lg:flex-col sm:hidden gap-y-4 pt-4 w-48 z-20 min-h-screen  fixed top-0 ${
          darkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
       <Header />
        <Link href="/dashboard">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 ml-2 p-3 w-40">
            <House size={20} /> Dashboard
          </button>
        </Link>
         <Link href="/add">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <PlusCircle size={20} />
            Create
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
       
         <Link href="/about">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <ChatTeardropDots size={20} /> About
          </button>
        </Link>
       

        <Link href="/">
          <button onClick={logout}
           className="bg-red-500 text-white mt-24 w-32 p-3 ml-6 rounded-md flex flex-row gap-x-3">
            <SignOut size={20} />
            Logout
          </button>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
