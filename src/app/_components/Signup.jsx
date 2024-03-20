"use client"
import React, { useEffect, useState } from "react";
import { authentication, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogo } from "phosphor-react";

function Register() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Check if email contains '@gmail.com'
    if (
      !email.toLowerCase().includes("@gmail.com") &&
      !email.toLowerCase().includes("@yahoo.com")
    ) {
      errors.email = "Email must be a Gmail account";
    }
    if (password.length < 8) {
      // Check if password is at least 8 characters long
      errors.password = "Password must be at least 8 characters long";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const signUp = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        await createUserWithEmailAndPassword(authentication, email, password);
        const user = authentication.currentUser;
        const userUid = user.uid;
        const response = await fetch(
          `https://my-shopping-app-dfa7b-default-rtdb.firebaseio.com/users/${userUid}/cartItems.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const signUpwithGoogle = async (e) => {
    try {
      e.preventDefault();
      await signInWithPopup(authentication, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };
  onAuthStateChanged(authentication, (currentUser) => {
    if (currentUser) {
      navigate("/home");
    }
  });

  const handletogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const inputType = passwordVisible ? "text" : "password";

  return (
    <>
      <section className="bg-white h-full mt-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-white-200 rounded-lg shadow border mt-2 sm:max-w-md xl:p-0 border-blue-700">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-900 sm:text-2xl">
                Create an account
              </h1>
              <form
                onSubmit={(e) => registerAction(e)}
                className="space-y-4 sm:space-y-6"
                action="#"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-blue-700">
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        email: "",
                      }));
                    }}
                    placeholder="name@mail.com"
                    className={`bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 ${
                      validationErrors.email && "border-red-500"
                    }`}
                    required=""
                  />
                  {validationErrors.email && (
                    <p className="text-center">
                      <small className="text-red-800">
                        {validationErrors.email}
                      </small>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-blue-700">
                    Password
                  </label>
                  <input
                    type={inputType}
                    value={password}
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        password: "",
                      }));
                    }}
                    placeholder="at least 6 characters long"
                    className={`bg-gray-50 border border-blue-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 ${
                      validationErrors.password && "border-red-500"
                    }`}
                    required=""
                  />
                  {validationErrors.password && (
                    <p className="text-center">
                      <small className="text-red-800">
                        {validationErrors.password}
                      </small>
                    </p>
                  )}
                  <button
                    className="text-white bg-blue-600 hover:bg-primary-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800 pr-5 cursor:pointer"
                    onClick={handletogglePassword}
                  >
                    {passwordVisible ? "hide" : "show"}
                  </button>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-blue-800">
                      I accept the{" "}
                      <a
                        className="font-medium text-blue-800 hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                
                >
                  Create an account
                </button>
                <button
                  className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm lg:pl-20 sm:pl-12 py-2.5 text-center flex flex-row"
                 
                >
                  Sign in with Google account <GoogleLogo size={20} />
                </button>
                <p className="text-sm font-light text-black-500">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}

export default Register;
