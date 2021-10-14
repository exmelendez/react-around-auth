import { useState } from "react";
import AuthForm from "./AuthForm";
import AuthRedirect from "./AuthRedirect";

function Register({ handleSignup }) {
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
    handleSignup(password, email);
  }

  return (
    <>
      <AuthForm title="Sign up" formSubmit={handleSubmit} emailChange={handleEmailChange} passwordChange={handlePasswordChange} />
      <AuthRedirect routeRedirect="/signin" linkText="Already a member? Log in here!" />
    </>
  );
}

export default Register;