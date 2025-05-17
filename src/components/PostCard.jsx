import { useState, useEffect } from "react";
import { getComments, addComment } from "../api";

function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Fetch comments for this post
  useEffect(() => {
    let isMounted = true;
    getComments(post.id)
      .then(res => {
        if (isMounted) setComments(res.data);
      })
      .catch(() => {
        if (isMounted) setComments([]); // Avoid breaking on error
      });
    return () => { isMounted = false; };
  }, [post.id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await addComment(post.id, {
        author: "Anonymous",
        text: commentText
      });
      setComments([...comments, res.data]);
      setCommentText("");
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">
            {post.author ? post.author[0].toUpperCase() : "👤"}
          </div>
          <span className="author-name">{post.author || "Anonymous"}</span>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.imageUrl &&
        <div className="post-image">
          <img src={post.imageUrl} alt="post" />
        </div>
      }
      {/* Comments Section */}
      <div className="comments-section">
        {comments.length === 0 && (
          <div style={{ color: "#888", fontSize: "0.93em" }}>No comments yet.</div>
        )}
        {comments.map(comment => (
          <div className="comment" key={comment.id}>
            <span className="comment-author">{comment.author}</span>: {comment.text}
          </div>
        ))}
        <form onSubmit={handleAddComment} style={{ marginTop: 8 }}>
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            style={{
              width: "70%",
              padding: "7px",
              borderRadius: "5px",
              border: "1px solid #333",
              marginRight: "7px"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "7px 16px",
              background: "var(--primary, #1976d2)",
              color: "#fff",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostCard;
