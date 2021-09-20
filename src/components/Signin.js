import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from "../middleware/auth";

function Signin({onLogin}) {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submission email:', email);
    console.log('submission password:', password);
    setEmail('');
    setPassword('');
  }

  return (
      <div className="login">
        <p className="login__welcome">
          This app contains highly sensitive information. Please sign in or
          register to access CryptoDucks.
        </p>
        <p className="login__error">text here</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            required
            name="username"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            required
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">
              Log in
            </button>
          </div>
        </form>
  
        <div className="login__signup">
          <p>Not a member yet?</p>
          <Link to="/register" className="signup__link">
            Sign up here
          </Link>
        </div>
      </div>
  );
}

export default Signin;