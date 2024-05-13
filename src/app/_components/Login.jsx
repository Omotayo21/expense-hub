"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setExpenses } from "../../redux/ui-slice";
import { setRevenue } from "../../redux/revenue-slice";


const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
   const [user, setUser] = useState({
        email : '',
        password : '',
      })
      const [errors, setErrors] = useState({
        email: "",
        password: "",
      });
      const [buttonDisabled, setButtonDisabled] = useState(false);
      const [loading, setLoading] = useState(false)
      const [notification , setNotification] = useState(null)

       const fetchExpenses = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    
    const userExpenses = res.data.data.expenses
    dispatch(setExpenses(userExpenses))
}
    const fetchRevenues = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)
    
    const userRevenues = res.data.data.revenues
    dispatch(setRevenue(userRevenues))
}
  const validateEmail = () => {
    if (
      !user.email.includes("@gmail.com") &&
      !user.email.includes("@yahoo.com")
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email:
          "Please enter a valid email address ending with @gmail.com or @yahoo.com",
      }));
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (user.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      return false;
    }
    return true;
  };
  
    const loginAction = async (e) => {
      e.preventDefault()
       if (validateEmail() && validatePassword()) {
         try {
           setLoading(true);
           const response = await axios.post("/api/users/login", user);
         
          
               router.push("/dashboard");
             toast.success("login success");
             console.log("login success", response.data);
          
           
         } catch (error) {
           toast.error(error.message);
           console.log(error);
           setNotification({
            type : 'error',
            message : 'incorrect email or password'
           })
           setTimeout(() => {
            setNotification(null)
           }, 3000);
           setLoading(false)
         } finally {
           setLoading(false);
         }
       } else {
         setLoading(false);
       }
    }
 
useEffect(()=> {
    if(user.email.length > 0 && user.password.length > 7 ){
      setButtonDisabled(false)
    } else{
      setButtonDisabled(true)
    }
   }, [user]) 
  return (
    <>
      <section className="bg-white  ">
        <div className="flex flex-col items-center justify-center px-6 py-8  sm:max-w-md md:h-screen lg:py-0">
          <div className="lg:w-[30rem] sm:w-[20rem] mb-12 bg-white rounded-lg shadow border sm:max-w-md xl:p-0 border-none">
            <div className="p-6 space-y-4 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700 sm:text-2xl">
                Sign into your account
              </h1>
              <form
                onSubmit={(e) => {
                  loginAction(e);
                }}
                className="space-y-4 sm:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-green-700"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    name="email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="name@mail.com"
                    className={`bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 
                     
                    }`}
                    required=""
                  />
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-green-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={user.password}
                    name="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="at least 8 characters long"
                    className={`bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 `}
                    required=""
                  />
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                  <Link
                    href="forgotpassword"
                    className="text-sm font-medium text-green-700 hover:underline "
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  onClick={loginAction}
                  type="submit"
                  className={`w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    buttonDisabled
                      ? "bg-green-300 cursor-not-allowed"
                      : "bg-green-600"
                  }  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Authenticating..." : "Sign in"}
                </button>

                <p className="text-sm font-light text-black-500">
                  Don't have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-green-600 hover:underline "
                  >
                    Sign up
                  </Link>
                </p>
              </form>
              { notification && (
                <div className={`${
                  notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } pt-4 p-4 text-white text-center left-o w-full`}>
                  {notification.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Login;
