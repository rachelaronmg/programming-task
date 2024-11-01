import React from "react";

const SuccessForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Success!
        </h2>
        <p className="text-sm text-center text-gray-500">
          Your PIN has been set successfully.
        </p>
      </div>
    </div>
  );
};

export default SuccessForm;
