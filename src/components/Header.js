import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useHistory } from "react-router-dom";
import logo from '../images/logo.svg';

function Header() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();
  // console.log(history);

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
          <a className="header__text-link" onClick={handleLogout}>
            <span className="header__text">{ currentUser.isLoggedIn ? 'Log out' : 'Log in'}</span>
          </a>
        </p>
      </div>
    </header>
  );
}

export default Header;