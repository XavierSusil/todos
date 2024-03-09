import propTypes from "prop-types";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

/**
 * This component will check whether authentication token is present in the local storage or
 * not and if it present navigate to the home page else the children of the component will be
 * rendered
 * @param {*} param0
 * @returns React.Component
 */
const TokenRedirector = ({ children }) => {
  const [token] = useLocalStorage("token", "");
  const location = useLocation();
  if (token && token !== "")
    return <Navigate to="/" state={{ from: location }} replace />;

  return <React.Fragment>{children}</React.Fragment>;
};

TokenRedirector.propTypes = {
  children: propTypes.node,
};

export default TokenRedirector;
