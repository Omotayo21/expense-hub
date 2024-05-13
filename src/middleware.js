import { NextResponse, NextRequest } from "next/server";


export function middleware(NextRequest) {
   const path = NextRequest.nextUrl.pathname

   const isPublicPath = path === '/' || path === '/signup'|| path === '/sucessfull' || path === '/verifyEmail'  || path ==='/forgotpassword' || path === '/resetpassword' 

const token =  NextRequest.cookies.get('token')?.value || ''
if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', NextRequest.nextUrl))
}
if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', NextRequest.nextUrl))
}
}



export const config = {
    matcher:[
        '/',
       
      '/sucessfull',
        '/signup',
        '/verifyEmail',
        '/forgotpassword',
        '/resetpassword',

    ]
}