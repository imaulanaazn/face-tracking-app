"use client";
import {
  faFloppyDisk,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");

  async function handleSendMessage() {
    try {
      const users = sessionStorage.getItem("users");

      if (!users?.length) {
        throw new Error("Silahkan pilih pelanggan terlebih dahulu");
      }

      const parsedUsers = JSON.parse(users);

      const bodyReq = {
        message: message,
        messageTitle: messageTitle,
        users: parsedUsers,
      };

      const response = await fetch("https://hitsomeapi.com", {
        method: "POST",
        body: JSON.stringify(bodyReq),
      });

      if (!response.ok) {
        throw new Error("gagal mengirim pesan");
      }

      toast.success("Berhasil mengirim pesan ke pelanggan");
    } catch (error) {
      toast.error("Gagal mengirim pesan ke pelanggan");
      console.error;
    }
  }

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
            onChange={(e) => {
              setMessageTitle(e.target.value);
            }}
            value={messageTitle}
            type="text"
            name="message_title"
            id="message-title"
            className="w-full focus:outline-none text-xl text-gray-700"
            placeholder="Message Title"
          />
          <hr className="my-4" />
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            name="message"
            id="message"
            className="w-full focus:outline-none text-gray-500"
            placeholder="write message"
            rows={17}
          ></textarea>

          <div className="buttons flex flex-col-reverse lg:flex-row gap-4 mt-4 justify-end">
            <button className="flex gap-2 items-center justify-center border border-solid border-blue-500 py-2 px-4 rounded-md text-blue-500 font-medium">
              Simpan Sebagai Template{" "}
              <FontAwesomeIcon icon={faFloppyDisk} className="text-sm" />
            </button>
            <button
              onClick={handleSendMessage}
              className="flex gap-2 items-center justify-center bg-blue-500 py-2 px-4 rounded-md text-white font-medium"
            >
              Kirim <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
