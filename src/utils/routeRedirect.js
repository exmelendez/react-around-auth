import { useHistory, useLocation } from 'react-router-dom';

function redirect(path) {
  const location = useLocation();
  console.log('location Signin:', location);

  if(path === '/signin' || path === '/signup') {
    return true;
  }
  return false;
}