import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a className="header__logo-link" href="../public/index.html">
      <img className="header__logo" src={logo} alt="Around the US logo" />
      </a>
    </header>
  );
}

export default Header;