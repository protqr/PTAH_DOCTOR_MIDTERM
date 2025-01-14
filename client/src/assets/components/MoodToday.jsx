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

const MoodToday = ({
  _id,
  idPatient,
  namePatient,
  userType,
  userStatus,
  createdAt,
}) => {
  // แสดงเฉพาะ 8 ตัวแรกของ idPatient และเปลี่ยนตัวอักษรที่เหลือเป็น "x"
  const formattedIdPatient = idPatient.slice(0, 8) + "x".repeat(6);

  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{namePatient.charAt(0)}</div>
        <div className="info">
          <h5>{namePatient}</h5>
          <p>{userType}</p>
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
          ดูผลบันทุกอารมณ์ประจำวัน
        </Link>
      </footer>

      {/* <Form method="post" action={`../delete-patient/${_id}`}>
        <button
          onClick={(e) =>
            window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ป่วยนี้?")
              ? someHandler(e)
              : e.preventDefault()
          }
          type="submit"
          className="btn delete-btn"
        >
          <MdDelete />
        </button>
      </Form> */}
    </Wrapper>
  );
};

export default MoodToday;
