import e from 'express';
import React, {useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as duckAuth from '../duckAuth.js';

function Auth() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="register">
      <p className="register__welcome">
        Welcome Msg
      </p>
      <p className="register__error">
        {message}
      </p>

      <form className="register__form" onSubmit={this.handleSubmit}>
        <label for="username">Name:</label>
        <input id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label for="email">Email:</label>
        <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label for="confirmPassword">Confirm password:</label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <div className="register__button-container">
          <button className="register__link" type="submit">Register</button>
        </div>
      </form>

      <div className="register__signin">
        <p>Signin</p>
        <Link className="register__login-link" to="login">Login</Link>
      </div>
    </div>
  );
}