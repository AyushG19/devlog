import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Bell,
  Mail,
  Bookmark,
  Home,
  SquarePen,
  CircleUser,
} from "lucide-react";
import { UserContext } from "../context/userContext";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const queryClient = useQueryClient();
  const { screenWidth, setHalfModal } = useContext(UserContext);
  const pages = ["home", "blogs", "trending", "saved"];
  const { page } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isHovering, setIsHovering] = useState(false);
  const nav = useNavigate();

  const [pageIndex, setPageIndex] = useState(pages.indexOf(page));

  const handleRight = () => {
    setPageIndex((prev) => (prev + 1 > 3 ? 3 : prev + 1));
  };

  const handleLeft = () => {
    setPageIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const handleNav = (index) => {
    nav(`/${pages[index].toLowerCase()}`);
  };

  const handleHover = () => {
    setIsHovering((prev) => !prev);
  };

  return (
    <div
      className="flex z-40 md:relative md:px-8 px-4 w-screen h-14 bg-[#FFD700] rounded-t-2xl md:rounded-none items-center justify-stretch md:justify-between"
      style={{ gridArea: screenWidth < 786 ? "bottom" : "navbar" }}
    >
      <div className="hidden md:block">Devlog</div>
      <nav className="h-full hidden md:block">
        <ul className="md:flex hidden h-full font-medium">
          {pages.map((page, index) => (
            <li
              key={index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              onClick={() => {
                setPageIndex(index), handleNav(index);
              }}
              className={`md:flex hidden items-center justify-center h-full md:px-7 hover:bg-[#FFE971] cursor-pointer ${
                pageIndex === index && !isHovering ? "bg-[#FFE971]" : ""
              }`}
            >
              {page}
            </li>
          ))}
        </ul>
      </nav>
      <CircleUser
        className="md:block hidden"
        onClick={() => {
          nav(`/profile/${userInfo.username}`);
        }}
        size={20}
      />
      <div className="relative w-full h-full flex items-center justify-stretch md:hidden">
        <Home className="flex-1" size={20} />
        <Search className="flex-1" size={20} />
        <Bookmark className="flex-1" size={20} />
        <div className="-mt-3 bg-[rgb(var(--primary))] h-[120%] aspect-square rounded-full bottom-0 flex items-center justify-center">
          <SquarePen className="flex-1" size={23} />
        </div>
        <Bell className="flex-1" size={20} />
        <Mail className="flex-1" size={20} />
        <CircleUser
          className="flex-1"
          onClick={() =>
            screenWidth > 786
              ? nav(`/profile/${userInfo.username}`)
              : setHalfModal(true)
          }
          size={20}
        />
      </div>

      {/* <div className="flex md:hidden">
        <button className={pageIndex == 0 ? "hidden" : ""} onClick={handleLeft}>
          <ChevronLeft size={20} />
        </button>
        <Link className="mx-1" to={pages[pageIndex]}>
          {pages[pageIndex]}
        </Link>
        <button
          className={pageIndex == 3 ? "hidden" : ""}
          onClick={handleRight}
        >
          <ChevronRight size={20} />
        </button>
      </div> */}
    </div>
  );
};

export default Navbar;
