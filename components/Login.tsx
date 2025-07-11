"use client";
import React, { useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginCaptcha from "./LoginCaptcha";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isRemembered, setIsRemembered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Perform login logic here
    // On successful login, redirect to the desired page
    if (username && password) {
      alert("Login successful!");
      router.push("/home");
    } else {
      alert("Please enter both username and password.");
    }
  };


  return (
    <div className="min-w-full sm:min-w-3/5 md:min-w-3/5 lg:w-3/5 min-h-full pt-5 rounded-xl border-t-[5px] border-t-[#7e81f8] bg-white shadow-md mb-10 sm:mb-2 ">
      <LoginHeader />
      <LoginForm setPassword={setPassword} setUsername={setUsername} />
      <LoginCaptcha />
      <div className="flex flex-col justify-center mt-4 gap-5 items-center">
        <div className="flex justify-center mt-4">
          <label htmlFor="remember" className="flex items-center">
            <input
              onChange={() => {
                setIsRemembered(!isRemembered);
              }}
              type="checkbox"
              name="remember"
              value={1}
              checked={isRemembered}
              className="m-1"
            />
            Remember me
          </label>
        </div>
        <button
          onClick={() => handleLogin()}
          className="w-1/4 max-w-md p-3 bg-[#7e81f8] text-white hover:text-black text-md rounded-md hover:bg-gray-100 cursor-pointer transition duration-200"
        >
          LOGIN
        </button>
        <Link
          className="text-sm text-gray-400 hover:text-[#5c60f5bf]"
          href={"#firstTimeLogin"}
        >
          First Time Login?
        </Link>
      </div>
    </div>
  );
};

export default Login;
