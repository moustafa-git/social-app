import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Not valid"),
  password: z.string().nonempty("Password is Required"),
});

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values) {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      if (data.message === "success") navigate("/");
    } catch (error) {
      setError("root", { message: error.response.data.error });
    }
  }

  return (
    <form
      className="w-1/2 shadow-lg p-5 mx-auto my-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-blue-800 font-bold text-2xl">Login</h2>
      <input
        {...register("email")}
        type="email"
        placeholder="Enter your email..."
        className="input input-neutral w-full outline-0 focus:outline-0 my-2"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="Enter your password..."
        className="input input-neutral w-full outline-0 focus:outline-0 my-2"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button
        className="bg-blue-800 text-white px-3 py-2 rounded cursor-pointer"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "LogIn"}
      </button>
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
}

export default Login;
