// import { useState } from 'react';
import AuthForm from './AuthForm';
import AuthRedirect from './AuthRedirect';

function Login({ handleInputChange, handleSubmit, formState }) {

  /*
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    if(!email || !password) {
      return;
    }
    e.preventDefault();
    handleLogin(password, email);
  }
  */

  return (
    <>
      <AuthForm formState={formState} handleSubmit={handleSubmit} handleInputChange={handleInputChange} title="Log in" />
      <AuthRedirect routeRedirect="/signup" linkText="Not a member yet? Sign up here!" />
    </>
  );
}

export default Login;