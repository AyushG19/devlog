import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api/api";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log("userinfo: ", userInfo);
    const fetchUserInfo = async () => {
      const res = await api.get("/api/user/profile");
      setUserInfo(res.data);
    };
    if (Object.keys(userInfo) === 0) {
      fetchUserInfo();
    }
  }, [userInfo]);
  const values = { userInfo, setUserInfo };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
