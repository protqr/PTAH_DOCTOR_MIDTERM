// authController.js
import { StatusCodes } from "http-status-codes";
import Doctor from "../models/DoctorModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const doctor = await Doctor.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "doctor created" });
};

// export const login = async (req, res) => {
//   const doctor = await Doctor.findOne({ username: req.body.username });

//   const isValidUser =
//     doctor && (await comparePassword(req.body.password, doctor.password));

//   if (!isValidUser) throw new UnauthenticatedError("ไม่สามารถเข้าสู่ระบบได้");

//   // const token = createJWT({ doctorId: doctor._id, role: doctor.role });
//   const token = createJWT({ doctorId: doctor._id, role: doctor.nametitle });


//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === "production",
//   });

//   res.status(StatusCodes.CREATED).json({ msg: "doctor logged in" });
// };

export const login = async (req, res) => {
  console.log("Login request received:", req.body);

  const doctor = await Doctor.findOne({ username: req.body.username });
  if (!doctor) {
    console.log("Doctor not found");
    throw new UnauthenticatedError("ไม่สามารถเข้าสู่ระบบได้");
  }

  const isValidUser = await comparePassword(req.body.password, doctor.password);
  if (!isValidUser) {
    console.log("Invalid password");
    throw new UnauthenticatedError("ไม่สามารถเข้าสู่ระบบได้");
  }

  const token = createJWT({ doctorId: doctor._id, role: doctor.nametitle });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "เข้าสู่ระบบสำเร็จ" });
};


export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "doctor logged out!" });
};
