function AuthForm({title, formSubmit, emailChange, passwordChange}) {
  return (
    <form className="auth-form" onSubmit={formSubmit} >
      <h2 className="auth-form__title">{title}</h2>
      <input required className="auth-form__input" id="signup-email" type="email" name="email" placeholder="Email" onChange={emailChange}/>
      <input required className="auth-form__input auth-form__input_password" id="signup-password" type="password" name="password" placeholder="Password" onChange={passwordChange} />
      <button className="auth-form__submit-btn" type="submit" value="submit">{title}</button>
    </form>
  );
}

export default AuthForm;