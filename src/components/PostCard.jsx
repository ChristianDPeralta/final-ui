import { useState, useEffect } from "react";
import { getComments, addComment } from "../api";

function PostCard({ post, onEdit, onDelete, userName }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

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
      // If you want to support userId, add it here
      const payload = {
        content: commentText,
        post: { id: post.id }
      };
      // Optionally, if you manage userId:
      // if (userId) payload.user = { id: userId };

      const res = await addComment(payload);
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
          title: "Check out this post!",
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

  // For post avatar
  const postAvatar =
    post.author && post.author.trim()
      ? post.author.trim()[0].toUpperCase()
      : "A";

  return (
    <div className="post-card" id={`post-${post.id}`}>
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">
            {postAvatar}
          </div>
          <span className="author-name">{post.author || "Anonymous"}</span>
        </div>
        <div className="post-actions">
          {onEdit && <button onClick={() => onEdit(post)} title="Edit">✏️</button>}
          {onDelete && <button onClick={() => onDelete(post.id)} title="Delete">🗑️</button>}
        </div>
      </div>
      <div className="post-content" style={{ color: "var(--text-color)" }}>{post.content}</div>
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
        {comments.map(comment => {
          const cAuthor = comment.author || comment.user?.displayName || comment.user?.username || "Anonymous";
          const cAvatar = cAuthor && cAuthor.trim() ? cAuthor.trim()[0].toUpperCase() : "A";
          return (
            <div className="comment" key={comment.id} style={{ color: "var(--text-color)" }}>
              <span className="author-avatar" style={{
                width: 26, height: 26, fontSize: 13, marginRight: 6, display: "inline-flex", alignItems: "center", justifyContent: "center"
              }}>
                {cAvatar}
              </span>
              <span className="comment-author">{cAuthor}</span>: {comment.content}
            </div>
          );
        })}
        <form onSubmit={handleAddComment} style={{ marginTop: 8, display: "flex", gap: 7, alignItems: "center" }}>
          <input
            type="text"
            value={userName.trim() || "Anonymous"}
            disabled
            placeholder="Your name"
            style={{
              width: 110,
              padding: "7px",
              borderRadius: "5px",
              border: "1px solid #333",
              background: "#28292b",
              color: "var(--text-color)",
              fontWeight: 600,
              opacity: 1
            }}
            maxLength={28}
            readOnly
            tabIndex={-1}
          />
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            style={{
              flex: 1,
              padding: "7px",
              borderRadius: "5px",
              border: "1px solid #333",
              background: "#28292b",
              color: "var(--text-color)"
            }}
            maxLength={300}
          />
          <button
            type="submit"
            className="comment-btn"
            disabled={!commentText.trim()}
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostCard;
