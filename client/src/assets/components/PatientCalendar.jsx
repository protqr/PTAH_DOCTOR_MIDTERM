import PropTypes from "prop-types";
import { useState } from "react";

const CalendarCell = ({ day, status, star }) => {
  const getBackgroundColor = () => {
    if (status === "") return "bg-blue-300";
    return "bg-transparent";
  };

  const getTextColor = () => {
    if (Array.isArray(status) && status.length === 0) return "text-red-500 font-bold";
    if (status === "ทำได้ดี") return "text-green-500 font-bold";
    if (status === "ควรปรับปรุง") return "text-yellow-500 font-bold";
    if (status === "หมอยังไม่ประเมิน") return "text-blue-500 font-bold";
    return "text-gray-600";
  };

  return (
    <div className={`flex justify-center items-center h-12 ${getBackgroundColor()} rounded-md`}>
      <div className="flex flex-col items-center">
        {star ? <span className="text-yellow-500 text-sm">⭐</span> : <span className="text-yellow-500 h-5"></span>}
        <span className={`text-lg ${getTextColor()}`}>{day}</span>
      </div>
    </div>
  );
};

CalendarCell.propTypes = {
  day: PropTypes.number,
  status: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  star: PropTypes.bool,
};

CalendarCell.defaultProps = {
  status: null,
  star: false,
};

const PatientCalendar = () => {
  const weekdays = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const handleDateChange = (type, value) => {
    setSelectedDate((prev) => ({ ...prev, [type]: Number(value) }));
  };

  const daysInMonth = new Date(selectedDate.year, selectedDate.month + 1, 0).getDate();
  const firstDay = new Date(selectedDate.year, selectedDate.month, 1).getDay();

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const statusData = {
    1: "ทำได้ดี",
    2: "ทำได้ดี",
    3: "ควรปรับปรุง",
    4: "หมอยังไม่ประเมิน",
    5: [],
  };

  const starData = {
    1: true,
    2: true,
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, status: statusData[i] || null, star: starData[i] || false });

  return (
    <div className="flex flex-col gap-4 p-8 bg-[#f2faffd2] w-[500px] rounded-xl shadow-2xl">
      <div className="flex justify-between px-4 mb-3">
        <select
          className="text-lg font-extrabold text-[#87CEFA] bg-transparent border-none focus:outline-none"
          value={selectedDate.month}
          onChange={(e) => handleDateChange("month", e.target.value)}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <select
          className="text-lg font-extrabold text-[#87CEFA] bg-transparent border-none focus:outline-none"
          value={selectedDate.year}
          onChange={(e) => handleDateChange("year", e.target.value)}
        >
          {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-7 font-bold text-lg">
        {weekdays.map((day) => (
          <div key={day} className="h-10 p-2 text-center">
            <span className="text-lg font-extrabold text-[#87CEFA]">{day}</span>
          </div>
        ))}
        <div className="col-span-7 mt-3 px-4">
          <hr className="w-full border-gray-300" />
        </div>

        {days.map((cell, index) => (
          <CalendarCell
            key={index}
            day={cell ? cell.day : null}
            status={cell ? cell.status : null}
            star={cell ? cell.star : false}
          />
        ))}
      </div>

      <div className="w-full flex space-x-4 px-4 font-bold text-gray-600 text-sm mt-10">
        <div className="flex space-x-1 whitespace-nowrap items-center">
          <span className="text-yellow-500 font-bold">⭐</span>
          <p>ได้รับดาว</p>
        </div>
        <div className="flex space-x-1 whitespace-nowrap items-center">
          <div className="w-4 h-4 rounded-full bg-blue-300"></div>
          <p>หมอยังไม่ประเมิน</p>
        </div>
      </div>
      <div className="w-full flex space-x-4 px-4 font-bold text-gray-600 text-sm">
        <div className="flex space-x-1 whitespace-nowrap items-center">
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
          <p>ทำได้ดี</p>
        </div>
        <div className="flex space-x-1 whitespace-nowrap items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
          <p>ควรปรับปรุง</p>
        </div>
        <div className="flex space-x-1 whitespace-nowrap items-center">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <p>ผู้ป่วยไม่ได้ทำกายภาพ</p>
        </div>
      </div>
    </div>
  );
};

export default PatientCalendar;
