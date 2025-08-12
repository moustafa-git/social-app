import { useState } from "react";
import CommentRow from "./CommentRow";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
      <Link to={`/post/${post._id}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={`${post.user.photo}`} alt="User" />
            </div>
          </div>
          <div>
            <p className="font-bold">{post.user.name}</p>
            <p className="text-sm text-gray-400">{post.createdAt}</p>
          </div>
        </div>

        <p className="mb-3">{post.body}</p>

        {post.image !== undefined ? (
          <img src={`${post.image}`} className="rounded-lg mb-4" alt="Post" />
        ) : (
          "No Image have been Uploaded"
        )}
      </Link>
      <div className="flex gap-3 text-sm text-gray-500">
        <button className="btn btn-ghost btn-sm">👍 Like</button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment
        </button>
        <button className="btn btn-ghost btn-sm">↪️ Share</button>
      </div>

      {/* Toggle Comments Section */}
      {showComments && (
        <div className="mt-4 overflow-scroll max-h-[200px]">
          {/* Existing Comments */}
          {post.comments.map((comment) => (
            <CommentRow key={comment._id} comment={comment} />
          ))}

          {/* New Comment Input */}
          <form className="flex  gap-5 content-between items-center">
            <input
              type="text"
              name="content"
              placeholder="Write a comment..."
              className="input input-bordered w-full"
            />
            <button className="px-3 py-2 bg-blue-400 text-white rounded-xl">
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
