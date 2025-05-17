import PostCard from "./PostCard";

function PostList({ posts, onEdit, onDelete, userName }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} userName={userName} />
      ))}
    </div>
  );
}

export default PostList;
