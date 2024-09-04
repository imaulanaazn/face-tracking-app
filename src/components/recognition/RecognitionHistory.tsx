"use client";
import { getRecognitionHistory } from "@/services/api/merchant";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IHistory {
  id: string;
  name: string;
  timestamp: string;
}

export default function RecognitionHistory() {
  const [history, setHistory] = useState<IHistory[]>([]);
  const merchant = useSelector((state: RootState) => state.merchant);

  useEffect(() => {
    async function getHistory() {
      try {
        const response = await getRecognitionHistory(merchant.id);
        setHistory(response.data.data);
      } catch (error) {
        setHistory([]);
        console.error(error);
      }
    }

    getHistory();
  }, []);

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
                No HP
              </th>
              <th
                scope="col"
                className="text-sm font-semibold text-gray-600 px-6 py-4 text-left"
              >
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((data) => (
              <tr
                key={data.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  {data.name}
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  {data.name}
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  {data.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
