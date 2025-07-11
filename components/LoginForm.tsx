import React, { useState } from "react";

const LoginForm = ({ setUsername, setPassword }) => {
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameValue, updateUsernameValue] = useState("");
  const [passwordValue, updatePasswordValue] = useState("");

  const showUsernameError = usernameTouched && usernameValue.trim() === "";
  const showPasswordError = passwordTouched && passwordValue.trim() === "";

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 bg-white">
      <div className="w-full max-w-md p-2">
        <label htmlFor="username" className="block text-sm">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className={`mt-1 block w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e81f8] ${
            showUsernameError
              ? "border border-red-500"
              : "border border-gray-200 focus:border-transparent"
          }`}
          placeholder="Username"
          value={usernameValue}
          onChange={(e) => {
            updateUsernameValue(e.target.value);
            setUsername(e.target.value);
          }}
          onBlur={() => setUsernameTouched(true)}
        />
        {showUsernameError && (
          <p className="text-red-500 text-sm mt-1">Username cannot be blank.</p>
        )}
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
          className={`mt-1 block w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e81f8] ${
            showPasswordError
              ? "border border-red-500"
              : "border border-gray-200 focus:border-transparent"
          }`}
          placeholder="Password"
          value={passwordValue}
          onChange={(e) => {
            updatePasswordValue(e.target.value);
            setPassword(e.target.value);
          }}
          onBlur={() => setPasswordTouched(true)}
        />
        {showPasswordError && (
          <p className="text-red-500 text-sm mt-1">Password cannot be blank.</p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
