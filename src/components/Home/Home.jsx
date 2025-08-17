import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/postsApi";
import PostCard from "../PostCard/PostCard";
import CreatePost from "../../CreatePost/CreatePost";
function Home() {
  const token = useSelector((store) => store.user.token);
  const { isPending, data: posts } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getAllPosts(token),
  });
  if (isPending) return <p>Retreiveing Posts</p>;

  return (
    <>
      <CreatePost />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
}

export default Home;
