import { useState, useEffect } from "react";
import { getComments, addComment } from "../api";

function PostCard({ post, onEdit, onDelete }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  // Fetch comments for this post
  useEffect(() => {
    let isMounted = true;
    getComments(post.id)
      .then(res => {
        if (isMounted) setComments(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        if (isMounted) setComments([]);
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
      // Optionally show an error
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
      // Optionally, make an API call to persist the like
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.origin + "/#post-" + post.id;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post on SocialSphere!",
          url,
        });
        setShareMsg("Shared!");
        setTimeout(() => setShareMsg(""), 1200);
      } catch {
        setShareMsg("Share cancelled.");
        setTimeout(() => setShareMsg(""), 1200);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareMsg("Link copied!");
        setTimeout(() => setShareMsg(""), 1200);
      } catch {
        setShareMsg("Failed to copy link.");
        setTimeout(() => setShareMsg(""), 1200);
      }
    }
  };

  return (
    <div className="post-card" id={`post-${post.id}`}>
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">
            {post.author ? post.author[0].toUpperCase() : "👤"}
          </div>
          <span className="author-name">{post.author || "Anonymous"}</span>
        </div>
        <div className="post-actions">
          {onEdit && <button onClick={() => onEdit(post)} title="Edit">✏️</button>}
          {onDelete && <button onClick={() => onDelete(post.id)} title="Delete">🗑️</button>}
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.imageUrl &&
        <div className="post-image">
          <img src={post.imageUrl} alt="post" style={{ maxWidth: "100%", borderRadius: 8 }} />
        </div>
      }
      <div className="post-interactions" style={{ margin: "14px 0 3px 0", display: "flex", gap: 14, alignItems: "center" }}>
        <button
          className={`like-btn${liked ? " liked" : ""}`}
          onClick={handleLike}
          aria-label="Like"
        >
          ❤️ {likeCount}
        </button>
        <button className="share-btn" onClick={handleShare} aria-label="Share">
          🔗 Share
        </button>
        {shareMsg && <span className="share-msg" style={{ fontSize: ".93em", color: "#1976d2" }}>{shareMsg}</span>}
      </div>
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
        <form onSubmit={handleAddComment} style={{ marginTop: 8, display: "flex", gap: 7 }}>
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            style={{
              flex: 1,
              padding: "7px",
              borderRadius: "5px",
              border: "1px solid #333",
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
