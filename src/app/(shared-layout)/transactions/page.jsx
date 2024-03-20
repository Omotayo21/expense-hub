"use client"
import React, { useState, useEffect } from "react";
import { MagnifyingGlass, PencilSimple, Trash, TrashSimple } from "phosphor-react";
import { useSelector } from "react-redux";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  querySnapshot,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const Page = () => {
  const { darkMode } = useSelector((state) => state.ui);
  const { expenses, revenues } = useSelector((state) => state.ui);
  const today = new Date().toLocaleDateString();
  const [sortedExpenses, setSortedExpenses] = useState([...expenses]);
  const [sortedRevenues, setSortedRevenues] = useState([...revenues]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsExist, setSearchResultsExist] = useState(true);

  const remove = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
    };
  

  useEffect(() => {
    // Update sorted expenses whenever expenses change
    setSortedExpenses([...expenses]);
  }, [expenses]);

  useEffect(() => {
    // Update sorted revenues whenever revenues change
    setSortedRevenues([...revenues]);
  }, [revenues]);

  // Function to sort expenses by amount
  const sortExpensesByAmount = (order) => {
    const sorted = [...expenses].sort((a, b) => {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    });
    setSortedExpenses(sorted);
    setSortOrder(order);
  };

  // Function to sort revenues by amount
  const sortRevenuesByAmount = (order) => {
    const sorted = [...revenues].sort((a, b) => {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    });
    setSortedRevenues(sorted);
    setSortOrder(order);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredExpenses = expenses.filter((expense) =>
      expense.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedExpenses(filteredExpenses);
    const filteredRevenues = revenues.filter((revenue) =>
      revenue.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedRevenues(filteredRevenues);
    // Check if any search results exist
    setSearchResultsExist(
      filteredExpenses.length > 0 || filteredRevenues.length > 0
    );
  };

  return (
    <div
      className={`flex ${
        darkMode ? "bg-gray-700" : "lg:bg-gray-200 sm:bg-white"
      } min-h-screen`}
    >
      <div className="flex flex-col mt-24 lg:ml-64">
        <div className="lg:ml-12 flex lg:flex-row sm:flex-col items-center sm:gap-y-2 lg:gap-x-10">
          <button
            className="bg-blue-700 h-8 w-48 text-[0.65rem] text-white"
            onClick={() =>
              sortExpensesByAmount(sortOrder === "asc" ? "desc" : "asc")
            }
          >
            Sort Expenses by Amount (
            {sortOrder === "asc" ? "High to low" : "low to high"})
          </button>
          <button
            className="bg-blue-700 h-8 w-48 text-[0.65rem] text-white"
            onClick={() =>
              sortRevenuesByAmount(sortOrder === "asc" ? "desc" : "asc")
            }
          >
            Sort Revenue by Amount (
            {sortOrder === "asc" ? "High to Low" : "Low to High"})
          </button>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-64 h-8 px-2 border rounded-sm outline-none"
            />
          </div>
        </div>
        {/* Display search results or message */}
        {searchResultsExist ? (
          <>
            <h1
              className={`text-2xl font-semibold mt-8 lg:ml-20 sm:ml-2 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              EXPENSES
            </h1>
            <div className="lg:ml-16 sm:ml-2 sm:mr-2 mt-8 sm:max-w-sm lg:max-w-[62rem] mx-auto bg-gray-100 rounded-sm border border-green-400 sm:p-4 sm:overflow-x-auto ">
              {sortedExpenses.length === 0 ? (
                <h1>No Transactions yet</h1>
              ) : (
                <div className="sm:min-w-full">
                  <div className="sm:min-w-[1000px]">
                    <div className="grid grid-cols-6 gap-18 font-bold text-green-700">
                      <div className="">Category</div>
                      <div>Date</div>
                      <div>Title</div>
                      <div>Amount</div>
                      <div>Type</div>
                      <div>Delete</div>
                    </div>
                    {sortedExpenses.map((expense, id) => (
                      <div
                        key={id}
                        className="grid grid-cols-6 text-black gap-18  lg:mt-2 border-b border-blue-800 py-2"
                      >
                        <div>{expense.category}</div>
                        <div>{today}</div>
                        <div>{expense.name}</div>
                        <div>${expense.amount}</div>
                        <div>Expense</div>
                        <div>
                          <button className="">
                            <TrashSimple size={20} color="blue" className="" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <h1
              className={`text-2xl font-semibold mt-8 lg:ml-20 sm:ml-2 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              REVENUES
            </h1>
            <div className="lg:ml-16 sm:ml-2 sm:mr-2 mt-8 sm:max-w-sm lg:max-w-[62rem] mx-auto bg-gray-100 rounded-sm border border-green-400 sm:p-4 sm:overflow-x-auto">
              {sortedRevenues.length === 0 ? (
                <h1>No Transactions yet</h1>
              ) : (
                <div className="sm:min-w-full">
                  <div className="sm:min-w-[1000px]">
                    <div className="grid grid-cols-6 gap-18 font-bold text-green-700">
                      <div>Category</div>
                      <div>Date</div>
                      <div>Title</div>
                      <div>Amount</div>
                      <div>Type</div>
                      <div>Delete</div>
                    </div>
                    {sortedRevenues.map((revenue, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-6 gap-18 text-black lg:mt-2 border-b border-blue-800 py-2"
                      >
                        <div>Income</div>
                        <div>{today}</div>
                        <div>{revenue.name}</div>
                        <div>${revenue.amount}</div>
                        <div>Revenue</div>
                        <div>
                          <button className="">
                            <PencilSimple size={20} color="blue" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <h1 className="ml-20 mt-8">No matching transactions</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
