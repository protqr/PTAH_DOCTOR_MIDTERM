import React, { useState, useEffect } from "react";
import {
    FormRow,
    FormRowSelect,
    FormRowMultiSelect,
} from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import {
    TYPEPOSTURES,
    CHOOSEPOSTURES,
    TYPESTATUS,
    GENDER,
} from "../../../utils/constants";
import { Form, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import Calendar from "../assets/components/Calendar.jsx";
import Profile from "../assets/images/profile.png";
import PatientCalendar from "../assets/components/PatientCalendar.jsx";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { PatientCard } from "../assets/components/PatientCard.jsx";

export const loader = async ({ params }) => {
    try {
        const { _id } = params;
        if (!_id) {
            throw new Error("Invalid ID");
        }
        const { data } = await customFetch.get(`/allusers/${_id}`);
        return data;
    } catch (error) {
        toast.error(error.response.data.msg);
        return redirect("/dashboard/all-patient");
    }
};

export const action = async ({ request, params }) => {
    const { _id } = params;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);

    // แปลงค่าที่เลือกจาก FormRowMultiSelect เป็นอาร์เรย์ของสตริง
    // if (data.userPosts) {
    //   data.userPosts = data.userPosts.split(',').map((item) => item.trim());
    // }

    try {
        if (!_id) {
            throw new Error("Invalid ID");
        }
        await customFetch.patch(`/allusers/${_id}`, data);
        toast.success("แก้ไขข้อมูลคนไข้เรียบร้อยแล้ว");
        return redirect("/dashboard/all-patient");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const EditPatient = () => {
    const { patient } = useLoaderData();
    const navigate = useNavigate();
    const isSubmitting = navigate.state === "submitting";
    const [selectedUserGender, setSelectedUserGender] = useState(
        patient.userGender || ""
    );
    const [selectedUserType, setSelectedUserType] = useState(
        patient.userType || ""
    );
    // const [selectedUserPosts, setSelectedUserPosts] = useState(
    //   patient.userPosts || []
    // );
    const [selectedUserStatus, setSelectedUserStatus] = useState(
        patient.userStatus || ""
    );
    const [postures, setPostures] = useState([]);

    useEffect(() => {
        const fetchPostures = async () => {
            try {
                const { data } = await customFetch.get("/postures");
                setPostures(data.postures);
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        };
        fetchPostures();
    }, []);

    const handleUserTypeChange = (event) => {
        setSelectedUserGender(event.target.value);
        setSelectedUserType(event.target.value);
        setSelectedUserStatus(event.target.value);
    };

    // const handleUserPostsChange = (selectedOptions) => {
    //   setSelectedUserPosts(selectedOptions.map((option) => option.value));
    // };

    return (
        <Wrapper>
            <StyledFormWrapper>
                <div className="flex flex-col w-full h-full space-y-12 form">
                    <PatientCard />
                    <div className="flex justify-center">
                        <PatientCalendar />
                    </div>
                    <div className="flex flex-row space-x-4 text-lg font-bold">
                        <button
                            onClick={() => navigate("/dashboard/eval-doctor")}
                            className="w-full shadow-xl border-2 p-4 rounded-full"
                        >
                            ประเมินผู้ป่วย
                        </button>
                        <button
                            onClick={() => navigate("/dashboard/graph-posture")}
                            className="w-full shadow-xl border-2 p-4 rounded-full"
                        >
                            กราฟแสดงการทำกายภาพ
                        </button>
                    </div>
                </div>
            </StyledFormWrapper>
        </Wrapper>
    );
};

const StyledFormWrapper = styled.div`
    display: flex;
    .image-container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        .patient-image {
            max-width: 60%;
            max-height: 60%;
            border-radius: 10px;
        }
    }
    .form {
        flex: 2;
        padding: 1rem;
    }
`;

export default EditPatient;



// import React, { useState, useEffect } from "react";
// import {
//     FormRow,
//     FormRowSelect,
//     FormRowMultiSelect,
// } from "../assets/components";
// import Wrapper from "../assets/wrappers/DashboardFormPage";
// import { useLoaderData, useParams } from "react-router-dom";
// import {
//     TYPEPOSTURES,
//     CHOOSEPOSTURES,
//     TYPESTATUS,
//     GENDER,
// } from "../../../utils/constants";
// import { Form, useNavigate, redirect } from "react-router-dom";
// import { toast } from "react-toastify";
// import customFetch from "../utils/customFetch";
// import styled from "styled-components";
// import Calendar from "../assets/components/Calendar.jsx";
// import Profile from "../assets/images/profile.png";
// import PatientCalendar from "../assets/components/PatientCalendar.jsx";
// import MoodTodayCard from "../assets/components/MoodTodayCard.jsx";
// import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
// import { PatientCard } from "../assets/components/PatientCard.jsx";

// export const loader = async ({ params }) => {
//     try {
//         const { _id } = params;
//         if (!_id) {
//             throw new Error("Invalid ID");
//         }
//         const { data } = await customFetch.get(`/allusers/${_id}`);
//         return data;
//     } catch (error) {
//         toast.error(error.response.data.msg);
//         return redirect("/dashboard/all-patient");
//     }
// };

// export const action = async ({ request, params }) => {
//     const { _id } = params;
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     console.log(data);

//     // แปลงค่าที่เลือกจาก FormRowMultiSelect เป็นอาร์เรย์ของสตริง
//     // if (data.userPosts) {
//     //   data.userPosts = data.userPosts.split(',').map((item) => item.trim());
//     // }

//     try {
//         if (!_id) {
//             throw new Error("Invalid ID");
//         }
//         await customFetch.patch(`/allusers/${_id}`, data);
//         toast.success("แก้ไขข้อมูลคนไข้เรียบร้อยแล้ว");
//         return redirect("/dashboard/all-patient");
//     } catch (error) {
//         toast.error(error?.response?.data?.msg);
//         return error;
//     }
// };

// const EditPatient = () => {
//     const { patient } = useLoaderData();
//     const navigate = useNavigate();
//     const isSubmitting = navigate.state === "submitting";
//     const [selectedUserGender, setSelectedUserGender] = useState(
//         patient.userGender || ""
//     );
//     const [selectedUserType, setSelectedUserType] = useState(
//         patient.userType || ""
//     );
//     // const [selectedUserPosts, setSelectedUserPosts] = useState(
//     //   patient.userPosts || []
//     // );
//     const [selectedUserStatus, setSelectedUserStatus] = useState(
//         patient.userStatus || ""
//     );
//     const [postures, setPostures] = useState([]);

//     useEffect(() => {
//         const fetchPostures = async () => {
//             try {
//                 const { data } = await customFetch.get("/postures");
//                 setPostures(data.postures);
//             } catch (error) {
//                 toast.error(error?.response?.data?.msg);
//             }
//         };
//         fetchPostures();
//     }, []);

//     const handleUserTypeChange = (event) => {
//         setSelectedUserGender(event.target.value);
//         setSelectedUserType(event.target.value);
//         setSelectedUserStatus(event.target.value);
//     };

//     // const handleUserPostsChange = (selectedOptions) => {
//     //   setSelectedUserPosts(selectedOptions.map((option) => option.value));
//     // };

//     return (
//         <Wrapper>
//             <StyledFormWrapper>
//                 <div className="flex flex-col w-full h-full space-y-12 form">
//                     <PatientCard />
//                     <div className="flex justify-center">
//                         <MoodTodayCard />
//                     </div>
//                     <div className="flex flex-row justify-center item-center space-x-4 text-lg font-bold">
//                         <button
//                             onClick={() => navigate("/dashboard/eval-doctor")}
//                             className="w-80 shadow-xl border-2 p-4 rounded-full"
//                         >
//                             สถิติอารมณ์ประจำเดือน
//                         </button>
//                         {/* <button
//                             onClick={() => navigate("/dashboard/graph-posture")}
//                             className="w-full shadow-xl border-2 p-4 rounded-full"
//                         >
//                             กราฟแสดงการทำกายภาพ
//                         </button> */}
//                     </div>
//                 </div>
//             </StyledFormWrapper>
//         </Wrapper>
//     );
// };

// const StyledFormWrapper = styled.div`
//     display: flex;
//     .image-container {
//         flex: 1;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         padding: 1rem;
//         .patient-image {
//             max-width: 60%;
//             max-height: 60%;
//             border-radius: 10px;
//         }
//     }
//     .form {
//         flex: 2;
//         padding: 1rem;
//     }
// `;

// export default EditPatient;

