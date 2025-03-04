import React, { useState } from "react";
import Message from "./Message";

const ProfileUserPost = async() => {
  const [userPosts, setUserPosts] = useState("");
  try {
    const res = await api.get("http://localhost:4000/api/user/get-posts");
    
  } catch (error) {
    
  }
  return (
    <>
      {userPosts ? (
        <div>
          {userPosts.map((post, index) => {
            <Message />;
          })}
        </div>
      ) : (
        <div className=" flex justify-center w-full">
          <p className="bg-slate-500 font-semibold text-xl mt-20 p-[5px_15px] rounded-md">
            No posts yet!
          </p>
        </div>
      )}
    </>
  );
};

export default ProfileUserPost;
