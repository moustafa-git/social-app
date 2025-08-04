import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const schema = z
  .object({
    name: z.string().nonempty("Name is Required").min(3, "Min 3 characters"),
    email: z.string().nonempty("Email is required").email("Not valid"),
    password: z.string().nonempty("Password is Required"),
    rePassword: z.string().nonempty("Confirm password is required"),
    dateOfBirth: z.string().nonempty("Date is Required"),
    gender: z.enum(["male", "female"]),
  })
  .refine(
    (data) => {
      return data.password == data.rePassword;
    },
    {
      message: "Password Not Match",
      path: ["rePassword"],
    }
  );
function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values) {
    console.log(values);

    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      if (data.message === "success") navigate("/login");
    } catch (error) {
      setError("root", { message: error.response.data.error });
    }
  }

  return (
    <form
      className="w-1/2 shadow-lg p-5 mx-auto my-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-blue-800 font-bold text-2xl">Register Now</h2>
      <input
        {...register("name")}
        type="text"
        placeholder="Enter your name..."
        className="input input-neutral w-full outline-0 focus:outline-0 my-2"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
      <input
        {...register("rePassword")}
        type="password"
        placeholder="confirm you password..."
        className="input input-neutral w-full outline-0 focus:outline-0 my-2"
      />
      {errors.rePassword && (
        <p className="text-red-500">{errors.rePassword.message}</p>
      )}
      <input
        {...register("dateOfBirth")}
        type="date"
        className="input input-neutral w-full outline-0 focus:outline-0 my-2"
      />
      {errors.dateOfBirth && (
        <p className="text-red-500">{errors.dateOfBirth.message}</p>
      )}
      <div className="my-2">
        <input
          {...register("gender")}
          type="radio"
          name="gender"
          className="radio radio-primary"
          id="male"
          value={"male"}
        />
        <label htmlFor="male" className="px-2">
          Male
        </label>
        <input
          {...register("gender")}
          type="radio"
          name="gender"
          id="female"
          className="radio radio-primary"
          value={"female"}
        />
        <label htmlFor="female" className="px-2">
          Female
        </label>
      </div>
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
      <button
        className="bg-blue-800 text-white px-3 py-2 rounded cursor-pointer"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Sign Up"}
      </button>
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
}

export default Register;
