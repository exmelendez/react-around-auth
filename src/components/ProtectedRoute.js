import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProtectedRoute({ children, ...props }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  // console.log('location protected route:', location);

  return (
    <Route {...props}>
      {currentUser.isLoggedIn ? children : <Redirect to={"/signin"} />}
    </Route>
  );
}

export default ProtectedRoute;