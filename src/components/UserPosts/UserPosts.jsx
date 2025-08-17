import { useSelector } from "react-redux";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getUserData } from "../../services/userApi";
import { deletePost, getUserPosts } from "../../services/postsApi";
import PostCard from "../PostCard/PostCard";
import CreatePost from "../../CreatePost/CreatePost";
function UserPosts() {
  const queryClient = useQueryClient();

  const token = useSelector((store) => store.user.token);
  const { isPending: isLoadingUser, data: user } = useQuery({
    queryKey: ["profile-data"],
    queryFn: () => getUserData(token),
  });

  const { isPending: isLoadingPosts, data: postsData } = useQuery({
    queryKey: ["user-posts", user?._id],
    queryFn: () => getUserPosts(user._id, token),
    enabled: !!user?._id, // ✅ only run when user._id exists
  });

  const { isPending: isDeletingPost, mutate } = useMutation({
    mutationFn: (postId) => deletePost(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-data"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts", user?._id] });
    },
  });

  if (isLoadingUser) return <p>Getting User Data...</p>;

  if (isLoadingPosts) return <p>Getting User Posts...</p>;

  if (!postsData.posts) return <p>No posts, plz add posts</p>;

  return (
    <>
      <CreatePost />
      {postsData.posts.map((post) => (
        <div className="flex flex-col">
          <button
            className="bg-red-600 shadow-md p-4 max-w-xl mx-auto mt-6 w-full rounded-tl-2xl rounded-tr-2xl text-white py-1 cursor-pointer"
            onClick={() => mutate(post._id)}
            disabled={isDeletingPost}
          >
            {isDeletingPost ? "deleting post..." : "Delete Post"}
          </button>
          <PostCard key={post?._id} post={post} />
        </div>
      ))}
    </>
  );
}

export default UserPosts;
