'use client'
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {axios} from "axios"

export default function SignupPage () {
    const [user, setUser] = useState({
        email : '',
        password : '',
        username : '',
    })
    
    return(
        <>
        <h1>SIgnup</h1>
        </>
    )
}