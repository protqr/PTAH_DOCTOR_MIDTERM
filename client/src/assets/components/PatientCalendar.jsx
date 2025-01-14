import React, { useState } from "react";

const CalendarCell = ({
    day,
    dynamicTextColor,
    parentBgColor,
    isSpecialDay,
}) => {
    if (!day) {
        return <div className={`flex justify-center items-center h-12`}></div>;
    }

    return (
      <div
        className={`flex justify-center items-center h-12`}
        style={{ backgroundColor: parentBgColor }}
      >
        <div className="flex w-full flex-col gap-2 p-2 sm:flex-row sm:justify-evenly md:gap-4">
          <span
            className={`text-xl ${dynamicTextColor} ${
              isSpecialDay
                ? "p-1.5 bg-[#757575ebE] text-[#87CEFA] shadow-md rounded-md"
                : ""
            }`}
          >
            {day}
          </span>
        </div>
      </div>
    );
};

const PatientCalendar = () => {
    const weekdays = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
    const [currentDate, setCurrentDate] = useState(new Date(2024, 3, 12));

    // Array of dates where isHighlighted should be false
    const nonHighlightedDates = [
        new Date(2024, 3, 1),
        new Date(2024, 3, 2),
        new Date(2024, 3, 3),
        new Date(2024, 3, 5),
        new Date(2024, 3, 13),
        new Date(2024, 3, 14),
    ];

    // Array of special days
    const specialDays = [
      new Date(2024, 3, 21),
      new Date(2024, 3, 22),
      new Date(2024, 3, 23),
      new Date(2024, 3, 24),
      new Date(2024, 3, 25),
      new Date(2024, 3, 26),
      new Date(2024, 3, 27),
    ];

    const isDateHighlighted = (date) => {
        return !nonHighlightedDates.some(
            (d) =>
                d.getDate() === date && d.getMonth() === currentDate.getMonth()
        );
    };

    const isSpecialDay = (date) => {
        return specialDays.some(
            (d) =>
                d.getDate() === date && d.getMonth() === currentDate.getMonth()
        );
    };

    const days = [];
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    // Adding empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        days.push(null); // Push null for empty cells
    }

    // Adding actual day cells
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i });
    }

    // Calculate the remaining days of the week after the last day of the month
    const totalCells = daysInMonth + firstDay;
    const remainingCells = totalCells % 7;
    const emptyCellsToAdd = remainingCells === 0 ? 0 : 7 - remainingCells;

    // Adding empty cells for the rest of the week
    for (let i = 0; i < emptyCellsToAdd; i++) {
        days.push(null); // Push null for empty cells
    }

    return (
      <div className="flex flex-col gap-4 p-8 bg-[#f2faffd2] w-[500px] rounded-xl shadow-2xl">
        <div className="grid grid-cols-7 font-bold text-lg">
          <div className="col-span-7 px-4 mb-3">
            <div className="text-center mb-5 text-xl text-[#015285]">
              <span>เลือกวันที่ประเมิน</span>
            </div>
            <div className="flex flex-row justify-between text-xl font-extrabold text-[#87CEFA]">
              <span>มิถุนายน</span>
              <span>2567</span>
            </div>
          </div>
          {weekdays.map((day) => (
            <div key={day} className="h-10 p-2 text-center">
              <span className="text-lg font-extrabold text-[#87CEFA]">
                {day}
              </span>
            </div>
          ))}
          <div className="col-span-7 mt-3 px-4">
            <hr className="w-full border-gray-300" />
          </div>
          {days.map((cell, index) => (
            <CalendarCell
              key={index}
              day={cell ? cell.day : null}
              parentBgColor="inherit"
              dynamicTextColor={
                cell && isDateHighlighted(cell.day)
                  ? "text-[#72DA95]"
                  : "text-[#f8ba51]"
              }
              isSpecialDay={cell ? isSpecialDay(cell.day) : false}
            />
          ))}
        </div>
        <div className="w-full flex space-x-4 px-4 font-bold text-gray-600 text-sm">
          <div className="flex space-x-1">
            <div className="w-4 h-4 rounded-full bg-green-400"></div>
            <p>ทำได้ดี</p>
          </div>
          <div className="flex space-x-1">
            <div className="w-4 h-4 rounded-full bg-orange-300"></div>
            <p>ควรปรับปรุง</p>
          </div>
        </div>
      </div>
    );
};

export default PatientCalendar;
