import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
    postedBy: { type: String, required: true }, // เปลี่ยนเป็น String
    refModel: { type: String , enum: ['User', 'MPersonnel'] },
  });
  
  const commentSchema = new mongoose.Schema(
    {
      text: { type: String, required: true },
      postedBy: { type: String, required: true },
      refModel: { type: String, enum: ["User", "MPersonnel"] },
      replies: [replySchema],
    },
    { timestamps: true } // เปิดใช้งาน timestamps
  );
  
    
    
    const postSchema = new mongoose.Schema(
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        tag: { type: String, required: true },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        comments: [commentSchema],
        isDeleted: { type: Boolean, default: false },
      },
      { timestamps: true }
    );

const Post = mongoose.model("Post", postSchema);

export default Post;