"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link"
import {  Bell, User, MoonStars, List, House, Book, CurrencyDollar, PlusCircle, BellRinging, X, ChatTeardropDots } from "phosphor-react";

import {useRouter} from "next/navigation";
import { usePathname } from "next/navigation";
import { resetNotificationCount, setDarkMode } from "../../redux/ui-slice";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Header from "./Header";



const Navbar = () => {
 const { darkMode } = useSelector((state) => state.ui)
 const { notificationCount } = useSelector((state) => state.ui)
 const [theme, setTheme] = useState(false);
   const [name, setName] = useState('No name yet')
 const dispatch = useDispatch();
 const router= useRouter();
  const [isDropdown, setIsDropdown] = useState(false);
 
  const pathname = usePathname();
  const getPageName = (path) => {
    const routeMap = {
      "/": "login",
      "/dashboard": "Dashboard",
      "/notifications": "Notifications",
      "/transactions": "Transactions",
      "/profile": "Profile",
      "/budget": "Budget",
      "/add" : "Create",
      "/about" : "About",
    };
    return routeMap[path]
    
  }
  function toggleTheme() {
    setTheme((prevTheme) => !prevTheme);
    dispatch(setDarkMode());
  };
  const reset = () =>{
    dispatch(resetNotificationCount())
  }
  
 const dropIt = () => {
  setIsDropdown(!isDropdown)
  }
  const raise = () => {
    setIsDropdown(false)
  }



  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
      setName(res.data.data.username)
   }
useEffect(() => {
  getUserDetails()
},[])
return (
  <>
    <div
      className={`flex flex-row lg:items-center w-full lg:justify-center lg:gap-8 h-16 fixed sm:gap-8 sm:z-10 lg:z-10 top-0 ${
        darkMode ? "bg-black " : "bg-gray-100"
      }  `}
    >
      {isDropdown ? (
        <X
          size={24}
          onClick={raise}
          className={`lg:hidden mt-4 ml-2 ${
            darkMode ? "text-white " : "text-black"
          } `}
        />
      ) : (
        <List
          size={24}
          onClick={dropIt}
          className={`lg:hidden mt-4 ml-2 ${
            darkMode ? "text-white " : "text-black"
          } `}
        />
      )}

      <h1
        className={`lg:text-2xl sm:text-lg font-semibold lg:-ml-84 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {getPageName(pathname)}
      </h1>

  
      <div className="flex items-center lg:ml-12 sm:-ml-24 sm:mt-4  ">
        <label
          htmlFor="toggle"
          className={`relative block h-[1.8rem] w-[3.4rem] cursor-pointer rounded-full bg-purple-600 before:absolute before:left-2 before:top-[4px] before:h-[1.3rem] before:w-[1.3rem] before:rounded-full before:bg-white before:transition-all before:duration-300 
          ${theme ? "before:translate-x-full" : "before:translate-x-0"}`}
        >
          <input
            type="checkbox"
            id="toggle"
            className="hidden"
            checked={theme}
            onChange={toggleTheme}
          />
          <div></div>
        </label>
        <MoonStars
          size={20}
          className={` ${darkMode ? "text-white" : "text-black"}`}
        />
      </div>
      <div className=" flex absolute lg:right-20 gap-x-4 pt-2 sm:right-4">
        <Link href="/notifications">
          <Bell
            size={35}
            className="rounded-full p-2 bg-gray-400 mt-2 text-black"
            onClick={reset}
          />
          <span className="absolute top-0 ml-5 mt-2 bg-red-500 rounded-full w-5 h-5 flex justify-center items-center text-white">
            {notificationCount}
          </span>
        </Link>
        <div
          className={`h-12 ${
            darkMode ? "bg-white" : "bg-black"
          } w-[0.2rem] pb-8`}
        ></div>
        <div className="flex flex-row gap-x-2 pt-2 ">
          <Link href="/profile">
            <User
              size={35}
              className="rounded-full p-2 bg-gray-400 text-black "
            />
          </Link>
          <h1
            className={`${
              darkMode ? "text-white" : "text-black"
            } sm:text-[0.4rem] lg:text-[1.1rem] sm:mt-2`}
          >
            {name}
          </h1>
        </div>
      </div>
    </div>
    {isDropdown ? (
      <div className=" lg:hidden sm:block flex flex-col mt-16  h-[20rem] max-w-auto bg-white z-30 ">
        <div className="ml-24">
          <Header />
        </div>
        <Link href="/dashboard">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 ml-2 p-3 w-40">
            <House size={20} /> Dashboard
          </button>
        </Link>
        <Link href="/add">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <PlusCircle size={20} />
            Create
          </button>
        </Link>

        <Link href="/transactions">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40">
            <CurrencyDollar size={20} /> transactions
          </button>
        </Link>
        <Link href="/notifications">
          <button
            onClick={reset}
            className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40"
          >
            <BellRinging size={20} />
            notifications
          </button>
        </Link>
    
        <Link href="/about">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <ChatTeardropDots size={20} /> About
          </button>
        </Link>
      </div>
    ) : null}
  </>
);

}

export default Navbar