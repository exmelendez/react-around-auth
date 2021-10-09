import { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from "../middleware/auth";

function Signin({tokenSet, getUserData, getCards}) {
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { setCurrentUser } = useContext(CurrentUserContext);
  // const location = useLocation();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password) {
      return;
    }

    auth.authorize(password, email)
    .then((data) => {
      if(data.token) {
        setEmail('');
        setPassword('');
        /*
        setCurrentUser(prev => ({
          ...prev,
          isLoggedIn: true
        }));
        */
        auth.getContent(data.token).then((res) => {
          getUserData(res.data.email);
          getCards();
        }).catch((err) => console.log(err));
        tokenSet(data.token);
        history.push('/');
      } 
    })
    .catch((err) => console.log(err));
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