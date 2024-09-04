import { changeEmail } from "@/services/api/merchant";
import React, { SyntheticEvent, useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChangeEmail = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = { email };
      const response = await changeEmail(data);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Email</h2>
      <form onSubmit={handleChangeEmail}>
        {/* <div className="mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="old-mail"
          >
            Email Lama
          </label>
          <input
            id="old-mail"
            type="email"
            disabled
            className="w-full p-2 bg-gray-100 text-gray-600 border border-gray-300 rounded focus:outline-blue-600"
          />
        </div> */}

        <div className="w-full mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="new-email"
          >
            Email Baru
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="new-email"
            type="email"
            className="w-full p-2 bg-white text-gray-600 border border-gray-300 rounded focus:outline-blue-600"
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className={`w-full ${
            disabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded`}
        >
          Save
        </button>
      </form>
    </div>
  );
}
