"use client";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  return <h1>Welcome to Dashboard</h1>;
};

export default Dashboard;
