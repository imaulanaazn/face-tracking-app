import FaceRecognizer from "@/components/dashboard/FaceRecognizer";

const UserRecognition: React.FC = () => {
  return (
    <div className="w-full p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8">
      <FaceRecognizer />
      <div className="w-full lg:w-2/5 history bg-white h-auto rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
        <h2 className="text-lg font-medium mb-4">History</h2>
        <div className="tables">
          <table className="min-w-full">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-600 px-6 py-4 text-left"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-600 px-6 py-4 text-left"
                >
                  No HP
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-600 px-6 py-4 text-left"
                >
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  Mark
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  Otto
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  @mdo
                </td>
              </tr>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  Jacob
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  Thornton
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  @fat
                </td>
              </tr>
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  Larry
                </td>
                <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
                  @twitter
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRecognition;
