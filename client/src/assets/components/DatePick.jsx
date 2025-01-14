import React, { useState } from "react";
import { DropdownDate, DropdownComponent } from "react-dropdown-date";
import styled from "styled-components";

const formatDate = (date) => {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const getThaiMonth = (month) => {
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  return thaiMonths[month - 1];
};

const convertToThaiYear = (year) => year + 543;

const DatePick = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState("2024-06-12");

  const handleDateChange = (date) => {
    const adYearDate = new Date(date);
    adYearDate.setFullYear(adYearDate.getFullYear() - 543);
    const formattedDate = formatDate(adYearDate);
    setSelectedDate(formattedDate);
    onChange(formattedDate);
  };

  const transformDateForDropdown = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    return `${convertToThaiYear(year)}-${month}-${day}`;
  };

  return (
    <DateContainer>
      <DropdownDate
        startDate={"2550-01-01"}
        endDate={"2567-12-31"}
        selectedDate={transformDateForDropdown(selectedDate)}
        order={[DropdownComponent.year, DropdownComponent.month, DropdownComponent.day]}
        onDateChange={handleDateChange}
        ids={{
          year: "select-year",
          month: "select-month",
          day: "select-day"
        }}
        names={{
          year: "year",
          month: "month",
          day: "day"
        }}
        classes={{
          dateContainer: "date-container",
          yearContainer: "year-container",
          monthContainer: "month-container",
          dayContainer: "day-container",
          year: "dropdown",
          month: "dropdown",
          day: "dropdown",
          yearOptions: "dropdown-options",
          monthOptions: "dropdown-options",
          dayOptions: "dropdown-options"
        }}
        defaultValues={{
          year: "ปี",
          month: "เดือน",
          day: "วันที่"
        }}
        options={{
          yearReverse: true,
          monthShort: true,
          monthCaps: true
        }}
        transformYear={convertToThaiYear}
      />
    </DateContainer>
  );
};

export default DatePick;

const DateContainer = styled.div`
  .date-container {
    display: flex;
    justify-content: space-between;
    margin-left: -60px;
    margin-right: auto;
    gap: 10px;
  }

  .dropdown {
    flex: 1;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100px;
    height: 35px;
  }

  .dropdown-options {
    font-size: 14px;
    text-align: center;
  }
`;

// import React, { useState } from "react";
// import { DropdownDate, DropdownComponent } from "react-dropdown-date";
// import styled from "styled-components";

// const formatDate = (date) => {
//   // formats a JS date to 'yyyy-mm-dd'
//   var d = new Date(date),
//     month = "" + (d.getMonth() + 1),
//     day = "" + d.getDate(),
//     year = d.getFullYear();

//   if (month.length < 2) month = "0" + month;
//   if (day.length < 2) day = "0" + day;

//   return [year, month, day].join("-");
// };

// const getThaiMonth = (month) => {
//   const thaiMonths = [
//     "มกราคม",
//     "กุมภาพันธ์",
//     "มีนาคม",
//     "เมษายน",
//     "พฤษภาคม",
//     "มิถุนายน",
//     "กรกฎาคม",
//     "สิงหาคม",
//     "กันยายน",
//     "ตุลาคม",
//     "พฤศจิกายน",
//     "ธันวาคม",
//   ];
//   return thaiMonths[month - 1];
// };

// const convertToThaiYear = (year) => {
//   return year + 543;
// };

// const convertToADYear = (year) => {
//   return year - 543;
// };

// const DatePick = () => {
//   const [date, setDate] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("2024-06-12");

//   const handleDateChange = (date) => {
//     setDate(date);
//     const adYearDate = new Date(date);
//     adYearDate.setFullYear(adYearDate.getFullYear() - 543);
//     setSelectedDate(formatDate(adYearDate));
//   };

//   const getFormattedDate = () => {
//     if (!selectedDate) return "";
//     const [year, month, day] = selectedDate.split("-");
//     const thaiYear = convertToThaiYear(parseInt(year));
//     return `${day} ${getThaiMonth(parseInt(month))} ${thaiYear}`;
//   };

//   return (
//     <DateContainer>
//       <DropdownDate
//         startDate={"2550-01-01"} // 'yyyy-mm-dd' format only
//         endDate={"2567-12-31"} // 'yyyy-mm-dd' format only
//         selectedDate={selectedDate} // 'yyyy-mm-dd' format only
//         order={[
//           // Order of the dropdowns
//           DropdownComponent.year,
//           DropdownComponent.day,
//           DropdownComponent.month,
//         ]}
//         onMonthChange={(month) => {
//           // optional
//           console.log(month);
//         }}
//         onDayChange={(day) => {
//           // optional
//           console.log(day);
//         }}
//         onYearChange={(year) => {
//           // optional
//           console.log(year);
//         }}
//         onDateChange={(date) => {
//           // optional
//           console.log(date);
//           handleDateChange(date);
//         }}
//         ids={{
//           // optional
//           year: "select-year",
//           month: "select-month",
//           day: "select-day",
//         }}
//         names={{
//           // optional
//           year: "year",
//           month: "month",
//           day: "day",
//         }}
//         classes={{
//           // optional
//           dateContainer: "date-container",
//           yearContainer: "year-container",
//           monthContainer: "month-container",
//           dayContainer: "day-container",
//           year: "dropdown",
//           month: "dropdown",
//           day: "dropdown",
//           yearOptions: "dropdown-options",
//           monthOptions: "dropdown-options",
//           dayOptions: "dropdown-options",
//         }}
//         defaultValues={{
//           // optional
//           year: "ปี",
//           month: "เดือน",
//           day: "วันที่",
//         }}
//         options={{
//           // optional
//           yearReverse: true, // false by default
//           monthShort: true, // false by default
//           monthCaps: true, // false by default
//         }}
//         transformYear={convertToThaiYear} // To transform year to B.E. (พ.ศ.)
//       />
//       {/* <p>วันที่ {getFormattedDate()}</p> */}
//     </DateContainer>
//   );
// };

// export default DatePick;

// const DateContainer = styled.div`
//   .date-container {
//     display: flex;
//     justify-content: space-between;
//     /* width: 0px; */
//     margin-left: -60px;
//     margin-right: auto;
//     gap: 10px;
//   }

//   .dropdown {
//     flex: 1;
//     padding: 5px;
//     font-size: 16px;
//     border: 1px solid #ccc;
//     border-radius: 10px;
//     width: 100px;
//     height: 35px;
//   }

//   .dropdown-options {
//     font-size: 14px;
//     text-align: center;
//   }
// `;
