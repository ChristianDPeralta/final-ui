import { useState, useEffect } from "react";
import { getComments, addComment } from "../api";

function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Load comments when component mounts
  useEffect(() => {
    getComments(post.id).then(res => setComments(res.data));
  }, [post.id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = { author: "Anonymous", text: commentText }; // customize as needed
    const res = await addComment(post.id, newComment);
    setComments([...comments, res.data]);
    setCommentText("");
  };

  return (
    <div className="post-card">
      {/* ...other post content... */}
      <div className="post-content">{post.content}</div>

      {/* Comments */}
      <div className="comments-section">
        {comments.map(comment => (
          <div className="comment" key={comment.id}>
            <span className="comment-author">{comment.author}</span>: {comment.text}
          </div>
        ))}
        <form onSubmit={handleAddComment}>
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}

export default PostCard;
