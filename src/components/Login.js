import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';
import AuthRedirect from './AuthRedirect';
import * as auth from "../utils/auth";

function Login({tokenSet, getUserData, getCards, onMessagePopup}) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        
        auth.getUserData(data.token).then((res) => {
          console.log(res);
          getUserData(res.data.email);
          getCards();
        }).catch((err) => console.log(err));
        tokenSet(data.token);
        history.push('/');
      } else {
        onMessagePopup('Incorrect email or password! Please try again.', true);
      }
    })
    .catch((err) => {
      onMessagePopup('Incorrect email or password! Please try again.', true);
      console.log(err)
    });
  }

  return (
    <>
      <AuthForm title="Log in" formSubmit={handleSubmit} emailChange={handleEmailChange} passwordChange={handlePasswordChange} />
      <AuthRedirect routeRedirect="/signup" linkText="Not a member yet? Sign up here!" />
    </>
  );
}

export default Login;