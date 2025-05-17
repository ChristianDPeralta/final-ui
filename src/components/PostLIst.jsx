import PostCard from "./PostCard";

function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PostList;
