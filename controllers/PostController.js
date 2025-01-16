import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Post from "../models/PostModel.js";

export const getAllPost = async (req, res) => {
  const { search, sort, isDeleted } = req.query;

  const queryObject = {};
  if (typeof isDeleted !== "undefined") {
    queryObject.isDeleted = isDeleted === "true";
  } else {
    queryObject.isDeleted = { $nin: [true] };
  }

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {
    ใหม่ที่สุด: "-createdAt",
    เก่าที่สุด: "createdAt",
    "เรียงจาก ก-ฮ": "title",
    "เรียงจาก ฮ-ก": "-title",
  };

  const sortKey = sortOptions[sort] || sortOptions["ใหม่ที่สุด"];
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find(queryObject)
    .populate("postedBy", "name")
    .sort(sortKey)
    .skip(skip)
    .limit(limit)
    .lean();

  const totalPosts = await Post.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPosts / limit);

  res.status(StatusCodes.OK).json({ totalPosts, numOfPages, currentPage: page, posts });
};

export const createPost = async (req, res) => {
  const { title, content, tag, postedBy } = req.body;

  if (!postedBy) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "PostedBy is required" });
  }

  try {
    const newPost = await Post.create({ title, content, tag, postedBy });
    res.status(StatusCodes.CREATED).json({ post: newPost });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID format" });
    }

    const post = await Post.findById(postId).populate("comments.postedBy", "name");

    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: `No post with id: ${postId}` });
    }

    res.status(StatusCodes.OK).json({ success: true, post });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
  }
};





export const addComment = async (req, res) => {
  const { comment } = req.body;
  const { _id } = req.params;

  // ตรวจสอบว่า ID ของโพสต์ถูกต้อง
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid post ID" });
  }

  // ตรวจสอบว่าเนื้อหาความคิดเห็นไม่ว่างเปล่า
  if (!comment || comment.trim() === "") {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Comment text is required" });
  }

  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Post not found" });
    }

    const userId = req.user?._id || new mongoose.Types.ObjectId(); // ใช้ ObjectId แบบใหม่หากไม่มี user
    const refModel = req.user?.role === "MPersonnel" ? "MPersonnel" : "User"; // ระบุโมเดล

    // เพิ่มความคิดเห็นใหม่
    post.comments.push({
      text: comment,
      postedBy: userId,
      refModel: refModel,
    });

    await post.save();

    // โหลดโพสต์ใหม่พร้อมข้อมูลผู้โพสต์ในความคิดเห็น
    const updatedPost = await Post.findById(_id).populate("comments.postedBy", "name");
    res.status(StatusCodes.OK).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
