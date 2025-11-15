import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../context/userContext";

const PeopleSuggestion = ({ users }) => {
  console.log(users);
  const [isFollowing, setIsFollowing] = useState({});
  useEffect(() => {
    setIsFollowing(
      users.reduce((acc, user) => {
        acc[user.user_id] = user.isfollowing;
        return acc;
      }, {})
    );
  }, [users]);
  const { handleFollow } = useContext(UserContext);
  const toggleFollowing = (id) => {
    const res = handleFollow(isFollowing[id], id);
    setIsFollowing((prev) => ({
      ...prev,
      [id]: res,
    }));
  };
  return (
    <div className="border border-[rgba(255,255,255,0.5)] rounded-xl p-3 flex flex-col gap-2 ">
      {users.map((user, i) => (
        <div key={i}>
          <div className="border-b border-[rgba(255,255,255,0.5)] pb-3 flex items-center justify-between w-full">
            <div className="flex items-center justify-center">
              <div className=" bg-white rounded-full size-10  mr-3"></div>
              <NavLink to={`/profile/${user.username}`}>
                <p className="text-[rgb(var(--text))] font-semibold text-m">
                  {user.name}
                </p>
                <p className="text-[rgb(var(--text))] text-xs -mt-1 opacity-60 ">{`@${user.username}`}</p>
              </NavLink>
            </div>
            <button
              onClick={() => toggleFollowing(user.user_id)}
              className={
                isFollowing[user.user_id]
                  ? "p-[3px_10px] text-white rounded-full font-semibold border border-[rgb(var(--primary))]"
                  : `p-[5px_15px] bg-[rgb(var(--primary))] rounded-full font-semibold text-sm`
              }
            >
              {isFollowing[user.user_id] ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleSuggestion;
