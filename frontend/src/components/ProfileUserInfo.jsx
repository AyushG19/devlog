import { ChevronLeft } from "lucide-react";
import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/api";
import { UserContext } from "../context/userContext";

const ProfileUserInfo = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  console.log(ref);
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
            <button className="p-[5px_15px] bg-[var(--primary)] rounded-full font-semibold ">
              Message
            </button>
            <button className="p-[5px_15px] bg-[var(--primary)] rounded-full font-semibold ">
              Follow
            </button>
          </div>
          <div className=" mb-4">
            <h1 className="text-4xl font-black">{`${userInfo.username}`}</h1>
            <p>{`@${userInfo.username}`}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-semibold text-xl">
              300 <span className="font-normal text-lg">Posts</span>
            </p>
            <p className="font-semibold text-xl">
              300 <span className="font-normal text-lg">Posts</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileUserInfo;
