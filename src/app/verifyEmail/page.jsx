"use client"
import axios from "axios"
import Link from "next/link"
import React, {useState, useEffect} from "react"


export default function VerifyEmailPage(){
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
    try {
       await axios.post('/api/users/verifymail', {token})
       setVerified(true)
    } catch (error) {
      setError(true)
      console.log(error.response.data)  
    }
}
useEffect(()=> {
const urlToken = window.location.search.split('=')[1];
setToken(urlToken || "");
}, [])
useEffect(()=> {
if(token.length > 0){
    verifyUserEmail()
}
}, [token]);

return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">verify email</h1>
        <h2 className="sm:text-sm">{token ? `${token}` : 'no token'}</h2>

        {verified && (
            <div className="mt-4">
              <h2 className="lg:text-2xl sm:text-lg">Verified Sucessfully</h2>
              <Link href="/login"><button className="bg-green-600 w-64 mt-12 text-white font-semibold p-2 rounded-md">
                Login</button>
              </Link>

            </div>
        )}
         {error && (
            <div>
              <h2 className="text-2xl text-red-800">Error</h2>
              

            </div>
        )}
    </div>
    
    </>
)

}