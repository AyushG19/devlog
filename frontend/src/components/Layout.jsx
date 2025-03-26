import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import MainSection from "./mainSection";
import RightSection from "./RightSection";
import TweetModal from "./TweetModal";
import { PenLine } from "lucide-react";
import { UserContext } from "../context/userContext";
import Blog from "./Blog.jsx";

const Layout = () => {
  const { screenWidth } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div
      className="relative w-screen h-screen bg-[--secondary] grid grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] "
      style={{
        gridTemplateAreas:
          "'navbar navbar navbar' 'leftside middleside rightside'",
      }}
    >
      <Navbar />
      <MainSection />
      {/* <div className="md:w-[40vw] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {[...Array(5)].map((_, i) => (
          <Blog key={i} />
        ))}
      </div> */}

      {
        screenWidth >= 786 ? <RightSection /> : ""
        //(
        //   <button
        //     className="fixed w-14 h-14 bottom-3 right-3 rounded-full bg-[rgb(var(--primary))] cursor-pointer flex justify-center items-center"
        //     onClick={() => setOpenModal(true)}
        //   >
        //     <PenLine />
        //   </button>
        // )
      }
      {openModal && <TweetModal closeModal={handleClose} />}
    </div>
  );
};

export default Layout;
