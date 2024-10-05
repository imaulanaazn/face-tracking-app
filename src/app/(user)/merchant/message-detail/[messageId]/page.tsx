"use client";
import { IGetMessageAPIResponse } from "@/data-types/merchant";
import formateDateIntr from "@/lib/formatter";
import { getMessageDetail } from "@/services/api/merchantMessage";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MessageDetail() {
  const [messageDetail, setMessageDetail] =
    useState<IGetMessageAPIResponse | null>(null);
  const [messageStatus, setMesageStatus] = useState({
    success: 0,
    pending: 0,
    failed: 0,
  });

  const { messageId } = useParams();

  async function fetchMerchantConnections() {
    try {
      const response = await getMessageDetail(messageId.toString());
      setMessageDetail(response.data);
      countStatus(response.data);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Gagal mengambil message detail " + error.message);
    }
  }

  useEffect(() => {
    fetchMerchantConnections();
  }, []);

  const formatMessage = (text: string) => {
    let formatted = text;
    formatted = formatted.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"); // Bold
    formatted = formatted.replace(/_([^_]+)_/g, "<em>$1</em>"); // Italic
    formatted = formatted.replace(/~([^~]+)~/g, "<del>$1</del>"); // Strikethrough
    formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>"); // Monospace
    formatted = formatted.replace(/\n/g, "<br>"); // Line breaks
    return formatted;
  };

  function countStatus(data: IGetMessageAPIResponse) {
    const result = data.recipients.reduce(
      (acc, obj) => {
        if (obj.status === "SUCCESS") {
          acc.success += 1;
        } else if (obj.status === "PENDING") {
          acc.failed += 1;
        } else {
          acc.failed += 1;
        }
        return acc;
      },
      { success: 0, pending: 0, failed: 0 } // Initial count object
    );
    setMesageStatus(result);
  }

  return (
    <div className="container p-6 md:p-8">
      <div className="wrapper flex flex-col lg:flex-row lg:gap-8 md:gap-6 gap-4">
        <div className="message w-full lg:w-7/12 bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8">
          <div className="flex flex-col xl:flex-row gap-2 justify-between">
            <p className="text-gray-800 font-semibold">
              Label Pesan :{" "}
              <span className="text-gray-700 font-normal">
                {messageDetail?.name}
              </span>
            </p>
            <p className="text-gray-700 font-normal text-sm">
              {formateDateIntr({
                isoDate: messageDetail?.dateCreated || "",
                includeTime: true,
              })}
            </p>
          </div>

          <hr className="my-4" />

          <p className="text-gray-800 font-semibold">Pesan :</p>

          <div className="min-h-28 rounded-lg mt-2">
            <div
              className="whitespace-pre-wrap text-gray-600 font-base"
              dangerouslySetInnerHTML={{
                __html: formatMessage(messageDetail?.content || ""),
              }}
            />
          </div>
        </div>

        <div
          id="message-templates"
          className="w-full lg:w-5/12 h-max max-h-[90vh] bg-white p-6 md:p-8 rounded-xl overflow-y-auto"
        >
          <div className="flex justify-center gap-6 mb-6 ">
            <p className="flex flex-col md:flex-row md:gap-2 items-center py-2 px-4 rounded-full md:bg-emerald-100 text-emerald-600">
              <span>{messageStatus.success} </span> Success
            </p>
            <p className="flex flex-col md:flex-row md:gap-2 items-center py-2 px-4 rounded-full md:bg-yellow-100 text-yellow-600">
              <span>{messageStatus.pending} </span> Pending
            </p>
            <p className="flex flex-col md:flex-row md:gap-2 items-center py-2 px-4 rounded-full md:bg-rose-100 text-rose-600">
              <span>{messageStatus.failed} </span> Failed
            </p>
          </div>

          <p className="text-gray-800 font-semibold mb-4">Penerima :</p>
          <div>
            {messageDetail?.recipients.map((receipent) => (
              <div
                key={receipent.id}
                className={`py-2 rounded rounded-lg shadow-sm lg:mr-0 h-auto border-b border-slate-200`}
              >
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    {receipent.recipientName}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {receipent.recipientNumber}
                  </span>
                </div>
                <span
                  className={`text-gray-600 text-sm ${
                    receipent.status === "FAILED"
                      ? "text-rose-600"
                      : receipent.status === "SUCCESS"
                      ? "text-emerald-600"
                      : "text-yellow-600"
                  }`}
                >
                  {receipent.status.toLocaleLowerCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
