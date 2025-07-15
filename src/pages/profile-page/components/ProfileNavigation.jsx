import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineProfile } from "react-icons/ai";
import { FaArrowsRotate } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/auth/authSlice/userSlice";
import useProfile from "../../../hooks/useProfile";
const ProfileNavigation = () => {
  const { currentProfile } = useProfile();

  const user = currentProfile;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="h-fit w-full min-w-[200px] py-5 mt-8 md:shadow bg-white border-t-10 border-primary rounded-md">
      <div className="hidden md:block">
        <LargeScreenNav currentUser={user} onLogout={handleLogout} />
      </div>
      <div className="w-full md:hidden">
        <MobileScreenNav currentUser={user} onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default ProfileNavigation;

export const LargeScreenNav = ({ user, onLogout }) => {
  return (
    <ul className="flex flex-col gap-y-3">
      <NavLink
        to="profile"
        className={({ isActive }) =>
          `h-[56px] pl-5 py-4 transition-all hover:bg-gray-200 ${
            isActive
              ? "bg-gray-200 border-l-2 border-primary"
              : "hover:-translate-x-[1px]"
          }`
        }
      >
        <li className="flex items-center gap-2">
          <AiOutlineProfile />
          Profile
        </li>
      </NavLink>
      <NavLink
        to="order-history"
        className={({ isActive }) =>
          `h-[56px] pl-5 py-4 transition-all hover:bg-gray-200 ${
            isActive
              ? "bg-gray-200 border-l-2 border-primary"
              : "hover:-translate-x-[1px]"
          }`
        }
      >
        <li className="flex items-center gap-2">
          <FaArrowsRotate />
          Order history
        </li>
      </NavLink>
      <NavLink
        to="my-list"
        className={({ isActive }) =>
          `h-[56px] pl-5 py-4 transition-all hover:bg-gray-200 ${
            isActive
              ? "bg-gray-200 border-l-2 border-primary"
              : "hover:-translate-x-[1px]"
          }`
        }
      >
        <li className="flex items-center gap-2">
          <GoHeart />
          My List
        </li>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          `h-[56px] pl-5 py-4 transition-all hover:bg-gray-200 ${
            isActive
              ? "bg-gray-200 border-l-2 border-primary"
              : "hover:-translate-x-[1px]"
          }`
        }
      >
        <li className="flex items-center gap-2">
          <IoSettingsOutline />
          Settings
        </li>
      </NavLink>
      <li
        onClick={onLogout}
        className="h-[56px] flex items-center gap-2 pl-5 py-2 cursor-pointer hover:bg-gray-200"
      >
        <BiLogOut />
        Log-out
      </li>
    </ul>
  );
};

// mobile profile navigation
export const MobileScreenNav = ({ currentUser, onLogout }) => {
  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-[786px] mx-auto">
      <ul className="flex items-center justify-evenly whitespace-nowrap">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `px-4 py-2 transition-all hover:bg-gray-200 ${
              isActive
                ? "bg-gray-200 border-l-2 border-primary"
                : "hover:-translate-x-[1px]"
            }`
          }
        >
          <li className="flex text-nowrap items-center gap-2">
            <AiOutlineProfile />
            Profile
          </li>
        </NavLink>
        <NavLink
          to="order-history"
          className={({ isActive }) =>
            `px-4 py-2 transition-all hover:bg-gray-200 ${
              isActive
                ? "bg-gray-200 border-l-2 border-primary"
                : "hover:-translate-x-[1px]"
            }`
          }
        >
          <li className="flex items-center gap-2">
            <FaArrowsRotate />
            {/* <div></div> */}
            Order&nbsp;history
          </li>
        </NavLink>
        <NavLink
          to="my-list"
          className={({ isActive }) =>
            `px-4 py-2 transition-all hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : "hover:-translate-x-[1px]"
            }`
          }
        >
          <li className="flex text-nowrap items-center gap-2">
            <GoHeart />
            My List
          </li>
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `px-4 py-2 transition-all hover:bg-gray-200 ${
              isActive ? "bg-gray-200" : "hover:-translate-x-[1px]"
            }`
          }
        >
          <li className="flex text-nowrap items-center gap-2">
            <IoSettingsOutline />
            Settings
          </li>
        </NavLink>
        <li
          onClick={onLogout}
          className="flex text-nowrap items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-200"
        >
          <BiLogOut />
          Log-out
        </li>
      </ul>
    </div>
  );
};
