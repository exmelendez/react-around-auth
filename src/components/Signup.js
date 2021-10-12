import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as auth from "../middleware/auth";
import AuthForm from "./AuthForm";
import AuthRedirect from "./AuthRedirect";

function Signup({ onMessagePopup }) {
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
    auth.register(password, email)
    .then((res) => {
      if(res.error) {
        onMessagePopup('Oops, something went wrong! Please try again.', true);
      } else {
        history.push('/signin');
        onMessagePopup('Success! You have now been registered.', false);
      }
    });
  }

  return (
    <>
      <AuthForm title="Sign up" formSubmit={handleSubmit} emailChange={handleEmailChange} passwordChange={handlePasswordChange} />
      <AuthRedirect routeRedirect="/signin" linkText="Already a member? Log in here!" />
    </>
  );
}

export default Signup;