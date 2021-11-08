function PopupWithForm({btnText, children, containerStyling, handleSubmit, isOpen, name, onClose, title}) {
  const xSymbol = '\u002B';

  return (
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_is-open' : ''}`} onClick={onClose}>
      <div className={`modal__container ${containerStyling.isStyled ? containerStyling.containerClass : ''}`}>
        <button className={`modal__close-btn ${containerStyling.isStyled ? containerStyling.closeBtnClass : ''}`} aria-label="Close popup" onClick={onClose}>{xSymbol}</button>
        <h2 className="modal__title">{title}</h2>

        <form className={`form form_type_${name}`} onSubmit={handleSubmit}>
          {children}

          <button className={`form__save-btn ${containerStyling.isStyled ? containerStyling.submitBtnClass : ''}`} type="submit" aria-label="Submit form">{btnText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;