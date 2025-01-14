import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaRegEdit,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, Form } from "react-router-dom";
import Wrapper from "../wrappers/Posture";
import PostureInfo from "./PostureInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Posture = ({ _id, noPostures, namePostures, createdAt }) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{namePostures.charAt(0)}</div>
        <div className="info">
          <h5>{noPostures}</h5>
          <p>{namePostures}</p>
        </div>
      </header>
        <Link to={`../edit-posture/${_id}`} className="btn edit-btn">
          <FaRegEdit />
        </Link>
        <Form method="post" action={`../delete-posture/${_id}`}>
          <button
            onClick={(e) =>
              window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบท่ากายภาพ?")
                ? someHandler(e)
                : e.preventDefault()
            }
            type="submit"
            className="btn delete-btn"
          >
            <MdDelete />
          </button>
        </Form>
    </Wrapper>
  );
};

export default Posture;
