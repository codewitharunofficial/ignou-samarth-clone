import React from "react";

const LoginHeader = () => {
  return (
    <div className="bg-white h-9/10 rounded-md p-5 ">
      <div className="flex flex-col items-center justify-center h-[100px] gap-1">
        <div className="w-full h-full rounded-xs">
          <img
            src={
              "https://cuignou.samarth.ac.in/uploads/uims/83c301b11330ac6bd673f1b0c14cc7c6f7e82f979c6a2351b474b27013ce055a1_1577162116_83729031_logo.png"
            }
            alt="logo"
            className="w-full h-[64px] object-scale-down rounded-xs"
          />
        </div>
        <h3 className="text-black font-bold mx-[4px] text-[18px]">IGNOU</h3>
      </div>
    </div>
  );
};

export default LoginHeader;
