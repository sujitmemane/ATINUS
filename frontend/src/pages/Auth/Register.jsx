import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { InstagramLogo } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Spinner } from "keep-react";
const Register = () => {
  const [form, setForm] = useState({
    phoneOrEmail: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dirtiedField, setDirtiedField] = useState(false);
  const navigate = useNavigate();

  const validationCheck = async (form) => {
    let firstField;

    const isPhoneNumber = /^[0-9]+$/.test(form.phoneOrEmail);
    console.log("Phone Number", isPhoneNumber);
    if (isPhoneNumber) {
      firstField = "phoneNumber";
    } else {
      firstField = "email";
    }
    console.log(firstField);
    const response = await axios.post(
      "http://localhost:4000/api/users/validate",
      {
        [firstField]: form?.phoneOrEmail,
        fullName: form.fullName,
        username: form.username,
        password: form.password,
      }
    );
    console.log(response);
    console.log(response?.data?.errors);
    setErrors(response?.data?.errors);
  };

  const [debouncedValidationCheck] = useState(() =>
    debounce(validationCheck, 1000)
  );

  useEffect(() => {
    debouncedValidationCheck(form);
    return () => {
      debouncedValidationCheck.cancel();
    };
  }, [form, dirtiedField]);

  const onSubmit = async () => {
    setLoading(true);
    let firstField;
    const isPhoneNumber = /^[0-9]+$/.test(form.phoneOrEmail);
    if (isPhoneNumber) {
      firstField = "phoneNumber";
    } else {
      firstField = "email";
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        {
          [firstField]: form?.phoneOrEmail,
          fullName: form?.fullName,
          username: form?.username,
          password: form?.password,
        }
      );

      console.log(response);

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userId", response?.data?.user?._id);
      toast.success(response?.data?.message);
      navigate("/");

      setForm({ phoneOrEmail: "", fullName: "", username: "", password: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setDirtiedField(true);
  };

  const isDisabled = Object.keys(errors).length === 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-[200px] overflow-none"></div>
      <div className="max-w-sm  w-full flex flex-col space-y-3.5 justify-center items-center">
        <p className="text-white">Register Now With Varthaman</p>
        <div className="w-full flex flex-col space-y-1 ">
          <input
            className="bg-[#1e1e1e] text-white w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Phone Number or Email"
            value={form?.phoneOrEmail}
            name="phoneOrEmail"
            onChange={handleInputChange}
          />
          <p className="text-red-400 text-xs text-left ml-1">
            {errors?.phoneNumber?.message || errors?.email?.message}
          </p>
        </div>
        <div className="w-full flex flex-col space-y-1 ">
          <input
            className="bg-[#1e1e1e] text-white w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Full Name"
            value={form?.fullName}
            name="fullName"
            onChange={handleInputChange}
          />
          <p className="text-red-400 text-xs text-left ml-1">
            {errors?.fullName?.message}
          </p>
        </div>

        <div className="w-full flex flex-col space-y-1 ">
          <input
            className="bg-[#1e1e1e] text-white w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Username"
            value={form?.username}
            name="username"
            onChange={handleInputChange}
          />
          <p className="text-red-400 text-xs text-left ml-1">
            {errors?.username?.message}
          </p>
        </div>
        <div className="w-full flex flex-col space-y-1 ">
          <input
            className="bg-[#1e1e1e] text-white w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Password"
            value={form?.password}
            name="password"
            onChange={handleInputChange}
          />
          <p className="text-red-400 text-xs text-left ml-1">
            {errors?.password?.message}
          </p>
        </div>
        <button
          disabled={!isDisabled || loading}
          onClick={onSubmit}
          className="h-12 bg-white w-full text-md rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Spinner color="gray" />} <span> Sign Up</span>
        </button>
        <Link to="/auth/login" className="text-white hover:underline">
          Already have account?
        </Link>
        {/* <div className="flex  text-gray-200 space-x-1 items-center">
          <div className="h-[1px] bg-white flex-1"></div>
          <span> Or</span>
          <div className="h-[1px] bg-white flex-1"></div>
        </div>
        <div className="flex items-center justify-between w-full text-white border-[#262626] border-[1px] p-3 cursor-pointer rounded-lg">
          <InstagramLogo className="text-white " size={40} />
          <p className="text-sm">Continue With Instagram</p>
          <ChevronRight size={30} />
        </div> */}
      </div>
    </div>
  );
};

export default Register;
