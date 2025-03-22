import React, { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api/api";

export const UserContext = createContext();
console.log("context mounts");

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [halfModal, setHalfModal] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log(screenWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUserInfo = useCallback(async () => {
    const res = await api.get("/api/user/self-profile");
    console.log("fetchUserInfo()", res);
    localStorage.setItem("userInfo", JSON.stringify(res.data.userData));
    setUserInfo(res.data.userData);
  }, []);

  const fetchOtherUserInfo = useCallback(async (username) => {
    const res = await api.get(`/api/user/profile?username=${username}`);
    console.log("fetchOtherInfo", res);
    return res.data.userData[0];
  }, []);

  const fetchPosts = useCallback(async (page, type) => {
    const res = await api.get(`/api/user/get-feed?page=${page}&type=${type}`);
    return { data: res.data };
  }, []);

  const fetchUserSuggestion = useCallback(async (page) => {
    const res = await api.get(`/api/user/get-people-suggestion?page=${page}`);
    console.log("res for user suggeston: ", res);
    return { data: res.data };
  }, []);

  const handleFollow = (isFollowing, id) => {
    if (isFollowing) {
      const res = api.delete(`api/user/follow?user=${id}`);
      return false;
    } else {
      const res = api.put(`api/user/follow?user=${id}`);
      return true;
    }
  };

  useEffect(() => {
    const handleRefresh = () => {
      if (window.location.pathname === "/") {
        return;
      }

      fetchUserInfo();
    };
    window.addEventListener("load", handleRefresh);
    return () => {
      window.removeEventListener("load", handleRefresh);
    };
  }, [fetchUserInfo]);

  const values = {
    userInfo,
    halfModal,
    setHalfModal,
    setUserInfo,
    fetchUserInfo,
    fetchPosts,
    fetchOtherUserInfo,
    fetchUserSuggestion,
    handleFollow,
    screenWidth,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
