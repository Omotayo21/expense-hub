"use client"
import React, { useState, useEffect } from "react";
//import { MagnifyingGlass, PencilSimple, Trash, TrashSimple } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";
//import { deleteExpense } from "@/redux/ui-slice";
//import { deleteRevenue } from "@/redux/revenue-slice";
import axios from "axios";

const Page = () => {
  const dispatch = useDispatch()
  const { darkMode, expenses } = useSelector((state) => state.ui);
  const { revenues } = useSelector((state) => state.revenue);
  const today = new Date().toLocaleDateString();
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [sortedRevenues, setSortedRevenues] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsExist, setSearchResultsExist] = useState(true);


  

  useEffect(() => {
    // Update sorted expenses whenever expenses change
    if(Array.isArray(expenses))
    {
    setSortedExpenses(expenses);}
  }, [expenses]);

  useEffect(() => {
      if (Array.isArray(revenues)) {
        setSortedRevenues(revenues);
      }

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
     const [dataid, setData] = useState("");

     const getUserDetails = async () => {
       const res = await axios.get("/api/users/me");
       console.log(res.data);
       setData(res.data.data._id);
     };
     useEffect(() => {
       getUserDetails();
     }, []);
const handleDeleteExpense = async (expenseId) => {

  try {
 await axios.delete(`/api/users/${dataid}/deleteExpense/${expenseId}`);

} catch (error) {
   console.error('couldnt delete', error) 
  }

}
const handleDeleteRevenue = async (revenueId) => {
  await axios.delete("/api/users/deleteRevenue", { dataid, revenueId });
//dispatch(deleteRevenue(revenueId))

 
}
  return (
    <div
      className={`flex min-h-screen`}
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
            <div className="lg:ml-16 sm:ml-2  mt-8 sm:max-w-[22rem] lg:max-w-[62rem] md:max-w-[50rem] mx-auto bg-gray-100 rounded-sm border border-green-400 sm:p-4 sm:overflow-x-auto ">
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
                      <div>Transaction Id</div>
                    </div>
                    {sortedExpenses.map((expense) => (
                      <div
                        key={expense._id}
                        className="grid grid-cols-6 text-black gap-18  lg:mt-2 border-b border-blue-800 py-2"
                      >
                        <div>{expense.category}</div>
                        <div>{today}</div>
                        <div>{expense.name}</div>
                        <div>${expense.amount}</div>
                        <div>Expense</div>
                        <div>
                          {/*<button className="" onClick={() => handleDeleteExpense( expense._id)}>
                            <TrashSimple size={20} color="blue" className="" />
                    </button>*/}
                    {expense._id}
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
            <div className="lg:ml-16 sm:ml-2 sm:mr-2 mt-8 sm:max-w-[22rem] lg:max-w-[62rem] md:max-w-[50rem] mx-auto bg-gray-100 rounded-sm border border-green-400 sm:p-4 sm:overflow-x-auto">
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
                      <div>Transaction Id</div>
                    </div>
                    {sortedRevenues.map((revenue) => (
                      <div
                        key={revenue._id}
                        className="grid grid-cols-6 gap-18 text-black lg:mt-2 border-b border-blue-800 py-2"
                      >
                        <div>Income</div>
                        <div>{today}</div>
                        <div>{revenue.name}</div>
                        <div>${revenue.amount}</div>
                        <div>Revenue</div>
                        <div> {/*
                          <button className="" onClick={() => handleDeleteRevenue(revenue._id)}>
                            <TrashSimple size={20} color="blue" />
                    </button>*/}
                    {revenue._id}
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
