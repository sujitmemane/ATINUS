import { MessageCircle, MousePointer2, Repeat2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import apiService from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { Heart } from "phosphor-react";
import { Link } from "react-router-dom";

const Post = ({ post, onUpdate }) => {
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const handlePostLikeHandler = async (id) => {
    console.log("like button pressed");
    try {
      const response = await apiService.post("/api/posts/like", {
        postId: id,
      });
      onUpdate(post._id);
      console.log(response);
    } catch (error) {}
  };

  const decodeToken = async () => {
    const decoded = jwtDecode(localStorage.getItem("token"));
    setLoggedInUserId(decoded?._id);
  };
  useEffect(() => {
    decodeToken();
  });

  return (
    <div className="flex space-x-2 items-start my-4 py-2 border-b-[1px] border-[#262626]">
      <div className="w-8 h-8 shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden relative">
        <Link to={`/${post.userDetails.username}`}>
          <img
            src={
              post.userDetails.avatar.link ||
              "https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
            }
            alt=""
            className="object-cover w-full h-full z-30"
          />
        </Link>
      </div>

      <div className="flex-1 flex-col ">
        <Link
          to={`/${post.userDetails.username}`}
          className="text-sm hover:underline cursor-pointer"
        >
          {post.userDetails.username}
        </Link>
        <Link to={`/${post.userDetails.username}/post/${post._id}`}>
          <p className="text-sm text-[#CCCCCC] ">{post.content.text}</p>
          <div className="flex w-full overflow-x-auto max-w-full space-x-1 mt-2  ">
            {post.content.images.map((image) => (
              <div className="h-[200px] w-full">
                <img
                  src={image}
                  className="object-cover h-full w-full rounded-md"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full overflow-x-auto max-w-full space-y-1  mt-2 ">
            {post.content.poll.options.map((opt) => (
              <div className="bg-[#1e1e1e] cursor-pointer text-white  w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-between">
                {opt}
              </div>
            ))}
          </div>
        </Link>
        <div className="flex items-center space-x-2 text-[#CCCCCC] mt-2 ">
          <div
            onClick={() => handlePostLikeHandler(post._id)}
            className={`flex items-center text-sm space-x-1 hover:bg-[#262626] py-1 cursor-pointer px-2 rounded-xl ${
              post.likes.includes(loggedInUserId) ? "text-red-400" : ""
            } `}
          >
            <Heart size={20} weight="fill" /> <p>{post.likes.length} </p>
          </div>
          <div className="flex items-center text-sm space-x-1 hover:bg-[#262626] py-1 cursor-pointer px-2 rounded-xl">
            <MessageCircle size={15} />
            <p>{post.comments.length} </p>
          </div>
          <div className="flex items-center text-sm space-x-1 hover:bg-[#262626] py-1 cursor-pointer px-2 rounded-xl">
            <Repeat2 size={20} />
            <p>{post.reposts.length} </p>
          </div>
          <div className="flex items-center text-sm space-x-1 hover:bg-[#262626] py-1 cursor-pointer px-2 rounded-xl">
            <MousePointer2 size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
