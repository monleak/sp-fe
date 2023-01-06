import React from "react";
import {
  NavigateFunction,
  useNavigate,
  useLocation,
  NavigateOptions,
  To,
} from "react-router-dom";

/**
 * Navigate with preserve query parameters
 * - Keep sidebar, topbar setting without using context api, state, ...
 *
 * @see LinkWithPreserveQuery
 */
const usePreserveQueryNavigate = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const preserveQueryNavigate = React.useCallback<NavigateFunction>(
    (a: To | Number, b?: NavigateOptions) => {
      if (typeof a === "number") navigate(a);
      else navigate(a + search, b);
    },
    [navigate, search]
  );

  return preserveQueryNavigate;
};

export default usePreserveQueryNavigate;
