function AuthForm({ formState, handleSubmit, handleInputChange, title }) {
  const {email, password} = formState;

  return (
    <form className="auth-form" onSubmit={handleSubmit} >
      <h2 className="auth-form__title">{title}</h2>
      <input required className="auth-form__input" id="email-input" name="email" onChange={handleInputChange} placeholder="Email" type="email" value={email} />
      <input required className="auth-form__input auth-form__input_password" id="password-input" name="password" onChange={handleInputChange} placeholder="Password" type="password" value={password} />
      <button className="auth-form__submit-btn" type="submit" value="submit">{title}</button>
    </form>
  );
}

export default AuthForm;