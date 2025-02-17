import { StatusCodes } from "http-status-codes";
import FeedbacksModel from "../models/FeedbacksModel.js";

export const save = async (req, res) => {
    try {
        const { user_id, doctor_response, feedback_type, evaluation_date } = req.body;

        if (!user_id || !doctor_response || !feedback_type) {
            return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        const newFeedback = new FeedbacksModel({
            user_id,
            doctor_response,
            feedback_type,
            evaluation_date,
        });

        await newFeedback.save();

        res.status(201).json({ message: "บันทึก feedback สำเร็จ!", feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกข้อมูล", details: error });
    }
};

export const getFeedbackByDateAndId = async (req, res) => {
    try {
        const { id, date } = req.body;

        if (!id || !date) {
            return res.status(400).json({ error: "กรุณาระบุ ID และวันที่" });
        }

        const evaluations = await FeedbacksModel.find({ user_id: id, evaluation_date: date });

        if (evaluations.length === 0) {
            return res.status(404).json({ message: "ไม่พบข้อมูล Feedback ในวันนี้" });
        }

        res.status(200).json(evaluations);

    } catch (error) {
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล", details: error.message });
    }
};