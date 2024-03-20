"use client"
import React from "react";
import { useRouter } from "next/navigation";


const SidebarList = ({ num, text, path }) => {
  const router  = useRouter();

 // const pathname = router
  const currentPath = router.pathname;
    console.log("pathname:", currentPath);
   console.log("path prop:", path);
  return (
    <div className="">
      <div className="flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-500 focus:bg-purple-700 p-3 w-32">
        <div
          className={`${
           currentPath === path
              ? "bg-gray-400 rounded-sm"
              : "border-white bg-transparent"
          } `}
        >
          <ul className="flex flex-col sm:hidden lg:block">
            <li className="text-gray-200 text-sm uppercase"></li>
            <li className="text-[0.8rem] text-blue-500 font-bold uppercase cursor-pointer ">
              {text}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarList;
