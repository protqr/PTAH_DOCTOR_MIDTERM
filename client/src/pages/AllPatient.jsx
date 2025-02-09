import React, { useContext, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";
import PatientsContainer from "../assets/components/PatientsContainer.jsx";
import SearchContainer from "../assets/components/SearchContainer.jsx";
import AllHeader from "../assets/components/AllHeader.jsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/components/AddButton.jsx";
import ThaiDatePicker from "./ThaiDatePicker.jsx";

export const loader = async ({ request }) => {
    console.log(request.url);
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);

    try {
        const { data } = await customFetch.get("/allusers", {
            params,
        });
        return {
            data,
            searchValues: { ...params },
        };
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const AllPatientContext = createContext();

const AllPatient = () => {
    const { data, searchValues } = useLoaderData();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (data && data.allusers) {
            console.log(data.allusers);
        } else {
            console.log("No patients to display");
        }
    }, [data]);

    return (
        <AllPatientContext.Provider
            value={{ data, searchValues, selectedDate, setSelectedDate }}
        >
            <SearchContainer />
            <Wrapper>
                {/* <DatePick onChange={(date) => setSelectedDate(date)} /> */}
                {/* <ThaiDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
                <button onClick={() => navigate("/dashboard/add-user")}>
                    {/* <b>+</b> เพิ่มผู้ป่วย */}
                </button>
            </Wrapper>
            <AllHeader>คนไข้ทั้งหมด</AllHeader>
            <PatientsContainer />
        </AllPatientContext.Provider>
    );
};

export const useAllPatientContext = () => useContext(AllPatientContext);

export default AllPatient;






// import React, { useContext, createContext, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import customFetch from '../utils/customFetch.js';
// import PatientsContainer from '../assets/components/PatientsContainer.jsx';
// import SearchContainer from '../assets/components/SearchContainer.jsx';
// import AddButton from '../assets/components/AddButton.jsx';
// import DatePick from "../assets/components/DatePick.jsx";
// import AllHeader from '../assets/components/AllHeader.jsx';
// import { useLoaderData, useNavigate } from 'react-router-dom';
// import { MdAddCircle } from 'react-icons/md';
// import SoftDelete from "../assets/components/SoftDelete.jsx";
// import { MdOutlineAutoDelete } from "react-icons/md";
// import Wrapper from "../assets/components/AddButton.jsx"

// export const loader = async ({ request }) => {
//   console.log(request.url);
//   const params = Object.fromEntries([
//     ...new URL(request.url).searchParams.entries(),
//   ]);

//   try {
//     const { data } = await customFetch.get('/allusers', {
//       params,
//     });
//     return {
//       data,
//       searchValues: { ...params },
//     };
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//     return error;
//   }
// };

// const AllPatientContext = createContext();

// const AllPatient = () => {
//   const { data, searchValues } = useLoaderData();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ตรวจสอบว่ามีข้อมูลผู้ป่วยหรือไม่
//     if (data && data.allusers) {
//       // หากมีข้อมูลผู้ป่วย ให้ทำตามปกติ
//       console.log(data.allusers);
//     } else {
//       // หากไม่มีข้อมูลผู้ป่วย ให้แสดงข้อความว่า No patients to display
//       console.log('No patients to display');
//     }
//   }, [data]);

//   return (
//     <AllPatientContext.Provider value={{ data, searchValues }}>
//       <SearchContainer />
//       <Wrapper>
//       <DatePick onClick={() => navigate("/dashboard/add-user")}>
//         <b>+</b> เพิ่มผู้ป่วย
//       </DatePick>
//       </Wrapper>
//       {/* <SoftDelete onClick={() => navigate("/dashboard/history-deleted-patient")}>
//         <MdOutlineAutoDelete />
//       </SoftDelete> */}
//       <AllHeader>คนไข้ทั้งหมด</AllHeader>
//       <PatientsContainer />
//     </AllPatientContext.Provider>
//   );
// };

// export const useAllPatientContext = () => useContext(AllPatientContext);

// export default AllPatient;
