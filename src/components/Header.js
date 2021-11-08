import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useLocation, Link } from "react-router-dom";
import logo from '../images/logo.svg';

function Header({ handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  let navLinkText;

  function determineNavPath() {
    switch (location.pathname) {
      case '/signin':
        navLinkText = 'Sign up';
        return '/signup';
      case '/signup':
        navLinkText = 'Log in';
        return '/signin';
      default:
        return 'other';
    }
  }

  return (
    <header className="header">

      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logo} alt="Around the US logo" />
      </Link>

      <div className="header__content">
        <p className="header__text-container">
          { currentUser.isLoggedIn && (<span className="header__user-email">{currentUser.email}</span>) }

          {
            determineNavPath() !== 'other' && <Link className="header__text-link" to={determineNavPath()}>{navLinkText}</Link>
          }

          {
            determineNavPath() === 'other' && <Link className="header__text-link" to="#" onClick={handleLogout}>Log out</Link>
          }
        </p>
      </div>
    </header>
  );
}

export default Header;