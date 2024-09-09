"use client";
import formatDateToIndonesian from "@/lib/formatter";
import {
  getMerchantMemberHistory,
  IDetectionHistory,
} from "@/services/api/merchant";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

interface IRecognitionHistoryProps {
  memberId: string;
}

export default function RecognitionHistory({
  memberId,
}: IRecognitionHistoryProps) {
  const [history, setHistory] = useState<IDetectionHistory[]>([]);

  useEffect(() => {
    async function getDetectionHistory() {
      setHistory([]);
      try {
        const response = await getMerchantMemberHistory(memberId);
        setHistory(response.data.data);
      } catch (error: any) {
        setHistory([]);
        console.error(error.message);
      }
    }

    getDetectionHistory();
  }, [memberId]);

  return (
    <div className="w-full lg:w-2/5 history bg-white h-auto rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">History</h2>
      <div className="tables">
        <table className="min-w-full">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-semibold text-gray-600 px-6 py-4 text-left"
              >
                Nama
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-gray-600 px-6 py-4 text-left"
              >
                Tanggal kunjungan
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((data) => (
              <tr
                key={data.timestamp}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  {data.name}
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  {formatDateToIndonesian(data.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length > 0 && (
          <a
            href=""
            className="text-blue-600 flex items-center gap-2 justify-center mt-4"
          >
            <span>Lihat selengkapnya</span>{" "}
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        )}
      </div>
    </div>
  );
}
