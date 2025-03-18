import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileUserInfo from "./ProfileUserInfo.jsx";
import ProfileUserPost from "./ProfileUserPost.jsx";
import api from "../api/api.js";
import { UserContext } from "../context/userContext.jsx";
import { useParams } from "react-router";

const ProfilePage = () => {
  const { username } = useParams();
  const { userInfo } = useContext(UserContext);
  const [isOwn, setIsOwn] = useState(username === userInfo.username);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await api.get(
        isOwn
          ? `/api/user/self-profile`
          : `/api/user/profile?username=${username}`
      );
      console.log("data: ", res);
      setUserData(res.data.userData[0]);
    };
    if (userData && Object.keys(userData).length === 0 && !isOwn) {
      console.log("fetching other user");
      fetchUserInfo();
    }
    console.log(Object.keys(userData).length === 0, isOwn, userInfo.username);
    console.log(userInfo, username, userInfo.username);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
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
  console.log("ref: ", ref.current);
  return (
    <div className=" flex flex-col w-screen h-screen overflow-y-auto">
      <ProfileUserInfo
        isOwn={isOwn}
        userInfo={isOwn ? userInfo : userData}
        ref={ref}
      />
      <ProfileUserPost visibility={isVisible} />
    </div>
  );
};

export default ProfilePage;
