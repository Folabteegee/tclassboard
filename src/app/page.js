"use client";
import { useState, useEffect } from "react";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default function Home() {
  const [isRep, setIsRep] = useState(false);
  const [posts, setPosts] = useState([]);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "classrep123") {
      setIsRep(true);
    } else {
      alert("Incorrect password. Try again.");
    }
  };

  // Load posts from LocalStorage on mount
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("classPosts")) || [];
    setPosts(storedPosts);
  }, []);

  // Save posts to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("classPosts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts([post, ...posts]); // New post at the top
  };

  return (
    <div className="min-h-screen bg-green-200 font-montserrat font-black p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">A CLASSBOARD</h1>
        {/* Password input for class rep */}
        {!isRep ? (
          <div className="text-center">
            <input
              type="password"
              placeholder="Enter class rep password"
              className="border p-2 rounded w-full mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              onClick={handleLogin} // Button click alternative for mobile
            >
              Login as Class Rep
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Welcome, Class Rep!</h2>
            <p>You can now post updates.</p>
            <PostForm addPost={addPost} />
          </div>
        )}
        <PostList posts={posts} />
      </div>
    </div>
  );
}
