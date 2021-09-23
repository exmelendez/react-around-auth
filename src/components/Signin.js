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
    auth.authorize(password, email)
    .then((res) => {
      if(res.error) {
        console.log('error in authentication signin component');
      } else {
        console.log('success in authentication signin component:', res);
        setEmail('');
        setPassword('');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{color: "red"}}>Sign In</h2>
      <input required id="signin-email" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
      <input required id="signin-password" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button type="submit" value="submit">Sign in</button>
    </form>
  );
}

export default Signin;