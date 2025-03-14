import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const values = {};

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
