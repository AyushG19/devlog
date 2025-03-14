import React, { useEffect, useRef, useState } from "react";
import ProfileUserInfo from "./ProfileUserInfo.jsx";
import ProfileUserPost from "./ProfileUserPost.jsx";
import api from "../api/api.js";

const ProfilePage = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({});

  const fetchUserInfo = async () => {
    const res = await api.get("/api/user/profile");
    console.log("data: ", res);

    setUserData(res.data.userData[0]);
  };

  useEffect(() => {
    fetchUserInfo();
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
  }, []);
  console.log("ref: ", ref.current);
  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto">
      <ProfileUserInfo userData={userData} ref={ref} />
      <ProfileUserPost visibility={isVisible} />
    </div>
  );
};

export default ProfilePage;
