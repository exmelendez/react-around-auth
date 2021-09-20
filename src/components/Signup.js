import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as auth from "../middleware/auth";

function Signup() {
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
      if(res) {
        console.log('submission register response:', res);
        history.push('/signin');
      } else {
        console.log('something went wrong');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{color: "red"}}>Sign Up</h2>
      <input required id="signup-email" type="email" name="email" placeholder="Email" onChange={handleEmailChange}/>
      <input required id="signup-password" type="password" name="password" placeholder="Password" onChange={handlePasswordChange} />
      <button type="submit" value="submit">Sign up</button>
    </form>
  );
}

export default Signup;