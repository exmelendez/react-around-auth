import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function UnprotectedRoute({ children, ...props }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log('logged in status - Unprotected Route:', currentUser.isLoggedIn);

  return (
    <Route {...props}>
      {currentUser.isLoggedIn ? <Redirect to={"/"} /> : children }
    </Route>
  );
}

export default UnprotectedRoute;