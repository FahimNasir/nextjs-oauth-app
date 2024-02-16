import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";

const AppBar = () => {
  return (
    <div className="bg-gray-700 py-5">
      <div className="container mx-auto flex justify-between items-center px-5">
        <Link className="text-white font-semibold" href="/">
          Home
        </Link>
        <LoginButton />
      </div>
    </div>
  );
};

export default AppBar;
