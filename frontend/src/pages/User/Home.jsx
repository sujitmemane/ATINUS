import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import apiService from "../../services/api";
import { Heart, MessageCircle, MousePointer2, Repeat2 } from "lucide-react";
import Post from "../../components/Post/Post";

const Home = () => {
  const { handleNewPostOpener } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const getAllPostsData = async () => {
    try {
      const response = await apiService.get("/api/posts/all");
      setPosts(response?.data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllPostsData();
  }, []);

  const handleUpdatedPost = async (id) => {
    try {
      const response = await apiService.get(`/api/posts/post/${id}`);

      const updatedPost = response.data.data;
      console.log("api");
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? updatedPost : post))
      );
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="max-w-xl   w-full text-white px-2">
        <button
          onClick={handleNewPostOpener}
          className="flex items-center justify-between disabled:cursor-not-allowed  space-x-4  w-full border-b-[1px] border-[#262626] py-4  "
        >
          <div className="flex items-center  space-x-4">
            <div className="flex  items-center space-y-2 flex-col h-full justify-center w-10  ">
              <div className="w-10 h-10 shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
                <img
                  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  alt=""
                  className="object-cover w-full h-full "
                />
              </div>
            </div>

            <div className="">
              <p className="text-sm text-white/40">Start writing </p>
            </div>
          </div>
          <button className="px-4 py-1 font-semibold bg-white text-gray-900 rounded-full">
            Post
          </button>
        </button>
        <div className="text-white">
          {posts.map((post) => (
            <Post
              post={post}
              onUpdate={handleUpdatedPost}
         
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
