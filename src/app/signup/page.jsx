'use client'
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import Header from "../_components/Header"


export default function SignupPage () {
  const router = useRouter()
    const [user, setUser] = useState({
        email : '',
        password : '',
        username : '',
    })
     const [errors, setErrors] = useState({
       email: "",
       password: "",
     });
     const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false)
   
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
   
   
    const SignupAction = async (e) => {
      e.preventDefault()
      if (validateEmail() && validatePassword()) {
try {
  setLoading(true)
   const response = await axios.post("/api/users/signup", user);
   router.push("/sucessfull");
   toast.success('Signed Up successfully')
   console.log('signup success', response.data);
   
} catch (error) {
  toast.error(error.message)
  console.log(error)
}
      } else{
        setLoading(false)
      }
    }
   useEffect(()=> {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    } else{
      setButtonDisabled(true)
    }
   }, [user]) 
    return (
      <>
        <section className="bg-white w-full h-full absolute flex flex-col items-center justify-center ">
          <div className="flex lg:flex-row lg:items-center lg:justify-center px-6 py-8  sm:max-w-md md:h-screen lg:py-0">
            <div className="lg:w-[30rem] sm:w-[20rem] mb-12 bg-white rounded-lg shadow border sm:max-w-md xl:p-0 border-none">
              <div className="p-6 space-y-4 sm:p-8 ">
                <Header />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-green-700 sm:text-2xl">
                  Create an account
                </h1>
                <form
                  onSubmit={(e) => {
                    SignupAction(e);
                  }}
                  className="space-y-4 sm:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-green-700"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={user.username}
                      name="email"
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      placeholder="username"
                      className="lg:w-96 sm:text-sm sm:w-64 h-12 pl-2 rounded-md outline-none border border-green-700"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-green-700"
                    >
                      Your email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      name="email"
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="lg:w-96 sm:text-sm sm:w-64 h-12 pl-2 rounded-md outline-none border border-green-700"
                      placeholder="name@mail.com"
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
                      className="lg:w-96 sm:text-sm sm:w-64 h-12 pl-2 rounded-md outline-none border border-green-700"
                      placeholder="at least 8 characters long"
                      required=""
                    />
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  </div>

                  <button
                    onClick={SignupAction}
                    type="submit"
                    className={`w-full text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Signing up..." : "Sign up"}
                  </button>

                  <p className="text-sm font-light text-black-500">
                    ALready have an account ?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-green-600 hover:underline "
                    >
                      Visit Login page
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}