import { useEffect } from  'react';
import AuthForm from "./AuthForm";
import AuthRedirect from "./AuthRedirect";

function Register({clearFormState, formState, handleInputChange, handleSubmit }) {
  useEffect(() => {
    clearFormState();
  }, []);

  return (
    <>
      <AuthForm formState={formState} handleSubmit={handleSubmit} handleInputChange={handleInputChange} title="Sign up" />
      <AuthRedirect routeRedirect="/signin" linkText="Already a member? Log in here!" />
    </>
  );
}

export default Register;