import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createNewPost } from "../services/postsApi";
import { useSelector } from "react-redux";
import { getUserData } from "../services/userApi";

function CreatePost() {
  const token = useSelector((store) => store.user.token);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: user } = useQuery({
    queryKey: ["profile-data"],
    queryFn: () => getUserData(token),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newPost) => createNewPost(token, newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts", user?._id] });
      reset();
    },
  });

  function onSubmit(data) {
    let formData = new FormData();
    formData.append("body", data.body);
    formData.append("image", data.image[0]);
    mutate(formData);
  }

  return (
    <section className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex  flex-col gap-2 content-between items-center"
      >
        <input
          type="text"
          name="content"
          placeholder="Write the body"
          className="input input-bordered w-9/12"
          {...register("body")}
        />
        <input
          type="file"
          name="image"
          placeholder="upload Image"
          className="cursor-pointer"
          {...register("image")}
        />
        <button
          className="px-3 py-2 bg-blue-400 text-white rounded-xl w-3/12 cursor-pointer"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Uploading Post..." : "Add Post"}
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
