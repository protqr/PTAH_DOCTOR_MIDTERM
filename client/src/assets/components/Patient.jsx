import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaRegEdit,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, Form } from "react-router-dom";
import Wrapper from "../wrappers/Patient";
import PatientInfo from "./PatientInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Patient = ({
  _id,
  username,
  name,
  surname,
  userType,
  userStatus,
  createdAt,
}) => {
  // แสดงเฉพาะ 8 ตัวแรกของ username และเปลี่ยนตัวอักษรที่เหลือเป็น "x"
  const formattedUserName = username
    ? username.slice(0, 8) + "x".repeat(Math.max(0, username.length - 8))
    : "Unknown"; // กรณี username เป็น undefined

  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{surname}</p>
          <br />
          {/* <p>อายุ :</p> <br /> */}
          <p>มีผู้ดูแลที่บ้าน</p>
        </div>
      </header>
      <footer>
        <Link
          to={`../edit-patient/${_id}`}
          className="btn edit-btn"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          ดูผลกายภาพบำบัด
        </Link>
      </footer>
    </Wrapper>
  );
};

export default Patient;
