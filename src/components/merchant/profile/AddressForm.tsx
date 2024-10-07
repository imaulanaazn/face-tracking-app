import { ICitie, IDistrict, IProvince } from "@/data-types/merchant";
import {
  editMerchantAddress,
  getCities,
  getDistricts,
  getIndonesiaLocations,
} from "@/services/api/merchant";
import { RootState } from "@/store";
import { setMerchant } from "@/store/slices/merchantSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialUserAddress = {
  province: "",
  city: "",
  district: "",
  street: "",
};

export default function AddressForm() {
  const [userAddress, setUserAddress] = useState(initialUserAddress);
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [cities, setCities] = useState<ICitie[]>([]);
  const [districs, setDistrics] = useState<IDistrict[]>([]);
  const merchant = useSelector((state: RootState) => state.merchant);
  const dispatch = useDispatch();

  async function updateMerchantAddress() {
    const toastId = toast.loading("Updating Profile");
    try {
      const data = {
        province: getProvinceName()?.name || "",
        city: getCityName()?.name || "",
        district: getDistrictName()?.name || "",
        street: userAddress.street,
      };
      const response = await editMerchantAddress(data);
      setUserAddress;
      dispatch(setMerchant({ ...merchant, ...data }));
      setUserAddress(initialUserAddress);
      toast.update(toastId, {
        type: "success",
        isLoading: false,
        render: "Successfully update profile",
        autoClose: 3000,
      });
    } catch (error: any) {
      toast.update(toastId, {
        type: "error",
        isLoading: false,
        render: error.message || "Failed to update merchant profile",
        autoClose: 3000,
      });
      console.error(error.message);
    }
  }

  function getProvinceName() {
    return provinces.find((province) => province.id === userAddress.province);
  }
  function getCityName() {
    return cities.find((city) => city.id === userAddress.city);
  }
  function getDistrictName() {
    return districs.find((district) => district.id === userAddress.district);
  }

  useEffect(() => {
    async function getLocations() {
      try {
        const response = await getIndonesiaLocations();
        setProvinces(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    getLocations();
  }, []);

  useEffect(() => {
    async function getCitiesByProvince() {
      try {
        const response = await getCities(userAddress.province);
        setCities(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    getCitiesByProvince();
  }, [userAddress.province]);

  useEffect(() => {
    async function getDistrictsByCity() {
      try {
        const response = await getDistricts(userAddress.city);
        setDistrics(response.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    getDistrictsByCity();
  }, [userAddress.city]);

  return (
    <div>
      {" "}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Merchant Address
      </h2>
      <div className="w-full mb-4 mt-6 ">
        <label
          className="block text-gray-600 text-sm shrink-0"
          htmlFor="province"
        >
          Province
        </label>
        <div className="relative w-full mt-2">
          <select
            value={userAddress.province}
            onChange={(e) => {
              setUserAddress((prev) => ({
                ...prev,
                province: e.target.value,
              }));
            }}
            id="province"
            name="province"
            className="appearance-none block w-full bg-none bg-gray-100 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-gray-600 focus:outline-none focus:ring-white focus:border-white sm:text-sm"
          >
            <option value={""}></option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
            <svg
              className="h-4 w-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <label className="block text-gray-600 text-sm shrink-0" htmlFor="city">
          Kota / Kabupaten
        </label>
        <div className="relative w-full mt-2">
          <select
            id="city"
            name="city"
            value={userAddress.city}
            onChange={(e) => {
              setUserAddress((prev) => ({
                ...prev,
                city: e.target.value,
              }));
            }}
            className="appearance-none block w-full bg-none bg-gray-100 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-gray-600 focus:outline-none focus:ring-white focus:border-white sm:text-sm"
          >
            <option value={""}></option>
            {cities.map((cities) => (
              <option key={cities.id} value={cities.id}>
                {cities.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
            <svg
              className="h-4 w-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <label
          className="block text-gray-600 text-sm shrink-0"
          htmlFor="district"
        >
          Kecamatan
        </label>
        <div className="relative w-full mt-2">
          <select
            id="district"
            name="district"
            value={userAddress.district}
            onChange={(e) => {
              setUserAddress((prev) => ({
                ...prev,
                district: e.target.value,
              }));
            }}
            className="appearance-none block w-full bg-none bg-gray-100 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-gray-600 focus:outline-none focus:ring-white focus:border-white sm:text-sm"
          >
            <option value={""}></option>
            {districs.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
            <svg
              className="h-4 w-4 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="w-full mb-4 mt-4">
          <label className="block text-gray-600 text-sm mb-2" htmlFor="street">
            Nama Jalan
          </label>
          <input
            value={userAddress.street}
            onChange={(e) => {
              setUserAddress((prev) => ({
                ...prev,
                street: e.target.value,
              }));
            }}
            id="street"
            type="text"
            className="w-full p-2 bg-white text-gray-600 border border-gray-300 rounded focus:outline-blue-600"
          />
        </div>

        <button
          onClick={updateMerchantAddress}
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
