"use client";
import { useState } from "react";

export default function PostForm({ addPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const fileUrl = file ? URL.createObjectURL(file) : null;

    addPost({
      id: Date.now(),
      title,
      content,
      file: fileUrl,
      date: new Date().toLocaleString(),
    });
    setTitle("");
    setContent("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="w-full border p-2 mb-2 rounded"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-2 rounded"
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        className="w-full border p-2 mb-2 rounded"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Post
      </button>
    </form>
  );
}
