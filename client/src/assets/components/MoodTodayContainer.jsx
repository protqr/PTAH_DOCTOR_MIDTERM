import React from "react";
import MoodToday from "./MoodToday";
import Wrapper from "../wrappers/PatientsContainer";
import { useAllMoodTodayContext } from "../../pages/AllMoodToday";

import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import PageBtnContainer from "./PageBtnContainer";
dayjs.extend(buddhistEra);
dayjs.locale("th");

const MoodTodayContainer = () => {
  const { data, selectedDate } = useAllMoodTodayContext();

  if (!data) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  const { allusers: patients, totalPatients, numOfPages } = data;

  if (!patients || patients.length === 0) {
    return (
      <Wrapper>
        <h2>No patients to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="h5">
        <p>บันทึกผลการกายภาพบำบัด</p>
      </div>
      <div className="blah">
        <p>ประจำวันที่ {dayjs(selectedDate).format("D MMMM BBBB")}</p>
        <b>
          จำนวนคนไข้ {totalPatients} คน{patients.length > 1}
        </b>
      </div>
      <div className="patients">
        {patients.map((patient) => (
          <Patient key={patient.idPatient} {...patient} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default MoodTodayContainer;
