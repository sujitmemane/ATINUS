import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import EditProfile from "../../components/User/EditProfile";

const Profile = () => {
  const { setIsModalOpen, setModalContent, setModalSize } =
    useContext(AppContext);
  const handleEditProfileOpener = () => {
    setModalSize("xl");
    setModalContent(<EditProfile />);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const getProfile = () => {
      try {
      } catch (error) {}
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="max-w-xl   w-full text-white px-2">
        <div className="w-full h-[100px] bg-orange-400 mb-2"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Sujit</h1>
            <p>sujitmemane</p>
          </div>
          <div className="w-20 h-20 shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
            <img
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="my-2">
          <p>
            Front-end Web 🕸️ Developer 🏗️| Cinephile 🎥 | Shavite 🔱 | Blogger
            📰 | Twitterholic 🐦
          </p>
          <div className="flex justify-between items-center text-[#777777] space-x-2">
            <div className="flex items-center space-x-2 text-sm">
              <p className="hover:underline cursor-pointer">
                {" "}
                <span className="text-white"> 51</span> Followers
              </p>
              <p className="hover:underline cursor-pointer">
                {" "}
                <span className="text-white"> 122</span> Following
              </p>
            </div>

            <p>thesujitmemane.vercel.app</p>
          </div>
        </div>
        <button
          onClick={handleEditProfileOpener}
          className="py-2 text-white  text-sm  border-[#1e1e1e] border-[1px] rounded w-full text-md "
        >
          Edit Profile
        </button>
        <div>
          <div className="flex items-center justify-between w-full my-2 border-b-[1px] border-[#1e1e1e]  py-2 ">
            <NavLink
              to="posts"
              className={({ isActive }) =>
                isActive
                  ? "flex-1 text-white border-white"
                  : "text-[#777777] flex-1  border-[#1e1e1e] "
              }
            >
              <div className="flex-1 text-center">Posts</div>
            </NavLink>
            <NavLink
              to="replies"
              className={({ isActive }) =>
                isActive
                  ? "flex-1 text-white border-white"
                  : "text-[#777777] flex-1  border-[#1e1e1e] "
              }
            >
              <div className="flex-1 text-center">Replies</div>
            </NavLink>
            <NavLink
              to="reposts"
              className={({ isActive }) =>
                isActive
                  ? "flex-1 text-white border-white"
                  : "text-[#777777] flex-1  border-[#1e1e1e] "
              }
            >
              <div className="flex-1 text-center">Reposts</div>
            </NavLink>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
