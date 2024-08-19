import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Profile() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="w-full lg:w-5/12 xl:w-2/5">
        <div className="flex flex-col lg:flex-row items-center p-6 bg-white rounded-xl shadow-sm">
          <img
            className="w-24 h-24 rounded-full lg:rounded-lg object-cover"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <div className="lg:ml-4 mt-4 lg:mt-0">
            <h2 className="text-gray-700 text-xl font-semibold text-center lg:text-left">
              Jese Leos
            </h2>
            <p className="text-gray-600 text-sm text-center lg:text-left">
              Software Engineer
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 text-sm">
              <FontAwesomeIcon icon={faUpload} />
              Change picture
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-sm w-full">
            <h2 className="text-gray-800 text-2xl mb-6">Username</h2>
            <form>
              <div className="w-full mb-4">
                <label
                  className="block text-gray-600 text-sm mb-2"
                  htmlFor="new-password"
                >
                  Nama Depan
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="w-full p-2 bg-white text-white border border-gray-600 rounded"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm mb-2"
                  htmlFor="confirm-password"
                >
                  Nama Belakang
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full p-2 bg-white text-white border border-gray-600 rounded"
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

          <div className="bg-white p-6 rounded-xl shadow-sm w-full">
            <h2 className="text-gray-800 text-2xl mb-6">Email</h2>
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
                  className="w-full p-2 bg-white text-white border border-gray-600 rounded"
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
                  className="w-full p-2 bg-white text-white border border-gray-600 rounded"
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
        </div>
      </div>
      <div className="w-full lg:w-7/12 xl:w-3/5">
        <div className="bg-white p-6 rounded-xl shadow-sm w-full">
          <h2 className="text-gray-800 text-2xl mb-6">Password</h2>
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
                  className="w-full p-2 bg-white text-white border border-gray-600 rounded"
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
                  className="w-full p-2 bg-white text-white border border-gray-600 rounded"
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
                className="w-full p-2 bg-white text-white border border-gray-600 rounded"
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
      </div>
    </div>
  );
}
