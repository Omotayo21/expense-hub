"use client"
import React from "react";
import Create from "../../_components/Create";
import CreateRev from "../../_components/CreateRev"

const NewExpense = () => {
 
  return (
    <div className={`min-h-screen flex lg:flex-row sm:flex-col mt-12 gap-x-8 justify-center items-center `}>
      <Create />
      <div className="lg:h-96 sm:h-1 bg-black lg:w-1 sm:w-64"></div>
      <CreateRev />
      
    </div>
  );
};

export default NewExpense;
