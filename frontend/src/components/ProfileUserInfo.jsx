import { ChevronLeft, SquarePen } from "lucide-react";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/api";
import { UserContext } from "../context/userContext";

const ProfileUserInfo = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { userInfo } = props;
  const { screenWidth } = useContext(UserContext);
  console.log(userInfo);
  const [isFollowing, setIsFollowing] = useState(
    userInfo?.isfollowing || false
  );
  useEffect(() => {
    setIsFollowing(userInfo.isfollowing);
  }, [userInfo]);
  console.log(
    "in profileuserinfo : ",
    userInfo,
    isFollowing,
    userInfo.isfollowing
  );

  const handleFollow = () => {
    if (isFollowing) {
      const res = api.delete(`api/user/follow?user=${userInfo.user_id}`);
      setIsFollowing(false);
    } else {
      const res = api.put(`api/user/follow?user=${userInfo.user_id}`);
      setIsFollowing(true);
    }
  };
  return (
    <div
      ref={ref}
      className="relative border-b border-[rgb(var(--primary))] mb-2"
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full bg-[var(rgb(var(rgb(var(--primary))-light)))] absolute m-4 cursor-pointer hover:bg-[rgb(var(--primary))]`}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ChevronLeft className="mx-1" />
      </div>
      <div className="bg-slate-700 h-28 md:h-56 w-full"></div>
      <div className="h-full w-full">
        <div className=" px-4 py-2 md:px-8 md:py-4">
          <div
            className="absolute -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 top-28 left-1/2 md:left-8
          md:top-56 w-24 h-24 md:w-48 md:h-48 bg-slate-500 rounded-full"
          ></div>
          <div className="flex justify-end gap-2 mb-2 md:mb-14">
            {props.isOwn ? (
              <button className="m-3 rounded-full font-semibold text-[rgb(var(--text))] md:border md:rounded-3xl md:border-[rgb(var(--primary))] md:p-[5px_15px]">
                {screenWidth < 786 ? <SquarePen size={20} /> : "Edit Profile"}
              </button>
            ) : (
              <>
                <button className="p-[5px_15px] bg-[rgb(var(--primary))] rounded-full font-semibold ">
                  Message
                </button>
                <button
                  onClick={handleFollow}
                  className={
                    isFollowing
                      ? "p-[5px_15px]  rounded-full font-semibold border border-[rgb(var(--primary))]"
                      : `p-[5px_15px] bg-[rgb(var(--primary))] rounded-full font-semibold `
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </>
            )}
          </div>
          <div className=" mb-4">
            <h1 className="text-[rgb(var(--text))] text-center md:text-left text-2xl font-bold md:text-4xl md:font-black">{`${userInfo.name}`}</h1>
            <p className="text-[rgb(var(--text))] text-center md:text-left text-sm md:text-base">{`@${userInfo.username}`}</p>
          </div>
          <div className="w-full md:w-auto justify-center md:justify-normal flex gap-4 mb-2">
            <p className="text-[rgb(var(--text))] text-center md:text-left font-semibold text-sm md:text-lg">
              {userInfo.followers_count}{" "}
              <span className="text-xs md:text-base inline-block font-light opacity-80 ">
                Followers
              </span>
            </p>
            <p className="text-[rgb(var(--text))] text-center md:text-left  font-semibold text-sm md:text-lg">
              {userInfo.following_count}{" "}
              <span className="text-xs md:text-base inline-block font-light opacity-80">
                Following
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileUserInfo;
