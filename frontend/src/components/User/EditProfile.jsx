import React, { useContext, useEffect, useRef, useState } from "react";

import { Toggle } from "keep-react";
import { AppContext } from "../../context/AppContextProvider";
import EditBio from "./EditBio";
import { Lock } from "lucide-react";
import { Dropdown } from "flowbite-react";
import { useForm } from "react-hook-form";
import apiService from "../../services/api";
const EditProfile = ({ user, getProfile }) => {
  const { handleCloseModal } = useContext(AppContext);
  const {
    register,
    formState: { errors, isValid },
    setValue,
    handleSubmit,
  } = useForm();
  const [textArea, setTextArea] = useState(user?.bio || "Write Bio");
  const [isPrivate, setIsPrivate] = useState(false);
  useEffect(() => {
    setValue("fullName", user?.fullName);
    setValue("link", user?.link);
    setValue("oneWord", user?.oneWord);
    setIsPrivate(user?.isPrivate);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await apiService.post("/api/users/update", {
        fullName: data?.fullName,
        link: data?.link,
        bio: textArea,
        oneWord: data?.oneWord,
        isPrivate,
      });
      console.log(response);
      getProfile();
      handleCloseModal();
    } catch (error) {}
  };

  return (
    <div className="bg-[#0f0f0f] p-4 text-white m-0">
      <div className="flex items-center justify-between text-white py-2">
        <div className="flex-1 border-[#1e1e1e] border-b-[1px] py-2">
          <p className="font-semibold">Full Name</p>

          <input
            type="text"
            {...register("fullName", {
              required: {
                value: true,
                message: "Full Name is required",
              },
            })}
            className="border-none w-full text-md px-0 outline-none flex-1 bg-transparent focus:placeholder-gray-400 focus:outline-none ring-0 focus:ring-0 shadow-none focus:shadow-none  focus:border-none disabled:opacity-50"
          />
        </div>
      </div>
      <div className=" text-white py-2">
        <div className="flex-1 border-[#1e1e1e] border-b-[1px] py-1">
          <p className="font-semibold">Bio</p>
          <textarea
            placeholder="Start writing ... "
            value={textArea}
            onChange={(event) => {
              setTextArea(event.target.value);
              event.target.style.height = "auto";
              event.target.style.height = event.target.scrollHeight + "px";
            }}
            className="w-full  bg-transparent border-0 p-0  resize-none focus:outline-none focus:ring-0 placeholder:text-sm"
          ></textarea>
        </div>
      </div>
      <div className=" text-white py-2">
        <div className="flex-1 border-[#1e1e1e] border-b-[1px] py-2">
          <p className="font-semibold">Link</p>

          <input
            type="text"
            {...register("link", {
              required: {
                value: true,
                message: "Link is required",
              },
            })}
            className="border-none w-full text-blue-500 text-md px-0 outline-none flex-1 bg-transparent focus:placeholder-gray-400 focus:outline-none ring-0 focus:ring-0 shadow-none focus:shadow-none  focus:border-none disabled:opacity-50"
          />
        </div>
        <div className="flex-1 border-[#1e1e1e] border-b-[1px] py-2">
          <p className="font-semibold">Describe Yourself In One Word</p>

          <input
            type="text"
            {...register("oneWord", {
              required: {
                value: true,
                message: "One Word is required",
              },
            })}
            className="border-none w-full text-md px-0 outline-none flex-1 bg-transparent focus:placeholder-gray-400 focus:outline-none ring-0 focus:ring-0 shadow-none focus:shadow-none  focus:border-none disabled:opacity-50"
          />
        </div>
      </div>
      <div className=" text-white py-2 ">
        <div className="flex justify-between  py-2">
          <p className="font-semibold">Private Profile</p>
          <Toggle
            onChange={setIsPrivate}
            bgColor="slate"
            label="Slate"
            size="lg"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid}
        className="py-2 bg-white disabled:opacity-70 text-gray-900 w-full text-md rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Done
      </button>
    </div>
  );
};

export default EditProfile;
