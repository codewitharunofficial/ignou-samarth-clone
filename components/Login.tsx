"use client";
import React, { useEffect, useState } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginCaptcha from "./LoginCaptcha";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, validateToken } from "@/utils/auth";

const Login = () => {
  const [isRemembered, setIsRemembered] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggingin, setIsLoggingin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setCheckingAuth(false); // no token? stay on login page
        return;
      }

      const isValid = await validateToken();
      if (isValid) {
        router.push("/");
      } else {
        localStorage.removeItem("auth_token"); // remove invalid token
        setCheckingAuth(false); // show login form
      }
    };

    checkAuth();
  }, [validateToken]);

  const handleLogin = async () => {
    setIsLoggingin(true);
    const data = await login(userId, password);
    if (data.success) {
      setIsLoggingin(false);
      router.push("/");
    } else {
      alert("Invalid credentials");
      setIsLoggingin(false);
    }
  };

  if (checkingAuth) {
    return <div className="text-center mt-20">Checking authentication...</div>;
  }

  return (
    <div className="min-w-full sm:min-w-3/5 md:min-w-3/5 lg:w-3/5 min-h-full pt-5 rounded-xl border-t-[5px] border-t-[#7e81f8] bg-white shadow-md mb-10 sm:mb-2">
      <LoginHeader />
      <LoginForm setPassword={setPassword} setUsername={setUserId} />
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
        {isLoggingin ? (
          <button
            disabled
            className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed"
          >
            Logging in...
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-[#7e81f8] text-white py-2 px-4 rounded-md hover:bg-[#5c60f5bf] cursor-pointer transition duration-200"
          >
            Login
          </button>
        )}
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
