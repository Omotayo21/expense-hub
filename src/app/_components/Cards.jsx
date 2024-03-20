import React from 'react';
import Naira1 from '../../../public/Naira bg.png';
import Dollar2 from "../../../public/Dollar background.jpg";
import Dollar3 from "../../../public/dollar bg-2.jpg";
import Image from 'next/image';
import { useSelector } from 'react-redux';
const Cards = () => {
    const { expenses } = useSelector((state) => state.ui);
    const { revenues } = useSelector((state) => state.ui);

   

const totalExpense = expenses.reduce(
  (total, expense) => total + parseFloat(expense.amount),
  0
);
const totalRevenue = revenues.reduce(
  (total, revenue) => total + parseFloat(revenue.amount),
  0
);
const totalBalance = totalRevenue + totalExpense;

// Format totalExpense, totalRevenue, and totalBalance
const formattedTotalExpense = totalExpense.toLocaleString();
const formattedTotalRevenue = totalRevenue.toLocaleString();
const formattedTotalBalance = totalBalance.toLocaleString();
return (
    <div className="flex lg:flex-row sm:flex-col lg:gap-x-10 mt-8 ">
      <div className=" rounded-md  border-2 text-white w-56 h-32 relative overflow-hidden ">
        <Image
          src={Naira1}
          alt="Background Image"
          objectFit=""
          className=" w-full h-full object-cover opacity-90 "
        />
        <div className="absolute inset-0 text-white text-lg font-bold">
          <p>Total Revenue</p> <br />
         
          <h1>${totalRevenue}</h1>
        </div>
      </div>
      <div className=" rounded-md  border-2 text-white w-56 h-32 relative overflow-hidden ">
        <Image
          src={Dollar2}
          alt="Background Image"
          objectFit=""
          className=" w-full h-full object-cover opacity-80 "
        />
        <div className="absolute inset-0 text-white text-lg font-bold">
          <p>Total Expenses</p> <br />
        
          <h1>${totalExpense}</h1>
        </div>
      </div>
      <div className=" rounded-md  border-2 text-white w-56 h-32 relative overflow-hidden ">
        <Image
          src={Dollar3}
          alt="Background Image"
          
          objectFit=""
          className=" w-full h-full object-cover opacity-80 "
        />
        <div className="absolute inset-0 text-white text-lg font-bold">
          <p className='text-sm'>Total revenue + expense</p> <br />
          
          <h1>${totalBalance}</h1>
        </div>
      </div>
    </div>
  );
}

export default Cards