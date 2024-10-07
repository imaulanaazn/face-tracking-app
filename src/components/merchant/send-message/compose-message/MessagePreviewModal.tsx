import { IConnection, IMessageThemeCount } from "@/data-types/merchant";
import { getMerchantConnections } from "@/services/api/merchantConnections";
import {
  getThemeMessageCount,
  sendMessage,
} from "@/services/api/merchantMessage";

import { faPaperPlane, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IMessagePreviewModal {
  closePreview: () => void;
  label: string;
  message: string;
  handleClearMessage: () => void;
}

export default function MessagePreviewModal({
  closePreview,
  label,
  message,
  handleClearMessage,
}: IMessagePreviewModal) {
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [messageThemes, setMessageTheme] = useState<IMessageThemeCount[]>([]);
  const [selectedMessageTheme, setSelectedMessageTheme] = useState("");
  const router = useRouter();

  const formatMessage = (text: string) => {
    let formatted = text;
    formatted = formatted.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"); // Bold
    formatted = formatted.replace(/_([^_]+)_/g, "<em>$1</em>"); // Italic
    formatted = formatted.replace(/~([^~]+)~/g, "<del>$1</del>"); // Strikethrough
    formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>"); // Monospace
    formatted = formatted.replace(/\n/g, "<br>"); // Line breaks
    return formatted;
  };

  function clearForm() {
    handleClearMessage();
    closePreview();
    if (connections.length) {
      setSelectedDevice(connections[0].id);
    }
    localStorage.removeItem("members");
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
        themeMessageId: selectedMessageTheme,
      };

      const response = await sendMessage(data);
      toast.success("Successfully sent message");
      clearForm();
      router.push("/merchant/send-message");
    } catch (error: any) {
      toast.error(error.message);
      console.error;
    }
  }

  useEffect(() => {
    async function fetchMessageThemes(connectionId: string) {
      try {
        const response = await getThemeMessageCount(connectionId);
        setMessageTheme(response.data);
        if (response.data.length) {
          setSelectedMessageTheme(response.data[0].themeMessageId);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }

    if (selectedDevice) {
      fetchMessageThemes(selectedDevice);
    }
  }, [selectedDevice]);

  function dataValidation() {
    if (!selectedDevice) {
      toast.error("Silahkan pilih perangkat terlebih dahulu");
      return false;
    }
    if (!message || message.trim() === "") {
      toast.error("Pesan tidak boleh kosong");
      return false;
    }
    if (!selectedMessageTheme) {
      toast.error("Please choose message theme");
      return false;
    }
    if (!localStorage.getItem("members")) {
      toast.error("Silahkan pilih pelanggan terlebih dahulu");
      return false;
    }

    return true;
  }

  useEffect(() => {
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

    fetchMerchantConnections();
  }, []);

  useEffect(() => {
    const users = localStorage.getItem("members");

    if (users?.length) {
      const parsedUsers: string[] = JSON.parse(users);
      setSelectedMembers(parsedUsers);
    }
  }, []);

  return (
    <div
      className={`w-full h-[100vh] overflow-hidden bg-black/20 fixed top-0 left-0 z-50 p-6 flex items-center justify-center`}
    >
      <div className="w-full md:w-3/4 lg:w-2/4 xl:w-2/5 min-h-96 max-h-[80vh] md:max-h-[70vh] lg:max-h-[80vh] p-6 md:p-8 border rounded-xl bg-gray-50 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Message Preview
          </h2>
          <button
            onClick={closePreview}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-blue-600 flex items-center justify-center transition-all group"
          >
            <FontAwesomeIcon
              icon={faX}
              className="text-gray-600 text-sm font-bold group-hover:text-white transition-all"
            />
          </button>
        </div>
        <hr className="my-4" />

        <span className="block text-gray-600 text-sm shrink-0">
          Message Label
        </span>
        <div className="py-2 px-4 bg-gray-200/70 rounded-md mt-2 mb-4">
          <span className="text-gray-600">{label}</span>
        </div>

        <span className="block text-gray-600 text-sm shrink-0">Message</span>
        <div className="p-4 bg-gray-200/70 min-h-28 rounded-lg mt-2">
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
          {connections.length && (
            <div className="relative w-full mt-2">
              <select
                value={selectedDevice}
                onChange={(e) => {
                  setSelectedDevice(e.target.value);
                }}
                id="device"
                name="device"
                className="appearance-none block w-full bg-none border border-solid border-gray-400 outline-none rounded-md py-2 pl-3 pr-10 text-base text-gray-600 sm:text-sm"
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
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="w-full my-4">
          <label
            className="block text-gray-600 text-sm shrink-0"
            htmlFor="device"
          >
            Choose Message Type
          </label>
          {messageThemes.length && (
            <div className="mt-2 flex flex-col gap-4">
              {messageThemes.map((theme) => (
                <div
                  onClick={() => {
                    setSelectedMessageTheme(theme.themeMessageId);
                  }}
                  key={theme.themeMessageId}
                  className={`text-sm p-4 rounded-lg text-gray-600 hover:cursor-pointer transition-all ${
                    theme.themeMessageId === selectedMessageTheme
                      ? "border border-gray-400"
                      : "bg-gray-200"
                  }`}
                >
                  <p className="font-semibold text-gray-700">
                    {theme.themeMessageName}
                  </p>
                  <div
                    className={`flex justify-between items-center mt-1 ${
                      theme.maxMessage < selectedMembers.length &&
                      theme.themeMessageId === selectedMessageTheme
                        ? "text-rose-600"
                        : ""
                    }`}
                  >
                    <span>Max Message</span>
                    <span>{theme.maxMessage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Sent</span>
                    <span>{theme.totalSent}</span>
                  </div>
                  <div
                    className={`flex justify-between items-center mt-1 ${
                      theme.remainingMessage < selectedMembers.length &&
                      theme.themeMessageId === selectedMessageTheme
                        ? "text-rose-600"
                        : ""
                    }`}
                  >
                    <span>Remaining Message</span>
                    <span>{theme.remainingMessage}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-6">
          <span className="text-sm text-blue-600">
            * Message will be send to {selectedMembers.length} members
          </span>
          <button
            onClick={handleSendMessage}
            className="w-full md:w-max flex gap-2 items-center justify-center bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-md text-white font-medium"
          >
            Send <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
