"use client";
import MessagePreviewModal from "@/components/merchant/send-message/compose-message/MessagePreviewModal";
import { IConnection } from "@/data-types/merchant";
import { getMerchantConnections, sendMessage } from "@/services/api/merchant";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const [label, setLabel] = useState("");
  const [name, setName] = useState("John Doe");
  const [showPreview, setShowPreview] = useState(false);
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const router = useRouter();

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
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
      toast.error(error.message);
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
    setLabel("");
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

        <div className={`${showPreview ? "flex" : "hidden"} `}>
          <MessagePreviewModal
            setShowPreview={(show: boolean) => {
              setShowPreview(show);
            }}
            label={label}
            message={message}
            selectedDevice={selectedDevice}
            connections={connections}
            setSelectedDevice={(selectedDevice: string) => {
              setSelectedDevice(selectedDevice);
            }}
            selectedMembers={selectedMembers}
            handleSendMessage={() => {
              handleSendMessage();
            }}
          />
        </div>
      </div>
    </div>
  );
}
