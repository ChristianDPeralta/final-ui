import { useState, useEffect } from "react";

function PostForm({ onSubmit, initialData, cancelEdit, submitting }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setAuthor(initialData.author || "");
      setContent(initialData.content || "");
      setImageUrl(initialData.imageUrl || "");
    } else {
      resetForm();
    }
    // eslint-disable-next-line
  }, [initialData]);

  const resetForm = () => {
    setAuthor("");
    setContent("");
    setImageUrl("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Require at least one of content or imageUrl to be filled
    if (!content.trim() && !imageUrl.trim()) {
      setError("Please provide either some text or an image URL.");
      return;
    }

    setError("");
    onSubmit({
      author,
      content,
      imageUrl: imageUrl.trim() || null,
    });

    if (!initialData) resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <div className="form-group">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="What's on your mind? (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
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
