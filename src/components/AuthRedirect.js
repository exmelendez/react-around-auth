import { Link } from "react-router-dom";

function AuthRedirect({ routeRedirect, linkText }) {
  return (
    <Link to={routeRedirect} className="auth-redirect">{linkText}</Link>
  );
}

export default AuthRedirect;