import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Test() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <form>
      <h2 style={{color: "red"}}>Test Page - TADA!!</h2>
      <button type="submit" value="submit">Sign up</button>
    </form>
  );
}

export default Test;