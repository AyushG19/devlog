import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Navbar = () => {
  const pages = ["Home", "Feed", "Popular", "Saved"];

  const [pageIndex, setPageIndex] = useState(0);

  const handleRight = () => {
    setPageIndex((prev) => (prev + 1 > 3 ? 3 : prev + 1));
  };

  const handleLeft = () => {
    setPageIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  return (
    <div
      className="md:px-8 px-4 w-screen h-14 bg-[#FFD700] flex items-center justify-between"
      style={{ gridArea: "navbar" }}
    >
      <div>Devlog</div>
      <nav className="h-full hidden md:block">
        <ul className="md:flex hidden h-full md:gap-8 font-medium">
          <li className="md:flex hidden items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer">
            Home
          </li>
          <li className="md:flex hidden items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer">
            Feed
          </li>
          <li className="md:flex hidden items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer">
            Popular
          </li>
          <li className="md:flex hidden items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer">
            Saved
          </li>
        </ul>
      </nav>
      <div className="flex md:hidden">
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
      </div>

      <div
        className="cursor-pointer rounded-full size-8 bg-black"
        onClick={() => (window.location.href = "/profile")}
      >
        p
      </div>
    </div>
  );
};

export default Navbar;
