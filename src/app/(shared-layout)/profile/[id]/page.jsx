
import React from 'react';
//import { UserCircle } from 'phosphor-react';

const Page = ({params}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 mt-16">
      <h2 className="font-bold text-lg ">My Account <span>{params.id}</span></h2>
      <div className="flex flex-row">
         <h2> Rahman</h2>{" "}
      </div>
      <div className="rounded-md w-96 h-64 text-black bg-gray-400 pb-8">
        <label>DIsplay Name : </label>
        <p className="text-lg font-semibold">Rahman</p>
        <label>Email Adress : </label>
        <p className="text-lg font-semibold">rufaiabdulrahman21@gmail.com</p>
        <label>Phone number : </label>
        <p className="text-lg font-semibold">09076930903</p>
        
      </div>
      <button className='bg-gray-600 text-black p-4'> logout</button>
    </div>
  );
}

export default Page;