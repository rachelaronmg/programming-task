import React from "react";
import CardFormComponent from "../components/CardFormComponent";

export interface UserProps {
  userName: string;
  date_of_birth: string;
}

const Dashboard = () => {
  const userData: UserProps = {
    userName: "John Doe",
    date_of_birth: "10/07/1997",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome, {userData.userName}!
        </h2>
        <CardFormComponent user={userData} />
      </div>
    </div>
  );
};

export default Dashboard;
