import { IConnection } from "@/data-types/merchant";
import {
  faFloppyDisk,
  faPaperPlane,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IMessagePreviewModal {
  setShowPreview: (show: boolean) => void;
  label: string;
  message: string;
  selectedDevice: string;
  connections: IConnection[];
  setSelectedDevice: (selectedDevice: string) => void;
  selectedMembers: string[];
  handleSendMessage: () => void;
}

export default function MessagePreviewModal({
  setShowPreview,
  label,
  message,
  selectedDevice,
  setSelectedDevice,
  connections,
  selectedMembers,
  handleSendMessage,
}: IMessagePreviewModal) {
  const formatMessage = (text: string) => {
    let formatted = text;
    formatted = formatted.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"); // Bold
    formatted = formatted.replace(/_([^_]+)_/g, "<em>$1</em>"); // Italic
    formatted = formatted.replace(/~([^~]+)~/g, "<del>$1</del>"); // Strikethrough
    formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>"); // Monospace
    formatted = formatted.replace(/\n/g, "<br>"); // Line breaks
    return formatted;
  };

  return (
    <div
      className={`w-full h-[100vh] overflow-hidden bg-black/20 fixed top-0 left-0 z-50 p-6 flex items-center justify-center`}
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

        <span className="block text-gray-600 text-sm shrink-0">LabelPesan</span>
        <div className="py-2 px-4 bg-gray-200/70 rounded-md mt-2 mb-4">
          <span className="text-gray-600">{label}</span>
        </div>

        <span className="block text-gray-600 text-sm shrink-0">Pesan</span>
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
          <div className="relative w-full mt-2">
            <select
              value={selectedDevice}
              onChange={(e) => {
                setSelectedDevice(selectedDevice);
              }}
              id="device"
              name="device"
              className="appearance-none block w-full bg-none bg-gray-200/70 border border-transparent rounded-md py-2 pl-3 pr-10 text-base text-gray-600 focus:outline-none focus:ring-white focus:border-white sm:text-sm"
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
            Kirim <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
