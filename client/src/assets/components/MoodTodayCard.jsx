import React from "react";
import happyImg from "../images/Ellipse 170.png";
import heartImg from "../images/heart.png";
import hopeImg from "../images/hope.png";
import depressionImg from "../images/depression.png";

const MoodTodayCard = () => {
  return (
    <div className="flex bg-white rounded-2xl p-6 w-[900px] shadow-lg items-center">
      {/* Left Section */}
      <div className="flex flex-col items-center w-[200px] bg-[#e0f7ff] rounded-2xl p-6 text-center">
        <h4 className="text-lg text-gray-800">1 เมษายน 2567</h4>

        <div className="mt-5 flex flex-col items-center">
          <i className="fas fa-heart text-[#00bfff] mb-2"></i>
          <span className="text-gray-800">ผู้ดูแล</span>
        </div>

        <div className="flex flex-col justify-center item-center mt-6">
          <img className="ml-3" src={happyImg} alt="smile" width="50" />
          <p className="mt-3 text-lg text-gray-800">มีความสุข</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between w-full ml-8">
        {/* Mood Icons */}
        <p className="mb-2">อารมณ์</p>
        <div className="flex justify-around mb-6">
          {/* Card Mullet for ผ่อนคลาย */}
          <div className="mullet-card flex flex-col items-center bg-[#dff9e8] rounded-lg p-4 w-[150px] shadow-md">
            <p className="text-lg font-semibold text-gray-800">ผ่อนคลาย</p>
            <img src={heartImg} alt="heart" className="w-12 mt-4" />
            <p className="text-lg text-gray-800 mt-2">10 ครั้ง</p>
          </div>

          {/* Card Mullet for มีความหวัง */}
          <div className="mullet-card flex flex-col items-center bg-[#dff9e8] rounded-lg p-4 w-[150px] shadow-md">
            <p className="text-lg font-semibold text-gray-800">มีความหวัง</p>
            <img src={hopeImg} alt="hope" className="w-12 mt-4" />
            <p className="text-lg text-gray-800 mt-2">8 ครั้ง</p>
          </div>

          {/* Card Mullet for หดหู่ */}
          <div className="mullet-card flex flex-col items-center bg-[#ffe7e9] rounded-lg p-4 w-[150px] shadow-md">
            <p className="text-lg font-semibold text-gray-800">หดหู่</p>
            <img src={depressionImg} alt="depression" className="w-12 mt-4" />
            <p className="text-lg text-gray-800 mt-2">5 ครั้ง</p>
          </div>
        </div>

        {/* Description */}
        <p className="mb-2">ไดอารี</p>
        <div className="bg-gray-100 rounded-xl p-4 italic text-gray-600">
          วันนี้รู้สึกว่าเริ่มทำกายภาพได้ดีกว่าทุกวัน
          อยากให้กำลังใจตัวเองทำต่อไปเรื่อย ๆ จะได้ดีขึ้น
        </div>
      </div>
    </div>
  );
};

export default MoodTodayCard;
