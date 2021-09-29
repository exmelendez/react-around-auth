import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../images/logo.svg';

function Header() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <a className="header__logo-link" href="../public/index.html">
        <img className="header__logo" src={logo} alt="Around the US logo" />
      </a>
      <div className="header__content">
        <p className="header__text-container">
          { currentUser.isLoggedIn && (<span className="header__user-email">{currentUser.email}</span>) }
          <a className="header__text-link" href="http://www.yahoo.com">
            <span className="header__text">{ currentUser.isLoggedIn ? 'Log out' : 'Log in'}</span>
          </a>
        </p>
      </div>
    </header>
  );
}

export default Header;