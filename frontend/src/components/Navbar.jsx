import {
  AudioLines,
  Bird,
  Menu,
  Rocket,
  Search,
  Squirrel,
  User,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { Dropdown } from "flowbite-react";
import { AppContext } from "../context/AppContextProvider";
import NewPost from "./Post/NewPost";
import apiService from "../services/api";

const Navbar = () => {
  const { setIsModalOpen, setModalContent, setModalSize, handleNewPostOpener } =
    useContext(AppContext);
  const [user, setUser] = useState();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await apiService.get(`/api/users/my`);

        setUser(response?.data?.data);
      } catch (error) {}
    };
    getProfile();
  }, []);
  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center fixed top-0 w-full py-2 bg-[#0f0f0f]">
      <div className="max-w-6xl my-2 w-full  text-white flex items-center  justify-between">
        <Link to="/" className="uppercase flex items-center  space-x-2">
          <AudioLines size={35} />
          <p className="capitalize font-semibold"> ATINUS</p>
        </Link>
        <div className="flex items-center  text-md">
          <Link className=" py-2 rounded  px-4 hover:bg-[#262626]">Search</Link>
          <Link className=" py-2 rounded  px-4 hover:bg-[#262626]">Inbox</Link>
          <div
            onClick={handleNewPostOpener}
            className=" py-2 rounded  cursor-pointer px-4 hover:bg-[#262626]"
          >
            New Post
          </div>
          <Link className=" py-2 rounded  px-4 hover:bg-[#262626]">
            Activity
          </Link>

          <Link
            to={`/${user?.username}`}
            className=" py-2 rounded  px-4 hover:bg-[#262626]"
          >
            Profile
          </Link>
        </div>
        <div>
          <Dropdown
            label=""
            renderTrigger={() => (
              <span>
                <HiOutlineBars3BottomRight
                  className="cursor-pointer"
                  size={30}
                />
              </span>
            )}
            className="w-[150px] border-0 bg-[#262626] text-white hover:bg-[#262626]"
          >
            <Dropdown.Item
              className="w-full text-white hover:text-gray-900"
              onClick={() => alert("Dashboard!")}
            >
              Settings
            </Dropdown.Item>
            <Dropdown.Item
              className="w-full text-white hover:text-gray-900 "
              onClick={() => alert("Settings!")}
            >
              Saved
            </Dropdown.Item>
            <Dropdown.Item
              className="w-full text-white hover:text-gray-900"
              onClick={() => alert("Earnings!")}
            >
              Likes
            </Dropdown.Item>
            <Dropdown.Item
              className="w-full text-white hover:text-gray-900"
              onClick={() => alert("Sign out!")}
            >
              Log Out
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
