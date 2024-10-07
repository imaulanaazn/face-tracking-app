import { changeMerchantName } from "@/services/api/merchant";
import React, { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

export default function UsernameForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChangeUsername = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = { firstName, lastName };
      const response = await changeMerchantName(data);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Username</h2>
      <form onSubmit={handleChangeUsername}>
        <div className="w-full mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="firstname"
          >
            Nama Depan
          </label>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            id="firstname"
            type="text"
            className="w-full p-2 bg-white text-gray-600 border border-gray-300 rounded focus:outline-blue-600"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="lastname"
          >
            Nama Belakang
          </label>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            id="lastname"
            type="text"
            className="w-full p-2 bg-white text-gray-600 border border-gray-300 rounded focus:outline-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
