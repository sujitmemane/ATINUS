import axios from "axios";
import { Input } from "keep-react";
import { ChevronRight, Instagram } from "lucide-react";
import { InstagramLogo } from "phosphor-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("button clicked");
    let firstField;
    const phoneNumberRegex = /^\d{12}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const usernameRegex = /^[a-zA-Z0-9_\.]*$/;
    if (phoneNumberRegex.test(data?.phoneOrEmailOrUsername)) {
      firstField = "phoneNumber";
    } else if (emailRegex.test(data?.phoneOrEmailOrUsername)) {
      firstField = "email";
    } else {
      firstField = "username";
    }
    if (!firstField) {
      toast.error("Please input valid email, phone number or username");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          [firstField]: data?.phoneOrEmailOrUsername,
          password: data?.password,
        }
      );
      console.log(response?.data?.token);
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userId", response?.data?.user?._id);
      toast.success(response?.data?.message);
      navigate("/");

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-[200px] overflow-none"></div>
      <div className="max-w-sm  w-full flex flex-col space-y-3.5 justify-center items-center">
        <p className="text-white">Register Now With Varthaman</p>
        <input
          className="bg-[#1e1e1e] text-white  w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Phone Number or Email or Username"
          {...register("phoneOrEmailOrUsername")}
        />

        <input
          className="bg-[#1e1e1e] text-white w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Password"
          {...register("password")}
        />
        <div className="flex justify-end w-full">
          <p className="text-white text-left text-sm ">Forgot Password?</p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="h-12 bg-white w-full text-md rounded"
        >
          Log In
        </button>

        {/* <div className="flex  text-gray-200 justify-between  w-full items-center space-x-3">
          <div className="h-[1px]  w-full flex-1 bg-white"></div>
          <span className="text-white"> Or</span>
          <div className="h-[1px]  w-full flex-1 bg-white"></div>
        </div> */}
        {/* <div className="flex items-center justify-between w-full text-white border-[#262626] border-[1px] p-3 cursor-pointer rounded-lg">
          <InstagramLogo className="text-white " size={40} />
          <p className="text-sm">Continue With Instagram</p>
          <ChevronRight size={30} />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
