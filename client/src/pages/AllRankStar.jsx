import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/SearchContainer";
import customFetch from "../utils/customFetch.js";

const AllRankStar = () => {
  const [rankData, setRankData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(rankData.length / rowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get("/users/alluser");
        // กรองเฉพาะคนที่มี physicalTherapy === true และเรียงลำดับจำนวนดาว
        const filteredData = response.data
          .filter(user => user.physicalTherapy === true)
          .sort((a, b) => b.stars - a.stars); // เรียงจากมากไปน้อย

        setRankData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const currentData = rankData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Wrapper>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">อันดับ</th>
              <th scope="col" className="px-6 py-3">ชื่อ-นามสกุล</th>
              <th scope="col" className="px-6 py-3 text-end">จำนวนดาว</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item._id} className="bg-white border-b">
                <td className="px-6 py-4">{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                <td className="px-6 py-4">{item.name} {item.surname}</td>
                <td className="px-6 py-4 flex items-center space-x-1 justify-end">
                  <span className="text-yellow-500 font-bold">{item.stars}</span>
                  <span className="text-yellow-500">⭐</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#4cb3f4] text-white hover:bg-primary-800 shadow-lg hover:shadow-xl"
              }`}
          >
            ก่อนหน้า
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1
                ? "bg-[#4cb3f4] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-primary-800 shadow-lg hover:shadow-xl"
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#4cb3f4] text-white hover:bg-primary-800 shadow-lg hover:shadow-xl"
              }`}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AllRankStar;
