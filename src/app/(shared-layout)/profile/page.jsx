"use client"
import React, { useEffect, useState } from 'react';
import { UserCircle, SignOut } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


const Profile = () => {
  const router = useRouter()
  const [data, setData] = useState('nothing')
  const [name, setName] = useState('No name yet')
const [email, setEmail] = useState('no mail yet')

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
    setName(res.data.data.username)
    setEmail(res.data.data.email)
  }
useEffect(() => {
  getUserDetails()
},[])
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-8 mt-4">
      <h2 className="font-bold text-lg ">My Account</h2>
      <div className="flex flex-col items-center justify-center gap-y-4 w-64 h-40 ">
        <UserCircle size={50} className="" />{" "}
        <h2 className="font-semibold ">{name}</h2>
      </div>

      <div className="rounded-md lg:w-96 sm:w-[22rem] h-64 text-black flex flex-col gap-y-4 bg-gray-100 pb-8 pl-4 ">
        <h2 className="border-b border-green-600 text-green-600 pt-4 font-semibold">
          Profile Information
        </h2>
        <div className="flex flex-row gap-x-2">
          <label className="text-[1rem] font-semibold">Display Name : </label>
          <p>{name}</p>
        </div>
        <div className="flex flex-row gap-x-2">
          {" "}
          <label className="text-[1rem] font-semibold">Email Adress : </label>
          <p>{email}</p>
        </div>
        <div className="flex flex-row gap-x-2">
          {" "}
          <label className="text-[1rem] font-semibold">User Id : </label>
          <p>{data}</p>
        </div>
      </div>
      <Link href="/">
        <button
          onClick={logout}
          className="bg-red-500 text-white mt-24 w-32 p-3 ml-6 rounded-md flex flex-row gap-x-3"
        >
          <SignOut size={20} />
          Logout
        </button>
      </Link>
    </div>
  );
}

export default Profile;