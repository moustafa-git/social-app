import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../services/postsApi";
import { useSelector } from "react-redux";
import PostCard from "../PostCard/PostCard";

function PostDetail() {
  const token = useSelector((store) => store.user.token);
  const { postId } = useParams();
  const { isPending, data: post } = useQuery({
    queryKey: ["post", [postId]],
    queryFn: () => getSinglePost(postId, token),
  });
  if (isPending) return <p>Loading Post</p>;
  return <PostCard post={post} />;
}

export default PostDetail;
