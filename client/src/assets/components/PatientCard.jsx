import Profile from "../../assets/images/profile.png";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export const PatientCard = () => {
    return (
        <>
            <div className="w-full rounded-xl shadow-xl flex flex-row p-6 justify-between">
                <div className="flex space-x-8">
                    <div className="w-20 h-20">
                        <img
                            src={Profile}
                            alt="PtahApp"
                            className="patient-image"
                        />
                    </div>
                    <div className="flex flex-col space-y-3 text-gray-600">
                        <p className="font-bold text-gray-900">
                            นาย ศศิธร สอนดอก
                        </p>
                        <p className="font-light">อายุ 25 ปี (ชาย)</p>
                        <p className="font-light">
                            โรค : หลอดเลือดสมองระยะฟื้นฟู
                        </p>
                        <p className="font-light text-sm text-green-500">
                            มีผู้ดูแลที่บ้าน
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
