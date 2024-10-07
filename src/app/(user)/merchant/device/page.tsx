"use client";
import React, { ReactElement, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

import {
  faLink,
  faLinkSlash,
  faPhone,
  faPlus,
  faSpinner,
  faUser,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "swiper/css";
import AddDeviceModal from "@/components/merchant/device/AddDeviceModal";
import Summary from "@/components/merchant/device/Summary";
import { toast } from "react-toastify";
import {
  IConnection,
  IMessageThemeCount,
  IWhatsappStatus,
} from "@/data-types/merchant";
import { WhatsAppConnectionStatus } from "@/enum";
import WhatsappSetupModal from "@/components/merchant/device/WhatsappSetupModal";
import { getThemeMessageCount } from "@/services/api/merchantMessage";
import {
  connectWhatsapp,
  deleteWhatsappConnection,
  getMerchantConnections,
} from "@/services/api/merchantConnections";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "";
let socket: Socket;

interface IConnectionWithMessageTheme extends IConnection {
  messageTheme?: IMessageThemeCount[];
}

export default function Device() {
  const [addDeviceModalOpen, setAddDeviceModalOpen] = useState(false);
  const [connectWaModalOpen, setConnectWaModalOpen] = useState({
    isOpen: false,
    connectId: "",
  });
  const [connections, setConnections] = useState<IConnectionWithMessageTheme[]>(
    []
  );
  const [whatsappStatus, setWhatsappStatus] = useState<IWhatsappStatus[]>([]);

  useEffect(() => {
    async function fetchMessageThemes(connectionId: string) {
      try {
        const response = await getThemeMessageCount(connectionId);
        const tempConnections = connections.map((connection) =>
          connection.id === connection.id
            ? { ...connection, messageTheme: response.data || [] }
            : connection
        );
        setConnections(tempConnections);
      } catch (error: any) {
        toast.error(error.message);
        console.error(error.message);
      }
    }

    connections.forEach((connection) => fetchMessageThemes(connection.id));
  }, [connections.length]);

  useEffect(() => {
    async function fetchMerchantConnections() {
      try {
        const response = await getMerchantConnections();
        setConnections(response.data);
      } catch (error: any) {
        console.error(error.message);
        toast.error(error.message);
      }
    }

    fetchMerchantConnections();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("usrAccToken");
    if (accessToken) {
      const token = JSON.parse(accessToken);
      socket = io(SOCKET_URL, {
        query: { token: token.token },
      });

      socket.on("whatsappStatus", (status) => {
        const tempWhatsappStatus = whatsappStatus.filter(
          (oldStatus) => oldStatus.id !== status.id
        );
        setWhatsappStatus([...tempWhatsappStatus, status]);
        updateConnectionStatus(status, connections);
      });
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [connections, whatsappStatus]);

  function updateConnectionStatus(
    status: IWhatsappStatus,
    connections: IConnection[]
  ) {
    const tempConnections = connections.map((connection) =>
      connection.id === status.id
        ? { ...connection, status: status.status }
        : connection
    );

    setConnections(tempConnections);
  }

  async function disconnectWhatsapp(connectionId: string) {
    try {
      const response = await deleteWhatsappConnection(connectionId);
      toast.success("Berhasil logout whatsapp");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Gagal logout whatsapp" + error.message);
    }
  }

  function getConnectionStatusText(connection: IConnection) {
    let text: ReactElement;
    switch (connection.status) {
      case WhatsAppConnectionStatus.QR_CODE_GENERATED:
      case WhatsAppConnectionStatus.DISCONNECTED:
      case WhatsAppConnectionStatus.CLOSED:
      case WhatsAppConnectionStatus.ERROR:
        text = (
          <span className={`text-rose-600 flex items-center gap-2 text-sm`}>
            <FontAwesomeIcon icon={faWifi} className="text-rose-500" />
            Disconnected
          </span>
        );
        break;
      case WhatsAppConnectionStatus.READY:
        text = (
          <span className={`text-emerald-600 flex items-center gap-2 text-sm`}>
            <FontAwesomeIcon icon={faWifi} className="text-emerald-500" />
            Connected
          </span>
        );
        break;
      default:
        text = (
          <span className={`text-gray-600 flex items-center gap-2 text-sm`}>
            <FontAwesomeIcon icon={faWifi} className="text-gray-500" />
            {connection.status.toLowerCase()}
          </span>
        );
    }
    return text;
  }

  async function handleConnect(connection: IConnection) {
    if (connection.status === WhatsAppConnectionStatus.QR_CODE_GENERATED) {
      setConnectWaModalOpen({ isOpen: true, connectId: connection.id });
    } else {
      try {
        const response = await connectWhatsapp(connection.id);
        setConnectWaModalOpen({ isOpen: true, connectId: connection.id });
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="dashboard-wrapper w-full p-6 md:p-8">
      <AddDeviceModal
        isOpen={addDeviceModalOpen}
        onClose={() => setAddDeviceModalOpen(false)}
        onSuccess={() => {}}
      />

      {connectWaModalOpen.isOpen && (
        <WhatsappSetupModal
          whatsappStatuses={whatsappStatus}
          connectionId={connectWaModalOpen.connectId}
          closeModal={() => {
            setConnectWaModalOpen({ isOpen: false, connectId: "" });
          }}
          onSuccess={() => {
            setConnectWaModalOpen({ isOpen: false, connectId: "" });
          }}
        />
      )}

      <Summary connections={connections} />

      <div className="p-6 mt-6 bg-white rounded-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Devices</h2>
          <button
            onClick={() => {
              setAddDeviceModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Device
          </button>
        </div>

        {/* Device List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-gray-800 font-medium">
                  Device
                </th>

                {connections[0]?.messageTheme?.map((theme) => (
                  <th
                    key={theme.themeMessageId}
                    className="text-left p-3 text-gray-800 font-medium"
                  >
                    {theme.themeMessageName}
                  </th>
                ))}

                <th className="text-right p-3 text-gray-800 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {connections.map((connection) => (
                <tr key={connection.id} className="border-b hover:bg-gray-50">
                  {/* connection Column */}
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-600 flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-gray-500"
                        />
                        {connection.name}
                      </span>
                      <span className="text-gray-600 flex items-center gap-2 text-sm">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500"
                        />
                        {connection.mobileNumber}
                      </span>

                      {getConnectionStatusText(connection)}
                    </div>
                  </td>

                  {connection.messageTheme?.map((theme) => (
                    <td key={theme.themeMessageId} className="p-3">
                      <div className="text-sm text-gray-600 w-max">
                        Max : {theme.maxMessage}
                      </div>
                      <div className="text-sm text-gray-600 w-max">
                        Total Sent : {theme.totalSent}
                      </div>
                      <div className="text-sm text-gray-600 w-max">
                        Remaining : {theme.remainingMessage}
                      </div>
                    </td>
                  ))}

                  <td className="p-3 flex gap-4 justify-end">
                    {connection.status === WhatsAppConnectionStatus.READY && (
                      <button
                        onClick={() => {
                          toast.promise(disconnectWhatsapp(connection.id), {
                            success: "Berhasil logout whatsapp",
                            error: "Gagal logout whatsapp",
                            pending: "Loading",
                          });
                        }}
                        className="bg-red-500 text-sm text-white  py-2 px-4 rounded-md flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faLinkSlash} />
                        Disconnect
                      </button>
                    )}

                    {(connection.status ===
                      WhatsAppConnectionStatus.INITIALIZING ||
                      connection.status ===
                        WhatsAppConnectionStatus.AUTHENTICATING) && (
                      <button className="bg-yellow-500 text-sm text-white py-2 px-4 rounded-md flex items-center gap-2">
                        <FontAwesomeIcon icon={faSpinner} />
                        {connection.status}
                      </button>
                    )}

                    {(connection.status ===
                      WhatsAppConnectionStatus.QR_CODE_GENERATED ||
                      connection.status === WhatsAppConnectionStatus.ERROR ||
                      connection.status ===
                        WhatsAppConnectionStatus.DISCONNECTED ||
                      connection.status ===
                        WhatsAppConnectionStatus.CLOSED) && (
                      <button
                        onClick={() => {
                          handleConnect(connection);
                        }}
                        disabled={connection.connectionTypeCd === "internal"}
                        className={`text-white text-sm py-2 px-4 rounded-md flex items-center gap-2 ${
                          connection.connectionTypeCd === "external"
                            ? "bg-emerald-500"
                            : "bg-gray-400"
                        }`}
                      >
                        <FontAwesomeIcon icon={faLink} />
                        connect
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
