import React from "react";

const LoginForm = ({ setUsername, setPassword }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-8 bg-white">
      <div className="w-full max-w-md p-2">
        <label htmlFor="username" className="block text-sm">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e81f8] focus:border-transparent"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="w-full max-w-md p-2">
        <label htmlFor="password" className="block text-sm">
          Password <span className="text-red-500">*</span>
          <span className="float-right text-sm text-gray-500">
            <a className="text-[#5c60f5bf]" href="#forgot-password">
              Forgot Password?
            </a>
          </span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e81f8] focus:border-transparent"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LoginForm;
