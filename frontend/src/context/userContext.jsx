import React, { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api/api";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = useCallback(async () => {
    const res = await api.get("/api/user/self-profile");
    console.log("fetchUserInfo()", res);
    setUserInfo(res.data.userData[0]);
  }, []);

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

  const values = { userInfo, setUserInfo, fetchUserInfo };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
