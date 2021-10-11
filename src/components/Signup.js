import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as auth from "../middleware/auth";
import AuthForm from "./AuthForm";

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
        console.log('did not successfully register for the following reason:', res.error);
        onMessagePopup('Oops, something went wrong! Please try again.', true);
      } else {
        history.push('/signin');
        onMessagePopup('Success! You have now been registered.', false);
        console.log('successful registration');
      }
    });
  }

  return (
    <AuthForm title="Sign up" formSubmit={handleSubmit} emailChange={handleEmailChange} passwordChange={handlePasswordChange} />
  );
}

export default Signup;