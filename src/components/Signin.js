import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Signin({onLogin}) {
  const history = useHistory();
  const [state, setState] = useState({message: '', username: '', password: ''});
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('did submit');
  }

  return (
      <div onSubmit={handleSubmit} className="login">
        <p className="login__welcome">
          This app contains highly sensitive information. Please sign in or
          register to access CryptoDucks.
        </p>
        <p className="login__error">{message}</p>
        <form className="login__form">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            required
            name="username"
            type="text"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            required
            name="password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
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