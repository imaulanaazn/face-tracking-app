import React from "react";

export default function EmailForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Email</h2>
      <form>
        <div className="w-full mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="new-password"
          >
            Email Baru
          </label>
          <input
            id="new-password"
            type="password"
            className="w-full p-2 bg-white text-white border border-gray-300 rounded focus:outline-blue-600"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="confirm-password"
          >
            Masukkan Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="w-full p-2 bg-white text-white border border-gray-300 rounded focus:outline-blue-600"
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
