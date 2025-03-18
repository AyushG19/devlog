import { ChevronLeft } from "lucide-react";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/api";

const ProfileUserInfo = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { userInfo } = props;
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
    <div ref={ref} className="relative border-b">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary-light)] absolute m-4 cursor-pointer hover:bg-[var(--primary)] "
        onClick={() => {
          navigate("/devlog");
        }}
      >
        <ChevronLeft className="mx-1" />
      </div>
      <div className="bg-slate-700 h-28 md:h-56 w-full"></div>
      <div className="h-full w-full">
        <div className=" px-4 py-2 md:px-8 md:py-4">
          <div
            className="absolute -translate-y-1/2 top-28 left-4 md:left-8
          md:top-56 w-24 h-24 md:w-48 md:h-48 bg-slate-500 rounded-full"
          ></div>
          <div className="flex justify-end gap-2 mb-2 md:mb-14">
            {props.isOwn ? (
              <button className="p-[5px_15px] bg-[var(--primary)] rounded-full font-semibold ">
                Edit Profile
              </button>
            ) : (
              <>
                <button className="p-[5px_15px] bg-[var(--primary)] rounded-full font-semibold ">
                  Message
                </button>
                <button
                  onClick={handleFollow}
                  className={
                    isFollowing
                      ? "p-[5px_15px]  rounded-full font-semibold border border-[var(--primary)]"
                      : `p-[5px_15px] bg-[var(--primary)] rounded-full font-semibold `
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </>
            )}
          </div>
          <div className=" mb-4">
            <h1 className="text-4xl font-black">{`${userInfo.name}`}</h1>
            <p>{`@${userInfo.username}`}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-semibold text-xl">
              {userInfo.followers_count}{" "}
              <span className="font-normal text-lg">Followers</span>
            </p>
            <p className="font-semibold text-xl">
              {userInfo.following_count}{" "}
              <span className="font-normal text-lg">Following</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileUserInfo;
