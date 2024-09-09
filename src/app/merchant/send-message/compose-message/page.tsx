"use client";
import { IConnection } from "@/data-types/merchant";
import { getMerchantConnections, sendMessage } from "@/services/api/merchant";
import {
  faEye,
  faFloppyDisk,
  faPaperPlane,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";

const data = [
  {
    id: "1",
    title: "Welcome",
    message:
      "Thank you for visiting our platform. We are committed to providing you with the best experience possible. Ourr.",
  },
  {
    id: "2",
    title: "Reminder",
    message:
      "This is just a friendly reminder to check out our latest offers and deals! Our current promotions include discounts on",
  },
  {
    id: "3",
    title: "Update",
    message:
      "We are excited to announce that our app has been updated with several new features designed to enhance your experience. From ",
  },
  {
    id: "4",
    title: "Alert",
    message:
      "Your account password is set to expire in the next 10 days. To ensure uninterrupted access to your account, please update your secure.",
  },
  {
    id: "5",
    title: "Promotion",
    message:
      "We’re thrilled to offer you a special 20% discount on your next purchase! Whether you’re looking to upgrade your current setup or try .",
  },
  {
    id: "6",
    title: "Survey",
    message:
      "Your opinion matters to us! We would greatly appreciate it if you could take a few minutes to complete our.",
  },
];

export default function ComposeMessage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [message, setMessage] = useState("");
  const [label, setLabel] = useState("Label pesan");
  const [name, setName] = useState("John Doe");
  const [showPreview, setShowPreview] = useState(false);
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const router = useRouter();

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  // Function to replace markdown-like syntax and line breaks with corresponding HTML
  const formatMessage = (text: string) => {
    let formatted = text.replace(/{{name}}/g, name); // Replace {{name}} placeholder
    formatted = formatted.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"); // Bold
    formatted = formatted.replace(/_([^_]+)_/g, "<em>$1</em>"); // Italic
    formatted = formatted.replace(/~([^~]+)~/g, "<del>$1</del>"); // Strikethrough
    formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>"); // Monospace
    formatted = formatted.replace(/\n/g, "<br>"); // Line breaks
    return formatted;
  };

  async function fetchMerchantConnections() {
    try {
      const response = await getMerchantConnections();
      setConnections(response.data);
      if (response.data.length) {
        setSelectedDevice(response.data[0].id);
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Gagal mengambil data connections" + error.message);
    }
  }

  async function handleSendMessage() {
    if (!dataValidation()) {
      return;
    }

    try {
      const data = {
        connectionId: selectedDevice,
        memberIds: selectedMembers,
        message,
        name: label,
      };

      const response = await sendMessage(data);
      toast.success("Berhasil mengirim pesan ke pelanggan");
      clearForm();
      router.push("/merchant/send-message");
    } catch (error: any) {
      toast.error("Gagal mengirim pesan ke pelanggan " + error.message);
      console.error;
    }
  }

  function dataValidation() {
    if (!selectedDevice) {
      toast.error("Silahkan pilih perangkat terlebih dahulu");
      return false;
    }
    if (!message || message.trim() === "") {
      toast.error("Pesan tidak boleh kosong");
      return false;
    }
    if (!sessionStorage.getItem("members")) {
      toast.error("Silahkan pilih pelanggan terlebih dahulu");
      return false;
    }

    return true; // If all validations pass
  }

  function clearForm() {
    setMessage("");
    setLabel("Tulis label pesan");
    setShowPreview(false);
    if (connections.length) {
      setSelectedDevice(connections[0].id);
    }
    sessionStorage.removeItem("members");
  }

  useEffect(() => {
    fetchMerchantConnections();
  }, []);

  useEffect(() => {
    const users = sessionStorage.getItem("members");

    if (users?.length) {
      const parsedUsers: string[] = JSON.parse(users);
      setSelectedMembers(parsedUsers);
    }
  }, []);

  return (
    <div className="container p-6 md:p-8">
      <div className="wrapper flex flex-col lg:flex-row lg:gap-8 md:gap-6 gap-4">
        <div
          className="templates w-full lg:w-2/6 lg:h-[80vh] h-max overflow-y-auto overflow-x-auto flex flex-row lg:flex-col gap-4 md:gap-6"
          id="message-templates"
        >
          <div
            onClick={() => {
              setSelectedTemplate("");
            }}
            className={`min-w-80 p-6 rounded rounded-lg shadow-sm border-2 border-solid border-transparent hover:border-blue-500 hover:cursor-pointer mr-1 lg:mr-0 h-auto ${
              !selectedTemplate ? "bg-blue-500" : "bg-white"
            }`}
          >
            <h3
              className={`text-base font-semibold mb-4 ${
                !selectedTemplate ? "text-white" : "text-gray-600"
              }`}
            >
              Custom Message
            </h3>
            <p
              className={`text-sm ${
                !selectedTemplate ? "text-white" : "text-gray-500"
              } font-light`}
            >
              Buat pesanmu sendiri se kreativ mungkin agar menarik lebih banyak
              pelanggan
            </p>
          </div>
          {data.map((message) => (
            <div
              onClick={() => {
                setSelectedTemplate(message.id);
              }}
              key={message.title}
              className={`min-w-80 p-6 rounded rounded-lg shadow-sm border-2 border-solid border-transparent hover:border-blue-500 hover:cursor-pointer mr-1 lg:mr-0 h-auto ${
                message.id === selectedTemplate ? "bg-blue-500" : "bg-white"
              }`}
            >
              <div className="flex justify-between">
                <h3
                  className={`text-base font-semibold mb-4 ${
                    message.id === selectedTemplate
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {message.title}
                </h3>
                <div className="relative">
                  <div
                    onClick={() => {}}
                    className="cursor-pointer"
                    data-tooltip-id="tooltip-delete"
                    data-tooltip-content="Hapus Template"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={`hover:text-red-600 ${
                        message.id === selectedTemplate
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    />
                  </div>
                  <ReactTooltip
                    id="tooltip-delete"
                    style={{
                      fontSize: "12px",
                      padding: "10px",
                    }}
                  />
                </div>
              </div>
              <p
                className={`text-sm ${
                  message.id === selectedTemplate
                    ? "text-white"
                    : "text-gray-500"
                } font-light`}
              >
                {message.message}
              </p>
            </div>
          ))}
        </div>

        <div className="message w-full lg:w-4/6 bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8">
          <input
            type="text"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
            className="py-2  w-full focus:outline-none placeholder:text-xl placeholder:font-medium text-xl font-semibold text-gray-600"
            placeholder="Tulis label pesan"
          />

          <hr className="my-4" />

          <textarea
            placeholder="Type your message here, use *bold*, _italic_, ~strikethrough~, `monospace`, and line breaks."
            value={message}
            onChange={handleMessageChange}
            name="message"
            id="message"
            className="w-full max-h-96 md:max-h-[90vh] lg:max-h-[50vh] xl:max-h-[55vh] focus:outline-none text-gray-500"
            rows={20}
          ></textarea>

          <div className="buttons flex flex-col md:flex-row gap-4 mt-4 justify-between">
            <button
              onClick={() => {
                setShowPreview(true);
              }}
              className="flex gap-2 items-center justify-center border border-solid border-blue-500 py-2 px-4 rounded-md text-blue-500 font-medium"
            >
              Pratinjau Pesan{" "}
              <FontAwesomeIcon icon={faEye} className="text-sm" />
            </button>
          </div>
        </div>

        <div
          className={`w-full h-[100vh] overflow-hidden bg-black/20 fixed top-0 left-0 z-50 p-6 ${
            showPreview ? "flex" : "hidden"
          } items-center justify-center`}
        >
          <div className="w-full md:w-3/4 lg:w-2/4 xl:w-2/5 min-h-96 max-h-[80vh] md:max-h-[70vh] lg:max-h-[80vh] p-6 md:p-8 border rounded-xl bg-gray-50 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Pratinjau pesan
              </h2>
              <button
                onClick={() => {
                  setShowPreview(false);
                }}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all group"
              >
                <FontAwesomeIcon
                  icon={faX}
                  className="text-gray-600 text-sm font-bold group-hover:text-white transition-all"
                />
              </button>
            </div>
            <hr className="my-4" />

            <span className="block text-gray-600 text-sm shrink-0">Pesan</span>
            <div className="py-2 px-4 bg-gray-200 rounded-md mt-2 mb-4">
              <span className="text-gray-600">{label}</span>
            </div>

            <span className="block text-gray-600 text-sm shrink-0">Pesan</span>
            <div className="p-4 bg-gray-200 min-h-28 rounded-lg mt-2">
              <div
                className="whitespace-pre-wrap text-gray-600"
                dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
              />
            </div>

            <div className="w-full my-4">
              <label
                className="block text-gray-600 text-sm shrink-0"
                htmlFor="device"
              >
                Device
              </label>
              <div className="relative w-full mt-2">
                <select
                  value={selectedDevice}
                  onChange={(e) => {
                    setSelectedDevice(selectedDevice);
                  }}
                  id="device"
                  name="device"
                  className="appearance-none block w-full bg-none bg-gray-200 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-gray-600 focus:outline-none focus:ring-white focus:border-white sm:text-sm"
                >
                  {connections.map((connection) => (
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
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <span className="text-sm text-blue-600">
              * pesan akan dikirim kepada {selectedMembers.length} Pelanggan
            </span>

            <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-6">
              <button className="w-full md:w-max flex gap-2 items-center justify-center border border-solid border-blue-500 py-2 px-4 rounded-md text-blue-500 font-medium">
                Simpan Sebagai Template{" "}
                <FontAwesomeIcon icon={faFloppyDisk} className="text-sm" />
              </button>
              <button
                onClick={handleSendMessage}
                className="w-full md:w-max flex gap-2 items-center justify-center bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-md text-white font-medium"
              >
                Kirim{" "}
                <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
