"use client";
import MessagePreviewModal from "@/components/merchant/send-message/compose-message/MessagePreviewModal";
import {
  faArrowRight,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";

const data: any[] = [
  // {
  //   id: "1",
  //   title: "Welcome",
  //   message:
  //     "Thank you for visiting our platform. We are committed to providing you with the best experience possible. Ourr.",
  // },
  // {
  //   id: "2",
  //   title: "Reminder",
  //   message:
  //     "This is just a friendly reminder to check out our latest offers and deals! Our current promotions include discounts on",
  // },
  // {
  //   id: "3",
  //   title: "Update",
  //   message:
  //     "We are excited to announce that our app has been updated with several new features designed to enhance your experience. From ",
  // },
];

export default function ComposeMessage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [message, setMessage] = useState("");
  const [label, setLabel] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  function handleClearMessage() {
    setMessage("");
    setLabel("");
  }

  function handleTogglePreview(visible: boolean) {
    if (!visible) {
      setShowPreview(false);
      return;
    }

    if (label && message) {
      setShowPreview(true);
    } else {
      toast.error("Label and message should not be empty");
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
              Create your own message to engage your members
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
            placeholder="Write message label"
          />

          <hr className="my-4" />

          <textarea
            placeholder="Type your message here, use *bold*, _italic_, ~strikethrough~, `monospace`, and line breaks."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            name="message"
            id="message"
            className="w-full max-h-96 md:max-h-[90vh] lg:max-h-[50vh] xl:max-h-[55vh] focus:outline-none text-gray-500"
            rows={20}
          ></textarea>

          <div className="buttons flex flex-col md:flex-row gap-4 mt-4 justify-end">
            {/* <button className="w-full md:w-max flex gap-2 items-center justify-center border border-solid border-blue-500 py-2 px-4 rounded-md text-blue-500 font-medium">
              Save as template{" "}
              <FontAwesomeIcon icon={faFloppyDisk} className="text-sm" />
            </button> */}
            <button
              onClick={() => {
                handleTogglePreview(true);
              }}
              className="flex gap-2 items-center justify-center border border-solid bg-blue-600 py-2 px-4 rounded-md text-white font-medium"
            >
              Next Step
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </button>
          </div>
        </div>

        <div className={`${showPreview ? "flex" : "hidden"} `}>
          <MessagePreviewModal
            closePreview={() => {
              handleTogglePreview(false);
            }}
            label={label}
            message={message}
            handleClearMessage={handleClearMessage}
          />
        </div>
      </div>
    </div>
  );
}
