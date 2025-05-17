import { useState, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost } from "./api";
import Header from "./components/Header";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import "./index.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    getPosts()
      .then((res) => {
        setPosts(res.data);
        setError(null);
      })
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  };

  const handleCreate = (data) => {
    setSubmitting(true);
    createPost({ ...data, author: userName })
      .then((res) => {
        setPosts([res.data, ...posts]);
      })
      .finally(() => setSubmitting(false));
  };

  const handleUpdate = (id, data) => {
    setSubmitting(true);
    updatePost(id, { ...data, author: userName })
      .then((res) => {
        setPosts(posts.map((p) => (p.id === id ? res.data : p)));
        setEditing(null);
      })
      .finally(() => setSubmitting(false));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id).then(() => {
        setPosts(posts.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div className="app">
      <Header userName={userName} setUserName={setUserName} />
      <div className="app-container">
        <PostForm
          onSubmit={editing ? (data) => handleUpdate(editing.id, data) : handleCreate}
          initialData={editing}
          cancelEdit={() => setEditing(null)}
          submitting={submitting}
          userName={userName}
        />

        {loading && <p>Loading posts...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <PostList
            posts={posts}
            onEdit={setEditing}
            onDelete={handleDelete}
            userName={userName}
          />
        )}
      </div>
    </div>
  );
}

export default App;
