import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProtectedRoute({ children, ...props }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Route {...props}>
      {currentUser.isLoggedIn ? children : <Redirect to={"/signin"} />}
    </Route>
  );
}

export default ProtectedRoute;