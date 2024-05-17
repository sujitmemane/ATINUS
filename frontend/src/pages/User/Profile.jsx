import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import EditProfile from "../../components/User/EditProfile";
import { MousePointer2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import apiService from "../../services/api";
import { Spinner, toast } from "keep-react";
import { Dropdown } from "flowbite-react";

const Profile = () => {
  const { setIsModalOpen, setModalContent, setModalSize } =
    useContext(AppContext);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
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

  const handleAvatarUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg, image/png";
    input.onchange = async (e) => {
      try {
        setAvatarUploading(true);
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        console.log(formData);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await apiService.post(
          "/api/users/avatar",
          formData,
          config
        );

        if (response && response.data && response.data.message) {
          toast.success(response.data.message);
          getProfile();
        } else {
          console.error("Invalid response format:", response);
          toast.error("An error occurred while uploading the avatar.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while uploading the avatar.");
      } finally {
        setAvatarUploading(false);
      }
    };
    input.click();
  };

  const handleRemoveAvatar = async () => {
    try {
      setAvatarUploading(true);
      const response = await apiService.delete("/api/users/avatar");
      if (response && response.data && response.data.success) {
        toast.success("Avatar removed");
        getProfile();
      } else {
        console.error("Invalid response format:", response);
        toast.error("Failed to remove avatar");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while removing the avatar");
    } finally {
      setAvatarUploading(false);
    }
  };
  console.log(user);
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
          {loggedInUserId === user?._id ? (
            <Dropdown
              label="top"
              placement="left-bottom"
              disabled={loggedInUserId === user?._id}
              renderTrigger={() => (
                <div className="w-20 h-20  cursor-pointer shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
                  {avatarUploading ? (
                    <div className="flex items-center w-full h-full justify-center">
                      {" "}
                      <Spinner color={"gray"} size={"xl"} />{" "}
                    </div>
                  ) : (
                    <img
                      src={
                        user?.avatar?.link ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YaByfUhHAO-d7019rYYInn903TwzM4YHwlIneRLY9A&s"
                      }
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              )}
              className="w-[250px] border-0 bg-[#262626] text-white hover:bg-[#262626]"
            >
              <Dropdown.Item
                className="w-full text-white hover:text-gray-900"
                onClick={handleAvatarUpload}
              >
                Upload picture
              </Dropdown.Item>
              <Dropdown.Item
                className="w-full text-red-500 "
                onClick={handleRemoveAvatar}
              >
                Remove current picture
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="w-20 h-20  cursor-pointer shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
              <img
                src={
                  user?.avatar?.link ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5YaByfUhHAO-d7019rYYInn903TwzM4YHwlIneRLY9A&s"
                }
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          )}
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
