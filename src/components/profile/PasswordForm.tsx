import React from "react";

export default function PasswordForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Password</h2>
      <form>
        <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
          <div className="w-full">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="current-password"
            >
              Password saat ini
            </label>
            <input
              id="current-password"
              type="password"
              className="w-full p-2 bg-white text-white border border-gray-300 rounded focus:outline-blue-600"
            />
          </div>
          <div className="w-full">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="new-password"
            >
              Password baru
            </label>
            <input
              id="new-password"
              type="password"
              className="w-full p-2 bg-white text-white border border-gray-300 rounded focus:outline-blue-600"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm mb-2"
            htmlFor="confirm-password"
          >
            Konfirmasi Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="w-full p-2 bg-white text-white border border-gray-300 rounded focus:outline-blue-600"
          />
        </div>
        <div className="mb-6 text-gray-600 text-sm">
          <p>Ketentuan Password:</p>
          <ul className="list-disc list-inside ml-4">
            <li>minimal 10 karakter </li>
            <li>minimal memiliki 1 huruf kecil</li>
          </ul>
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
