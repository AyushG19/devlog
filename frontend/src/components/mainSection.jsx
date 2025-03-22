import React, { useContext } from "react";
import DummyMessage from "./DummyMessage.jsx";
import Blog from "./Blog.jsx";
import FeedSection from "./FeedSection.jsx";
import ProfileUserInfo from "./ProfileUserInfo.jsx";
import { UserContext } from "../context/userContext.jsx";
import HalfProfile from "./HalfProfile.jsx";

const MainSection = () => {
  const { halfModal, setHalfModal, userInfo, screenWidth } =
    useContext(UserContext);
  return (
    <div
      className="md:w-[70vw] w-screen h-full md:px-2 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden "
      style={{ gridArea: "leftside" }}
    >
      <FeedSection />
      {halfModal && screenWidth < 786 && (
        <HalfProfile close={setHalfModal} userInfo={userInfo} />
      )}
    </div>
  );
};

export default MainSection;
