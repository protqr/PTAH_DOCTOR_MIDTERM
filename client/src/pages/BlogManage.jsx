import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdModeComment, MdAddComment } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate

const BlogManage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate(); // เรียกใช้ navigate

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRespondClick = () => {
    navigate("/dashboard/respond-blog"); // นำทางไปยังหน้า RespondBlog.jsx
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="flex justify-center items-center space-x-8 mb-6 border-b-1">
        <button
          onClick={() => handleTabClick("pending")}
          className={`pb-2 font-bold ${
            activeTab === "pending"
              ? "border-b-2 border-[#d30000] text-[#d30000]"
              : "text-gray-500"
          }`}
        >
          ยังไม่ตอบกลับ
        </button>
        <div className="h-12 w-0.5 bg-gray-500 mb-2"></div>
        <button
          onClick={() => handleTabClick("approved")}
          className={`pb-2 font-bold ${
            activeTab === "approved"
              ? "border-b-2 border-[#01c03a] text-[#01c03a]"
              : "text-gray-500"
          }`}
        >
          ตอบกลับแล้ว
        </button>
      </div>

      {activeTab === "pending" && (
        <div>
          {/* Card 1 */}
          <div className="border p-6 rounded-lg shadow-lg bg-white mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                ถ้าผู้ป่วยไม่ยอมทานอาหารเลย ควรทำยังไงดีคะ
              </div>
              <div className="text-sm text-gray-400">
                20 ตุลาคม 2567 เวลา 18:13 น.
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              สวัสดีค่ะ คือช่วงนี้คุณยายเราทานอาหารยากมากๆ เลยค่ะ
              เลยอยากจะสอบถามว่ามีวิธีไหนที่จะทำให้ท่านทานอาหารบ้างคะ ขอบคุณค่ะ
            </p>
            <div className="text-sm text-gray-500 mb-2 flex items-center">
              <FaUserCircle className="h-6 w-6 text-gray-500 mr-2" />{" "}
              <span className="font-semibold">โดย นxxxx รxxxx</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="flex items-center font-semibold text-[#64c3fe] hover:text-[#87cefa]"
                onClick={handleRespondClick} // เรียกใช้ฟังก์ชัน handleRespondClick
              >
                <MdModeComment className="mr-1 h-5 w-5" /> ตอบกลับ
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border p-6 rounded-lg shadow-lg bg-white mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                มีอาการคลื่นไส้ ไม่อยากกินอาหารมา 3 วันแล้ว
              </div>
              <div className="text-sm text-gray-400">
                19 ตุลาคม 2567 เวลา 19:57 น.
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              อยากอาเจียนกับไม่อยากกินอาหารมา3วันแล้วค่ะ เกิดจากอะไรเหรอคะ
            </p>
            <div className="text-sm text-gray-500 mb-2 flex items-center">
              <FaUserCircle className="h-6 w-6 text-gray-500 mr-2" />{" "}
              <span className="font-semibold">โดย จxxxx ชxxxx</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="flex items-center font-semibold text-[#64c3fe] hover:text-[#87cefa]"
                onClick={handleRespondClick} // เรียกใช้ฟังก์ชัน handleRespondClick
              >
                <MdModeComment className="mr-1 h-5 w-5" /> ตอบกลับ
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "approved" && (
        <div>
          <div className="border p-6 rounded-lg shadow-lg bg-white mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">กลืนน้ำลายแล้วเจ็บคอ</div>
              <div className="text-sm text-gray-400">
                15 ตุลาคม 2567 เวลา 15:23 น.
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              อยากอาเจียนกับไม่อยากกินอาหารมา3วันแล้วค่ะ เกิดจากอะไรเหรอคะ
            </p>
            <div className="text-sm text-gray-500 mb-2 flex items-center">
              <FaUserCircle className="h-6 w-6 text-gray-500 mr-2" />{" "}
              <span className="font-semibold">โดย สxxxx อxxxx</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="flex items-center font-semibold text-[#64c3fe] hover:text-[#87cefa]"
                onClick={handleRespondClick} // เรียกใช้ฟังก์ชัน handleRespondClick
              >
                <MdAddComment className="mr-1 h-4 w-4" /> เพิ่มคำตอบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManage;
