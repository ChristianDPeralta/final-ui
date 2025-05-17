function PostCard({ post, onEdit, onDelete }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="author-info">
          <span className="author-avatar">
            {(post.author && post.author.trim()) ? post.author.charAt(0) : "A"}
          </span>
          <div>
            <div className="author-name">{(post.author && post.author.trim()) ? post.author : "Anonymous"}</div>
            <div className="post-time">{new Date(post.timestamp).toLocaleString()}</div>
          </div>
        </div>
        <div className="post-actions">
          <button onClick={() => onEdit(post)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(post.id)} className="delete-btn">Delete</button>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.imageUrl && (
        <div className="post-image">
          <img src={post.imageUrl} alt="Post visual content" />
        </div>
      )}
      <div className="post-footer">
        <button className="like-btn">Like</button>
        <button className="comment-btn">Comment</button>
      </div>
    </div>
  );
}

export default PostCard;
