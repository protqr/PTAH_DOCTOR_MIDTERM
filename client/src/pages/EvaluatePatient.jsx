import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DislikeButton, LikeButton } from "../assets/components/Button";
import { FcPrevious } from "react-icons/fc";

const getThaiMonth = (month) => {
    const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
    ];
    return thaiMonths[month - 1];
};

const formatThaiDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${getThaiMonth(month + 1)} ${year}`;
};

const postureList = [
    {
        name: "การจัดท่านอน",
        difficulty: "ง่าย",
    },
    {
        name: "เคลื่อนไหวข้อต่อแขน",
        difficulty: "ง่าย",
    },
    {
        name: "เคลื่อนไหวข้อต่อขา",
        difficulty: "ง่าย",
    },
    {
        name: "เคลื่อนไหวข้อไหล่",
        difficulty: "ง่าย",
    },
    {
        name: "ฝึกกล้ามเนื้อสะโพก",
        difficulty: "ยาก",
    },
    {
        name: "เคลื่อนย้ายจากเตียงไปรถเข็น",
        difficulty: "ปานกลาง",
    },
    {
        name: "เคลื่อนย้ายจากรถเข็นไปเตียง",
        difficulty: "ปานกลาง",
    },
    {
        name: "การลุกขึ้นจากท่านอนย้าย",
        difficulty: "ง่าย",
    },
    {
        name: "การฝึกท่านั่งขอบเตียง",
        difficulty: "ง่าย",
    },
];

const PostureCard = ({ name, difficulty, number }) => {
    const difficultyColor = {
        easy: "text-green-500",
        medium: "text-yellow-500",
        hard: "text-red-500",
    };

    const mapColor = (difficulty) => {
        let thaiToEng;
        if (difficulty === "ง่าย") {
            thaiToEng = "easy";
        } else if (difficulty === "ปานกลาง") {
            thaiToEng = "medium";
        } else if (difficulty === "ยาก") {
            thaiToEng = "hard";
        }
        return difficultyColor[thaiToEng];
    };

    return (
        <div className="flex flex-row justify-between">
            <div className="flex space-x-1">
                <span className="font-bold">ด่านที่ {number}</span>
                <span className="text-gray-800">{name}</span>
            </div>
            <span className={`w-16 text-center ${mapColor(difficulty)}`}>
                {difficulty}
            </span>
        </div>
    );
};

const EvaluatePatient = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 3, 12));
    const [activeButton, setActiveButton] = useState(null);

    const navigate = useNavigate();

    const handleLikeClick = () => {
        if (activeButton !== "like") {
            setActiveButton("like");
        }
    };

    const handleDislikeClick = () => {
        if (activeButton !== "dislike") {
            setActiveButton("dislike");
        }
    };

    const handleSubmit = () => {
        navigate("/dashboard/all-patient");
    };

    const handleBack = () => {
        navigate(-1);  
    };

    return (
      <Wrapper>
        <FcPrevious className="text-5xl" />
        <div className="w-full h-full flex flex-col justify-center space-y-8">
          <p className="font-semibold text-gray-600 text-xl text-center">
            {formatThaiDate(currentDate)}
          </p>
          <div className="w-full flex flex-row justify-between px-4 font-thin text-gray-600">
            <span>ระยะเวลาในการทำกายภาพ: 45:15 นาที</span>
            <span className="text-green-600">ประเมินโดยผู้ป่วย</span>
          </div>
          <div className="w-full h-full flex flex-col border-2 p-8 rounded-lg space-y-8 shadow-lg">
            {postureList.map((val, index) => {
              return (
                <PostureCard
                  key={index}
                  name={val.name}
                  difficulty={val.difficulty}
                  number={index + 1}
                />
              );
            })}
          </div>
          <div className="flex flex-col space-y-3 font-thin text-gray-600 text-sm">
            <p className="font-bold">ข้อความจากผู้ป่วย:</p>
            <p>
              วันนี้เริ่มทำคล่องกว่าอาทิตย์ที่แล้วค่ะบางท่าสามารถทำได้เองไม่ต้อง
              ให้ผู้ดูแลช่วย ส่วนมากสามารถทำได้ด้วยตัวเองค่ะหมอ
            </p>
            <p className="font-bold">ตอบกลับ:</p>
            <textarea
              className="px-6 py-4 w-full h-16 border-2 rounded-xl resize-none flex items-center"
              placeholder="ตอบกลับคนไข้"
            ></textarea>
          </div>
          <div className="w-[65%] flex space-x-2">
            <LikeButton
              isActive={activeButton === "like"}
              handleClick={handleLikeClick}
            />
            <DislikeButton
              isActive={activeButton === "dislike"}
              handleClick={handleDislikeClick}
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleBack}
              className="w-[25%] bg-[#84D0FF] text-white flex justify-center items-center px-1 py-4 rounded-3xl shadow-xl"
            >
              ส่ง
            </button>
          </div>
        </div>
      </Wrapper>
    );
};

export default EvaluatePatient;




// mood

// import React from "react";
// import { PatientCard } from "../assets/components/PatientCard.jsx";
// import insomniaImg from "../assets/images/insomnia.png";
// import allmoodmonth from "../assets/images/allmoodmonth.png";
// import stressImg from "../assets/images/frustration.png";
// import hopeImg from "../assets/images/hope.png";
// import happyImg from "../assets/images/Ellipse 170.png";


// const EvaluatePatient = () => {
//   return (
//     <div className="bg-[#eff7ff] p-8 rounded-xl shadow-lg w-full max-w-[1200px] mx-auto">
//       <PatientCard />
//       {/* Header */}
//       <div className="flex justify-center items-center mb-6 mt-10">
//         <h2 className="text-2xl font-bold text-[#306AA1] mr-4">
//           อารมณ์ประจำเดือนเมษายน 2567
//         </h2>
//         <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm">
//           <i className="fas fa-calendar-alt text-[#00bfff]"></i>
//           <select className="text-gray-800">
//             <option>เม.ย. 2567</option>
//             {/* Add more options if needed */}
//           </select>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex justify-center items-center mb-6">
//         <button className="bg-[#d6e9fa] text-[#306AA1] py-2 px-4 rounded-md mr-2">
//           ผู้ป่วย
//         </button>
//         <button className="bg-[#306AA1] text-white py-2 px-4 rounded-md">
//           ผู้ดูแล
//         </button>
//       </div>

//       <div className="grid grid-cols-2 gap-8">
//         {/* Left Section */}
//         <div className="space-y-6">
//           {/* ความรู้สึกโดยรวมในเดือนนี้ */}
//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <p className="text-center text-gray-500">
//               ความรู้สึกโดยรวมในเดือนนี้
//             </p>
//             <div className="flex justify-center items-center mt-4">
//               <img src={happyImg} alt="happy" className="w-12" />
//               <p className="ml-2 text-xl text-[#91ED90]">มีความสุข</p>
//             </div>
//             <div className="flex items-center w-full h-8 rounded-full bg-gray-300 overflow-hidden mt-4">
//               <div
//                 className="bg-[#91ED90] flex items-center justify-center text-white text-sm font-bold h-full"
//                 style={{ width: "64.7%" }}
//               >
//                 64.7%
//               </div>
//               <div
//                 className="flex items-center justify-center text-gray-500 text-sm font-bold h-full"
//                 style={{ width: "35.3%" }}
//               >
//                 35.3%
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm">
//             <p className="text-center text-[#3a3a3a] font-bold text-lg">
//               อารมณ์ที่เกิดขึ้นบ่อยที่สุด
//             </p>
//             <div className="flex justify-center gap-6 mt-6">
//               {/* Card 1 */}
//               <div className="bg-[#ffe6e6] rounded-lg p-4 w-[150px] text-center shadow-md">
//                 <p className="text-[#3a3a3a] font-semibold">1</p>
//                 <img
//                   src={stressImg}
//                   alt="stressed"
//                   className="w-12 mx-auto mt-2"
//                 />
//                 <p className="mt-2 text-[#3a3a3a] text-lg">เครียด</p>
//                 <p className="text-[#3a3a3a] text-lg font-semibold">
//                   18 <span className="text-sm text-gray-500">ครั้ง</span>
//                 </p>
//               </div>

//               {/* Card 2 */}
//               <div className="bg-[#dff9e8] rounded-lg p-4 w-[150px] text-center shadow-md">
//                 <p className="text-[#3a3a3a] font-semibold">2</p>
//                 <img src={hopeImg} alt="hope" className="w-12 mx-auto mt-2" />
//                 <p className="mt-2 text-[#3a3a3a] text-lg">มีความหวัง</p>
//                 <p className="text-[#3a3a3a] text-lg font-semibold">
//                   14 <span className="text-sm text-gray-500">ครั้ง</span>
//                 </p>
//               </div>

//               {/* Card 3 */}
//               <div className="bg-[#ffe7e9] rounded-lg p-4 w-[150px] text-center shadow-md">
//                 <p className="text-[#3a3a3a] font-semibold">3</p>
//                 <img
//                   src={insomniaImg}
//                   alt="sleep"
//                   className="w-12 mx-auto mt-2"
//                 />
//                 <p className="mt-2 text-[#3a3a3a] text-lg">นอนไม่หลับ</p>
//                 <p className="text-[#3a3a3a] text-lg font-semibold">
//                   10 <span className="text-sm text-gray-500">ครั้ง</span>
//                 </p>
//               </div>
//             </div>
//             <p className="text-center mt-4 text-sm text-gray-500">
//               อารมณ์ที่เกิดขึ้นบ่อยที่สุดในเดือนนี้คือ{" "}
//               <span className="text-red-500">เครียด</span>
//             </p>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="bg-white rounded-xl p-6 shadow-sm">
//           <p className="text-center text-gray-500">
//             ความรู้สึกทั้งหมดในเดือนนี้
//           </p>
//           <div className="flex flex-box w-full h-full mt-2">
//             {/* This is just a placeholder. Replace with a real chart component */}
//             <img src={allmoodmonth} alt="pie chart" className="w-full h-full" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EvaluatePatient;
