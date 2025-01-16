import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io("http://localhost:5100", { reconnection: true });

const RespondBlog = () => {
  const location = useLocation();
  const { post } = location.state || {};
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  if (!post) {
    return <p>ไม่พบข้อมูลกระทู้</p>;
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/v1/posts/${post._id}`);
        setComments(data.post.comments || []);
      } catch (error) {
        console.error(error);
        toast.error("ไม่สามารถโหลดความคิดเห็นได้");
      }
    };

    fetchComments();

    socket.on("new-comment", (updatedComments) => {
      setComments(updatedComments);
    });

    return () => {
      socket.off("new-comment");
    };
  }, [post._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast.error("กรุณาใส่ความคิดเห็น");
      return;
    }

    try {
      const { data } = await axios.put(`/api/v1/posts/comment/post/${post._id}`, {
        comment: newComment,
      });
      if (data.success) {
        setNewComment("");
        toast.success("เพิ่มความคิดเห็นสำเร็จ");
        socket.emit("comment", data.post.comments);
      }
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="border p-6 rounded-lg shadow-lg bg-white mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{post.title}</h2>
        <p className="text-gray-700 mb-6 text-justify">{post.content}</p>
        <div className="text-sm text-gray-500">
          โพสต์เมื่อ: {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">ความคิดเห็นทั้งหมด:</h3>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-300"
              >
                <p className="font-medium text-gray-900">{comment.postedBy?.name || "Guest"}</p>
                <p className="text-gray-700 text-sm mt-2">{comment.text}</p>
                <p className="text-sm text-gray-500 mt-2">
                  แสดงความคิดเห็นเมื่อ: {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : "ไม่ทราบเวลา"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ยังไม่มีความคิดเห็น</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <textarea
          name="reply"
          rows="4"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          ส่งความคิดเห็น
        </button>
      </form>
    </div>
  );
};

export default RespondBlog;