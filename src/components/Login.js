import { useEffect } from 'react';
import AuthForm from './AuthForm';
import AuthRedirect from './AuthRedirect';

function Login({ clearFormState, formState, handleInputChange, handleSubmit }) {
  useEffect(() => {
    clearFormState();
  }, [clearFormState]);
  
  return (
    <>
      <AuthForm formState={formState} handleSubmit={handleSubmit} handleInputChange={handleInputChange} title="Log in" />
      <AuthRedirect routeRedirect="/signup" linkText="Not a member yet? Sign up here!" />
    </>
  );
}

export default Login;