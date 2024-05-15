import React, { useContext, useEffect, useRef, useState } from "react";

import { Toggle } from "keep-react";
import { AppContext } from "../../context/AppContextProvider";
import EditBio from "./EditBio";
import { Lock } from "lucide-react";
const EditProfile = () => {
  const { handleCloseModal } = useContext(AppContext);
  const [editBio, setEditBio] = useState(false);
  const [editLink, setEditLink] = useState(false);
  const [textArea, setTextArea] = useState(
    "Front-end Web 🕸️ Developer 🏗️| Cinephile 🎥 | Shavite 🔱 | Blogger 📰 | Twitterholic 🐦"
  );
  const [link, setLink] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        setEditBio(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [textAreaRef]);
  return (
    <div className="bg-[#0f0f0f] p-4 text-white m-0">
      <div className="flex items-center justify-between text-white py-2">
        <div className="flex-1 border-[#1e1e1e] border-b-[1px] py-2">
          <p className="font-semibold">Name</p>
          <p className="flex space-x-1 items-center ">
            {" "}
            <Lock size={20} /> <span>Sujit(@sujitmemane) </span>
          </p>
        </div>
        <div className="w-12 h-12 shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
          <img
            src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className=" text-white py-2">
        <div className="flex-1 border-[#1e1e1e] border-b-[1px] py-1">
          <p className="font-semibold">Bio</p>
          {editBio ? (
            <textarea
              placeholder="Start writing ... "
              value={textArea}
              ref={textAreaRef}
              onChange={(event) => {
                setTextArea(event.target.value);
                event.target.style.height = "auto";
                event.target.style.height = event.target.scrollHeight + "px";
              }}
              className="w-full  bg-transparent border-0 p-0  resize-none focus:outline-none focus:ring-0 placeholder:text-sm"
            ></textarea>
          ) : (
            <p
              className={`h-[${textAreaRef?.current?.scrollHeight}px]`}
              onDoubleClick={() => setEditBio(true)}
            >
              {textArea}
            </p>
          )}
        </div>
      </div>
      <div className=" text-white py-2">
        <div className="flex-1 border-[#1e1e1e] border-b-[1px] py-2">
          <p className="font-semibold">Link</p>
          <p className="text-blue-500">https://thesujitmemane.vercel.app/</p>
        </div>
      </div>
      <div className=" text-white py-2 ">
        <div className="flex justify-between  py-2">
          <p className="font-semibold">Private Profile</p>
          <Toggle bgColor="slate" label="Slate" size="lg" />
        </div>
      </div>
      <button
        onClick={handleCloseModal}
        className="py-2 bg-white text-gray-900 w-full text-md rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Done
      </button>
    </div>
  );
};

export default EditProfile;
