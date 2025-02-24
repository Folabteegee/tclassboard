"use client";
import { useState } from "react";

export default function PostList({ posts, isRep }) {
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});

  // Function to add a comment
  const addComment = (postId) => {
    if (!commentInput[postId]?.trim()) return;

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentInput[postId]],
    }));

    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded-lg bg-white shadow-md"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-gray-500">{post.date}</p>

            {post.file && (
              <a
                href={post.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 underline block mt-2"
              >
                View Attachment
              </a>
            )}

            {/* Comment Section */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full border p-2 rounded text-sm"
                value={commentInput[post.id] || ""}
                onChange={(e) =>
                  setCommentInput({
                    ...commentInput,
                    [post.id]: e.target.value,
                  })
                }
              />
              <button
                onClick={() => addComment(post.id)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              >
                Add Comment
              </button>

              {/* Show comments */}
              {comments[post.id]?.length > 0 && (
                <div className="mt-3 space-y-1 text-sm">
                  <h3 className="font-bold">Comments:</h3>
                  {comments[post.id].map((comment, index) => (
                    <p key={index} className="bg-gray-100 p-2 rounded">
                      {comment}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
