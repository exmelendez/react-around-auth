function Signin({onLogin}) {

  return (
    <>
      <p style={{color: "red"}}>Hello World @ Signin Component</p>
      <button onClick={onLogin}>Login</button>
    </>
  );
}

export default Signin;