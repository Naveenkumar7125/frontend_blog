// App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import custom CSS

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://backend-blog-5bvt.onrender.com/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://backend-blog-5bvt.onrender.com/api/posts", { title, content });
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">📝 My Blog</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button type="submit">Post Blog</button>
        </form>

        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to write one!</p>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <div key={post._id} className="post">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <span className="timestamp">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
