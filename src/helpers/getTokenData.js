import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

export const getTokenData = (NextRequest) => {
    try {
       const token = NextRequest.cookies.get("token")?.value || '';
     const decodedToken =  jwt.verify(token, process.env.TOKEN_SECRET)
     return decodedToken.id 
    } catch (error) {
       throw new Error(error.message) 
    }
}