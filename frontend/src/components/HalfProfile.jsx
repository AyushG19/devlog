import { ChevronLeft } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";

const HalfProfile = (props) => {
  const { userInfo, key } = props;
  const { setHalfModal } = useContext(UserContext);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(window.innerHeight / 2);
  const [snap, setSnap] = useState(false);
  const nav = useNavigate();

  const onTouchStart = () => setIsDragging(true);

  const onTouchMove = (t) => {
    if (isDragging) {
      const clientY = t.touches[0].clientY;
      setPosition(clientY);

      const dy = Math.abs(window.innerHeight / 2 - clientY);
      if (dy > 80) {
        setSnap(true);
        setIsDragging(false);
        setTimeout(() => {
          setHalfModal(false);
          nav(`/profile/${userInfo.username}`);
        }, 300);
      }
    }
  };

  const onTouchEnd = () => {
    if (position !== 0) {
      setPosition(window.innerHeight / 2);
    }
    setIsDragging(false);
  };

  return (
    <div
      className={`absolute h-screen right-0 left-0 border-b transition-translate duration-300 ${
        snap ? "-translate-y-1/2" : ""
      }`}
      style={{ top: `${position}px` }}
    >
      <div
        className="flex items-center justify-center w-16 h-1 rounded-2xl bg-[rgb(var(--text))] absolute top-1 left-1/2 -translate-x-1/2 cursor-pointer hover:bg-[rgb(var(--primary))]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      ></div>
      <div className="bg-slate-700 h-28 md:h-56 w-full "></div>
      <div className="h-full w-full rounded-t-2xl md:rounded-none -mt-3 bg-black">
        <div className="px-4 py-2 md:px-8 md:py-4">
          <div
            className="absolute -translate-y-1/2 -translate-x-1/2 top-28 left-1/2 md:left-8
              md:top-56 w-24 h-24 md:w-48 md:h-48 bg-slate-500 rounded-full"
          ></div>
          <div className="flex justify-end gap-2 mb-2 md:mb-14">
            <button className="p-[5px_15px] bg-[rgb(var(--primary))] rounded-full font-semibold">
              Edit Profile
            </button>
          </div>
          <div className="text-center my-6">
            <h1 className="text-[rgb(var(--text))] text-2xl font-black">
              {userInfo.name}
            </h1>
            <p className="text-[rgb(var(--text))]">@{userInfo.username}</p>
          </div>
          <div className="text-center flex gap-4">
            <p className="font-semibold text-xl text-[rgb(var(--text))]">
              {userInfo.followers_count}{" "}
              <span className="block font-normal text-lg">Followers</span>
            </p>
            <p className="font-semibold text-xl text-[rgb(var(--text))]">
              {userInfo.following_count}{" "}
              <span className="block font-normal text-lg">Following</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfProfile;
