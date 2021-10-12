import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useHistory, useLocation, Link } from "react-router-dom";
import logo from '../images/logo.svg';

function Header() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();
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

  function handleLogout() {
    console.log('logout btn clicked');
    localStorage.removeItem('jwt');
    setCurrentUser(prev => ({
      ...prev,
      isLoggedIn: false
    }));
    history.replace('/signin');
  }

  return (
    <header className="header">
      <a className="header__logo-link" href="../public/index.html">
        <img className="header__logo" src={logo} alt="Around the US logo" />
      </a>
      <div className="header__content">
        <p className="header__text-container">
          { currentUser.isLoggedIn && (<span className="header__user-email">{currentUser.email}</span>) }

          {
            determineNavPath() !== 'other' && <Link className="header__text-link" to={determineNavPath()}>{navLinkText}</Link>
          }

          {
            determineNavPath() === 'other' && <Link className="header__text-link" onClick={handleLogout}>Log out</Link>
          }
        </p>
      </div>
    </header>
  );
}

export default Header;