"use client";
import { IConnectionType, IWhatsappConnection } from "@/data-types/merchant";
import {
  createConnection,
  getAvailableWhatsapp,
  getListConnectionType,
} from "@/services/api/merchantConnections";
import { faComputer, faPhone, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const AddDeviceModal = ({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [connectionName, setConnectionName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedWhatsappId, setSelectedWhatsappId] = useState("");
  const [connectionType, setConnectionType] = useState<IConnectionType>({
    id: "",
    name: "",
    cd: "",
  });
  const [connectionTypes, setConnectionTypes] = useState<IConnectionType[]>([]);
  const [availableWhatsapp, setAvailableWhatsapp] = useState<
    IWhatsappConnection[]
  >([]);

  useEffect(() => {
    async function fetchConnectionTypes() {
      try {
        const response = await getListConnectionType();
        setConnectionTypes(response.data);
        setConnectionType(response.data[0]);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchConnectionTypes();
  }, []);

  useEffect(() => {
    async function fetchAvailableWhatsapp() {
      try {
        const response = await getAvailableWhatsapp();
        setAvailableWhatsapp(response.data);
        if (response.data.length) {
          setSelectedWhatsappId(response.data[0].id);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }

    if (connectionType.cd === "internal") {
      fetchAvailableWhatsapp();
    }
  }, [connectionType.cd]);

  function handleSetConnectionType(id: string) {
    const tempConnection = connectionTypes.find((type) => type.id === id);
    if (tempConnection) {
      setConnectionType({ ...tempConnection });
    }
  }

  async function handleCreateConnection(e: any) {
    e.preventDefault();
    const data = {
      connectionName,
      connectionTypeId: connectionType.id,
      connectionId: selectedWhatsappId,
      mobileNumber,
    };

    try {
      const response = await createConnection(data);
      toast.success(response.message);
      clearForm();
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error.message);
      toast.error("Gagal membuat koneksi whatsapp" + error.message);
    }
  }

  function clearForm() {
    setConnectionName("");
    setMobileNumber("");
    setSelectedWhatsappId("");
    setConnectionType(connectionTypes[0]);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Device</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        {/* Form Fields */}
        <form
          action=""
          onSubmit={(e) => {
            toast.promise(handleCreateConnection(e), {
              pending: "Sedang membuat koneksi",
            });
          }}
        >
          <div className="space-y-4">
            {/* Device Name */}
            <div>
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="connection-name"
              >
                Nama Koneksi
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faComputer}
                    className="text-gray-500"
                  />
                </div>
                <input
                  id="connection-name"
                  type="text"
                  required
                  className="w-full p-2 pl-10 bg-white  border border-gray-300 rounded focus:outline-blue-600"
                  value={connectionName}
                  onChange={(e) => setConnectionName(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full mb-4">
              <label
                className="block text-gray-600 text-sm shrink-0"
                htmlFor="connection"
              >
                Tipe Koneksi
              </label>
              <div className="relative w-full mt-2">
                <select
                  id="connection"
                  name="connection"
                  required
                  value={connectionType.id}
                  onChange={(e) => {
                    handleSetConnectionType(e.target.value);
                  }}
                  className="appearance-none block w-full bg-none bg-gray-100 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-gray-600 focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                >
                  {connectionTypes.map((connection) => (
                    <option key={connection.id} value={connection.id}>
                      {connection.name}
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

            {/* Device Number */}
            {connectionType.cd === "external" ? (
              <div>
                <label
                  className="block text-gray-600 text-sm mb-2"
                  htmlFor="whatsapp-number"
                >
                  Nomor Whatsapp-mu
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
                  </div>
                  <input
                    id="whatsapp-number"
                    type="number"
                    required={connectionType.cd === "external"}
                    className="w-full p-2 pl-10 bg-white  border border-gray-300 rounded focus:outline-blue-600"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="+6281234456789"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full mb-4">
                <label
                  className="block text-gray-600 text-sm shrink-0"
                  htmlFor="available-whatsapp"
                >
                  Pilih Nomor Whatsapp
                </label>
                <div className="relative w-full mt-2">
                  <select
                    required={connectionType.cd === "internal"}
                    id="available-whatsapp"
                    name="available-whatsapp"
                    value={selectedWhatsappId}
                    onChange={(e) => {
                      setSelectedWhatsappId(e.target.value);
                    }}
                    className="appearance-none block w-full bg-none bg-gray-100 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-gray-600 focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                  >
                    {availableWhatsapp.map((whatsapp) => (
                      <option key={whatsapp.id} value={whatsapp.id}>
                        {whatsapp.mobileNumber}
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
            )}
          </div>

          {/* Add Device Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md flex items-center justify-center"
            >
              <span className="mr-2">+</span> Add Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;
