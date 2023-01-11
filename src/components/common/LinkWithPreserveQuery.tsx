import { LinkProps } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

/**
 * Navigate with preserve query parameters
 * - Keep sidebar, topbar setting without using context api, state, ...
 * - Use instead of Link
 *
 * @see usePreserveQueryNavigate
 */
export const LinkWithPreserveQuery = function ({
  children,
  to,
  ...props
}: LinkProps) {
  const { search } = useLocation();

  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
};
