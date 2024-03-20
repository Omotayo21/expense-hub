'use client'
import React from "react";
import { BellRinging, Bell } from "phosphor-react";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { darkMode } = useSelector((state) => state.ui);
  const { expenses, revenues } = useSelector((state) => state.ui);
  const today = new Date().toLocaleDateString();

  return (
    <>
      <div
        className={`min-h-screen flex flex-row mt-12 ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-black flex flex-row">
            All Notifications <Bell size={20} className="mt-1 ml-1" />
          </h1>

          {expenses.length === 0 && revenues.length === 0 ? (
            <p>No notifications yet</p>
          ) : (
            <ul className="flex flex-col gap-y-4">
              {expenses.map((expense, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between border-2 lg:w-[36rem] sm:w-[16rem] rounded-md bg-gray-200 border-blue mt-2 pb-4 flex-row pt-4"
                >
                  <BellRinging
                    size={30}
                    className="text-black lg:ml-2 sm:mr-1 sm:p-1"
                  />
                  <div className="">
                    <p className="lg:text-sm sm:text-[0.6rem] text-black">
                      You added {expense.name} to your expenses list which cost
                      you ${expense.amount}
                    </p>
                  </div>
                  <span className=" bg-blue-700 text-white lg:text-sm sm:text-[0.6rem] lg:p-2 sm:p-1 mr-2 rounded-md">
                    {today}
                  </span>
                </li>
              ))}
              {revenues.map((revenue, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between border-2 w-[36rem] rounded-md bg-gray-200 border-blue mt-2 pb-4 flex-row pt-4"
                >
                  <BellRinging
                    size={30}
                    className="text-black lg:ml-2 sm:mr-1 sm:p-4"
                  />
                  <div className="">
                    <p className="text-sm text-black">
                      You received income of ${revenue.amount} from{" "}
                      {revenue.name}
                    </p>
                  </div>
                  <span className=" bg-blue-700 text-white text-sm p-2 mr-2 rounded-md">
                    {today}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
