import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileUserInfo from "./ProfileUserInfo.jsx";
import ProfileUserPost from "./ProfileUserPost.jsx";
import api from "../api/api.js";
import { UserContext } from "../context/userContext.jsx";
import { useParams } from "react-router";
import ProfileEditModal from "./ProfileEditModal.jsx";

const ProfilePage = () => {
  const { username } = useParams();
  const { fetchUserInfo, fetchOtherUserInfo, profileEditModal } =
    useContext(UserContext);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isOwn, setIsOwn] = useState(username === userInfo.username);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      if (!isOwn) {
        setUserData(await fetchOtherUserInfo(username));
      }
    };
    getUser();
    setIsOwn(username === userInfo.username);
    // console.log(Object.keys(userData).length === 0, isOwn, userInfo.username);
    // console.log(userInfo, username, userInfo.username);
  }, [username]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(entries);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, []);
  // console.log("ref: ", ref.current);
  return (
    <div className="relative flex flex-col w-screen h-screen overflow-y-auto">
      <ProfileUserInfo
        isOwn={isOwn}
        userInfo={isOwn ? userInfo : userData}
        ref={ref}
      />
      <ProfileUserPost
        userInfo={isOwn ? userInfo : userData}
        visibility={isVisible}
      />
      {profileEditModal && <ProfileEditModal />}
    </div>
  );
};

export default ProfilePage;
