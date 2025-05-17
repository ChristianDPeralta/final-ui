import { useState, useEffect } from "react";
import "../index.css";

function PostForm({ onSubmit, initialData, cancelEdit, submitting, userName }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content || "");
      setImageUrl(initialData.imageUrl || "");
    } else {
      resetForm();
    }
    // eslint-disable-next-line
  }, [initialData]);

  const resetForm = () => {
    setContent("");
    setImageUrl("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl.trim()) {
      setError("Please provide either some text or an image URL.");
      return;
    }
    setError("");
    onSubmit({
      content: content.trim(),
      imageUrl: imageUrl.trim() || null,
    });
    if (!initialData) resetForm();
  };

  const avatar =
    (userName && userName.trim()
      ? userName.trim()[0].toUpperCase()
      : "A");

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && (
        <div
          style={{
            color: "#e53935",
            background: "#fff2f2",
            borderRadius: "6px",
            padding: "7px 11px",
            marginBottom: "10px",
            fontSize: "0.97rem",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
        className="form-group"
      >
        <div
          className="author-avatar"
          style={{
            marginRight: 10,
            fontSize: 20,
            width: 44,
            height: 44,
            minWidth: 44,
            minHeight: 44,
            fontWeight: 700,
            backgroundColor: "var(--secondary)",
          }}
        >
          {avatar}
        </div>
        <span style={{ fontWeight: 600 }}>{userName.trim() || "Anonymous"}</span>
      </div>

      <div className="form-group">
        <textarea
          placeholder="What's on your mind? (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
          style={{ color: "var(--text-color)", background: "inherit" }}
        />
      </div>

      <div className="form-group">
        <input
          type="url"
          placeholder="Paste image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={submitting}
        />
      </div>

      {imageUrl && (
        <div className="image-preview">
          <img
            src={imageUrl}
            alt="Preview"
            onError={(e) => (e.target.style.display = "none")}
            style={{ maxWidth: "100%", borderRadius: "6px" }}
          />
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="primary-btn" disabled={submitting}>
          {initialData ? "Update" : "Post"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={cancelEdit}
            className="secondary-btn"
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PostForm;
