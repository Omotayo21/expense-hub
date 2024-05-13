"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function verifyEmailPage() {
 
 
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl text-green-700">Verify email</h1>
        <h2 className="">Your account has been created successfully</h2>
      <p>Pls visit your email account and click on the Link to verify your email, thank you</p>

      
      </div>
    </>
  );
}
