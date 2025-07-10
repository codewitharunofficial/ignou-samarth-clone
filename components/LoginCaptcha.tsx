import React from "react";

const LoginCaptcha = () => {
  return (
    <div className="flex flex-row gap-5 m-5">
      <div className="w-full max-w-md p-2 flex flex-col items-center">
        <span className="mx-5 text-black text-sm">
          <p>Captcha Verification</p>
        </span>
        <img
          src="/captcha.png" // Replace with actual captcha image source
          alt="Captcha"
          className="w-full h-auto rounded object-scale-down p-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
        />
        <p className="mx-3 text-xs">click on the text to change</p>
      </div>
      <div className="w-full max-w-md p-2">
        <label htmlFor="captcha" className="block text-xs">
          Type the text <span className="text-red-500">*</span>
        </label>
        <input
          id="captcha"
          name="captcha"
          type="text"
          className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7e81f8] focus:border-transparent"
          placeholder="Enter Captcha"
        />
      </div>
    </div>
  );
};

export default LoginCaptcha;
