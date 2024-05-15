import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import EditProfile from "../../components/User/EditProfile";
import { MousePointer2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import apiService from "../../services/api";
import { Spinner } from "keep-react";
import { Dropdown } from "flowbite-react";

const Profile = () => {
  const { setIsModalOpen, setModalContent, setModalSize } =
    useContext(AppContext);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState();
  const handleEditProfileOpener = (user) => {
    setModalSize("xl");
    setModalContent(<EditProfile user={user} getProfile={getProfile} />);
    setIsModalOpen(true);
  };

  const getProfile = async () => {
    try {
      console.log("button clicked");
      const response = await apiService.get(`/api/users/${username}`);
      console.log(response);
      setUser(response?.data?.data);
    } catch (error) {}
  };

  const decodeToken = async () => {
    const decoded = jwtDecode(localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
    console.log(decoded);
    setLoggedInUserId(decoded?._id);
  };

  useEffect(() => {
    getProfile();
    decodeToken();
  }, []);

  console.log(user);
  console.log(loggedInUserId);
  return (
    <div className="flex flex-col items-center mt-16">
      <div className="max-w-xl   w-full text-white px-2">
        <div className="w-full py-8 flex-col flex items-center uppercase justify-center text-2xl text-gray-900 font-semibold bg-white rounded-t-md mb-2">
          <h1>{user?.oneWord}</h1>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{user?.fullName}</h1>
            <p>@{user?.username || "username"} </p>
          </div>

          <Dropdown
            label="top"
            placement="left-bottom"
            renderTrigger={() => (
              <div className="w-20 h-20  cursor-pointer shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
                <img
                  src={
                    user?.avatar ||
                    "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg"
                  }
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            className="w-[250px] border-0 bg-[#262626] text-white hover:bg-[#262626]"
          >
            <Dropdown.Item
              className="w-full text-white hover:text-gray-900"
              onClick={() => alert("Dashboard!")}
            >
              Upload picture
            </Dropdown.Item>
            <Dropdown.Item
              className="w-full text-red-500 "
              onClick={() => alert("Settings!")}
            >
              Remove current picture
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="my-2">
          <p>{user?.bio || "Write Bio "}</p>
          <div className="flex justify-between items-center text-[#777777] space-x-2">
            <div className="flex items-center space-x-2 text-sm">
              <p className="hover:underline cursor-pointer">
                {" "}
                <span className="text-white">{user?.followersCount}</span>{" "}
                Followers
              </p>
              <p className="hover:underline cursor-pointer">
                {" "}
                <span className="text-white"> {user?.followingCount}</span>{" "}
                Following
              </p>
            </div>

            <p className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
              <a
                href="http://thesujitmemane.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{user?.link?.slice(0, 25)} ... </span>
              </a>
            </p>
          </div>
        </div>
        {!(loggedInUserId === user?._id) ? (
          <div className="flex items-center justify-between space-x-2">
            <button className="py-2 bg-white text-gray-900 font-semibold  text-sm  border-[#1e1e1e] border-[1px] rounded w-full text-md ">
              Follow
            </button>
            <button
              onClick={handleEditProfileOpener}
              className="py-2 text-white  text-sm font-semibold border-[#1e1e1e] border-[1px] rounded w-full text-md "
            >
              Message
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleEditProfileOpener(user)}
            className="py-2 text-white  text-sm  border-[#1e1e1e] border-[1px] rounded w-full text-md "
          >
            Edit Profile
          </button>
        )}
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
