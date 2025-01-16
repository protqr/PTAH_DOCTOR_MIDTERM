import express from "express";
import {
  getAllPost,
  createPost,
  getPost,

  addComment,
} from "../controllers/PostController.js";

const router = express.Router();

router.route("/").get(getAllPost).post(createPost);
router.route("/:_id").get(getPost)
router.put('/comment/post/:_id', addComment);

export default router;
