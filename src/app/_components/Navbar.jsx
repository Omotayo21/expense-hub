"use client"
import React, { useState } from "react";
import Link from "next/link"
import { MagnifyingGlass, Envelope, Bell, User, Moon, MoonStars } from "phosphor-react";
import Create from "./Create";
import {useRouter} from "next/navigation";
import { usePathname } from "next/navigation";
import { resetNotificationCount, setDarkMode } from "@/redux/ui-slice";
import { useDispatch, useSelector } from "react-redux";




const Header = () => {
 const { darkMode } = useSelector((state) => state.ui)
 const { notificationCount } = useSelector((state) => state.ui)
 const [theme, setTheme] = useState(false);
 const dispatch = useDispatch();
 const router= useRouter();
  const [ispopUp, setIspopUp] = useState(false);
  const newExpense = () => {
    setIspopUp(true)
  }
  const pathname = usePathname();
  const getPageName = (path) => {
    const routeMap = {
      "/": "login",
      "/dashboard": "Dashboard",
      "/notifications": "Notifications",
      "/transactions": "Transactions",
      "/profile": "Profile",
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
return (
  <>
    <div
      className={`flex flex-row items-center w-full justify-center lg:gap-8 h-16 fixed top-0 ${
        darkMode ? "bg-black " : "bg-gray-100"
      }  `}
    >
      <h1
        className={`lg:text-2xl sm:text-lg font-semibold lg:mr-48 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {getPageName(pathname)}
      </h1>
      <h1 className=" lg:hidden sm-block text-md font-bold text-black ml-8">Logo</h1>
    {/*  <button
        className=" rounded-md w-64 h-10 bg-gray-300 flex flex-row pt-2"
        onClick={newExpense}
      >
        <p className="font-bold rounded-full w-8 text-2xl bg-blue-700 text-white -mt-1">
          +
        </p>
        <h1 className="text-blue-500">Create New Expense</h1>
      </button> */}
      <div className="flex items-center lg:ml-12 sm:mr-12 ">
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
      <div className=" flex absolute lg:right-20 gap-x-4 pt-2">
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
        <div className="flex flex-row gap-x-2 pt-2">
          <Link href="/profile">
            <User
              size={35}
              className="rounded-full p-2 bg-gray-400 text-black "
            />
          </Link>
          <h1 className={`${darkMode ? "text-white" : "text-black"}`}>
            Rahman
          </h1>
        </div>
      </div>
    </div>
    {ispopUp && (
      <div className=" flex flex-col items-center w-96 h-4 pt-4 sm:mr-8 lg:ml-[30rem]">
        <Create setIspopUp={setIspopUp} />
      </div>
    )}
  </>
);

}

export default Header