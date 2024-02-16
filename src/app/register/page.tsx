"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Assuming your API endpoint is '/register'
    fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailAddress: email, password, fullName: name }),
    })
      .then((response) => {
        console.log("response", response);
        const { isError, message }: any = response.body;
        if (response.ok) {
          console.log("Registration successful");
          router.push("/login");
        } else {
          setMessage("Something wen't wrong while register");
          // Handle registration failure, e.g., display error message
        }
      })
      .catch((error) => {
        console.log("error", error);
        console.error("Error registering:", error);
        alert(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-black font-semibold">Register You User</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full max-w-xs">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          id="email"
          type="email"
          autoComplete="off"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          autoComplete="off"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />{" "}
        <br />
        {message.length > 0 ? (
          <span className="text-red-500 font-semibold">{message}</span>
        ) : (
          ""
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
