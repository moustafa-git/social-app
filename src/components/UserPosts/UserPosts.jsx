import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../services/userApi";
import { getUserPosts } from "../../services/postsApi";
import PostCard from "../PostCard/PostCard";
function UserPosts() {
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

  if (isLoadingUser) return <p>Getting User Data...</p>;

  if (isLoadingPosts) return <p>Getting User Posts...</p>;

  if (!postsData.post) return <p>No posts, plz add posts</p>;

  return postsData.posts.map((post) => (
    <PostCard key={post?._id} post={post} />
  ));
}

export default UserPosts;
