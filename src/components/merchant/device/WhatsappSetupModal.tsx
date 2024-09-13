import { IWhatsappStatus } from "@/data-types/merchant";
import { WhatsAppConnectionStatus } from "@/enum";
import { faSpinner, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

const WhatsappSetupModal = ({
  whatsappStatuses,
  closeModal,
  onSuccess,
  connectionId,
}: {
  whatsappStatuses: IWhatsappStatus[];
  closeModal: () => void;
  onSuccess: () => void;
  connectionId: string;
}) => {
  const whatsappStatus = whatsappStatuses.find(
    (status) => status.id === connectionId
  );

  if (whatsappStatus) {
    if (whatsappStatus.status === WhatsAppConnectionStatus.READY) {
      toast.success("Sukses menghubungkan whatsapp");
      onSuccess();
    }
    if (whatsappStatus.status === WhatsAppConnectionStatus.ERROR) {
      toast.error("Gagal menghubungkan whatsapp");
    }
  }

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 p-24 w-max h-max rounded-xl relative">
        {/* Left Section - Instructions */}
        <div className="max-w-lg space-y-4 mb-6 md:mb-0 md:mr-8">
          <h1 className="text-xl font-medium mb-6 text-gray-700">
            To set up WhatsApp on your computer
          </h1>
          <ol className="space-y-6 text-lg">
            <li className="text-gray-600 text-base">
              1. Open WhatsApp on your phone
            </li>
            <li className="text-gray-600 text-base">
              2. Tap <strong>Menu</strong> on Android, or{" "}
              <strong>Settings</strong> on iPhone
            </li>
            <li className="text-gray-600 text-base">
              3. Tap <strong>Linked devices</strong> and then{" "}
              <strong>Link a device</strong>
            </li>
            <li className="text-gray-600 text-base">
              4. Point your phone at this screen to capture the QR code
            </li>
          </ol>
        </div>

        {/* Right Section - QR Code */}
        <div className="flex items-center justify-center">
          {whatsappStatus && whatsappStatus.qr ? (
            <QRCode
              size={200}
              value={whatsappStatus.qr}
              viewBox={`0 0 256 256`}
            />
          ) : (
            <div className="h-full w-full lg:w-[200px] flex flex-col items-center gap-2 justify-center">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="xl"
                className="animate-spin mb-2"
              />
              <p>
                {whatsappStatus?.status ===
                WhatsAppConnectionStatus.DISCONNECTED
                  ? "Generating QR"
                  : whatsappStatus?.status || "Generating QR"}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={closeModal}
          className="absolute top-8 right-8 bg-blue-600 h-7 w-7 hover:bg-blue-500 text-white rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faX} className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default WhatsappSetupModal;
