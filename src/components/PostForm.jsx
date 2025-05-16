import { useState, useEffect } from "react";

function PostForm({ onSubmit, initialData, cancelEdit, submitting }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setAuthor(initialData.author);
      setContent(initialData.content);
      setImageUrl(initialData.imageUrl || "");
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setAuthor("");
    setContent("");
    setImageUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !content) return;

    onSubmit({
      author,
      content,
      imageUrl: imageUrl.trim() || null,
    });

    if (!initialData) resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
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
