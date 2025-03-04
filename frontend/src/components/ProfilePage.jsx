import React from "react";
import ProfileUserInfo from "./ProfileUserInfo.jsx";
import ProfileUserPost from "./ProfileUserPost.jsx";

const profilePage = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <ProfileUserInfo />
      <ProfileUserPost />
    </div>
  );
};

export default profilePage;
