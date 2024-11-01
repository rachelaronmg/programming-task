import React from "react";

import { NextPage } from "next";
import { useState } from "react";
import SuccessForm from "./SuccessComponent";
import { UserProps } from "../pages/dashboard";

interface FormProps {
  user: UserProps;
}

const CardFormComponent: NextPage<FormProps> = ({ user }) => {
  const [errors, setErrors] = useState({
    pin: "",
    confirmPin: "",
  });

  const [formData, setFormData] = useState({ pin: "", confirmPin: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let error = "";

    if (name === "pin") {
      // Validation for PIN
      // 1. MUST BE 4 DIGITS
      if (!/^\d{4}$/.test(value)) {
        error = "PIN must be 4 digits";
      } else {
        const [day, month, year] = user.date_of_birth.split("/");

        // 2. CAN'T BE THE YEAR OF BIRTH
        if (value === year) {
          error = "PIN can't be the year of birth";
        }

        // 3. CAN'T BE THE DATE OF BIRTH (day and month)
        if (value === day + month) {
          error = "PIN can't be the date of birth";
        }

        // 4. cant be an easy pin
        const easyPins = [
          "1111",
          "1234",
          "0000",
          "2222",
          "3333",
          "4444",
          "5555",
          "6666",
          "7777",
          "8888",
          "9999",
        ];
        if (easyPins.includes(value)) {
          error = "PIN is too easy to guess";
        }
      }
    }

    if (name === "confirmPin" && value !== formData.pin) {
      error = "PIN and Confirm PIN must match";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if PIN is empty
    if (formData.pin === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pin: "PIN is required",
      }));
      return;
    }

    // Check if there are any errors
    if (errors.pin || errors.confirmPin) {
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <SuccessForm />;
  }

  const handleCancel = () => {
    setFormData({ pin: "", confirmPin: "" });
    setErrors({ pin: "", confirmPin: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <form
        className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-left text-gray-800">
          Set your 4-digit card PIN
        </h2>
        <p className="text-sm text-left text-gray-500">
          Your PIN must be hard to guess and can&apos;t represent your date of
          birth. If it is easy to guess, you may be liable for unauthorised
          transactions.
        </p>

        <div>
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700"
          >
            New PIN
          </label>

          <input
            type="password"
            name="pin"
            id="pin"
            value={formData.pin}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border-b  border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.pin && (
            <p className="mt-1 text-sm text-red-500">{errors.pin}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPin"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm PIN
          </label>
          <input
            type="password"
            name="confirmPin"
            id="confirmPin"
            value={formData.confirmPin}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border-b border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.confirmPin && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPin}</p>
          )}
        </div>

        <div className="flex justify-between ">
          <button
            type="button"
            className="w-1/5 py-2 mr-2 rounded-md  "
            style={{
              color: "#1f69b3",
            }}
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!!errors.pin}
            className={`w-1/5 py-2 text-white rounded-md  ${
              errors.pin ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: errors.pin ? "#1f69b3" : "#1f69b3",
              cursor: errors.pin ? "not-allowed" : "pointer",
            }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardFormComponent;
