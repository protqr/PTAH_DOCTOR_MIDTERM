import React, { useContext, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";
import MoodTodayContainer from "../assets/components/MoodTodayContainer.jsx";
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

const AllMoodTodayContext = createContext();

const AllMoodToday = () => {
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
      <AllMoodTodayContext.Provider
        value={{ data, searchValues, selectedDate, setSelectedDate }}
      >
        <SearchContainer />
        <Wrapper>
          {/* <DatePick onChange={(date) => setSelectedDate(date)} /> */}
          <ThaiDatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <button onClick={() => navigate("/dashboard/add-user")}>
            {/* <b>+</b> เพิ่มผู้ป่วย */}
          </button>
        </Wrapper>
        <AllHeader>คนไข้ทั้งหมด</AllHeader>
        <MoodTodayContainer />
      </AllMoodTodayContext.Provider>
    );
};

export const useAllMoodTodayContext = () => useContext(AllMoodTodayContext);

export default AllMoodToday;
