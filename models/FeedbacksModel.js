import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    doctor_response: { type: String, required: true },
    feedback_type: {
      type: String,
      enum: ["ทำได้ดี", "ควรปรับปรุง"],
      required: true,
    },
    evaluation_date: { type: String, required: true },
    createdBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
  },
  { versionKey: false, collection: "feedback", timestamps: true }
);

export default mongoose.models.feedback ||
  mongoose.model("feedback", feedbackSchema);
