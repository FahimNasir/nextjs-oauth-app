"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          Welcome <p className="text-white"> {session.user.name}</p>
          <button
            className="text-sky-600 px-3"
            onClick={() => {
              signOut({ callbackUrl: "/", redirect: true });
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button className="text-white" onClick={() => signIn()}>
            Sign In
          </button>
          <button
            className="text-white"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default LoginButton;
