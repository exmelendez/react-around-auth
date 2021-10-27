import { useEffect } from  'react';

function PopupWithForm({name, isOpen, onClose, title, handleSubmit, closeModal, children}) {
  const xSymbol = '\u002B';

  useEffect(() => {
    console.log('popup with form useEffect ran');
    document.addEventListener('keyup', closeModal);
    return () => {
      document.removeEventListener('keyup', closeModal);
    };
  }, []);

  return (
    
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_is-open' : ''}`} onClick={onClose}>
      <div className="modal__container">
        <button className={`modal__close-btn`} aria-label="Close popup" onClick={onClose}>{xSymbol}</button>
        <h2 className="modal__title">{title}</h2>

        <form className={`form form_type_${name}`} onSubmit={handleSubmit}>
          {children}

          <button className="form__save-btn" type="submit" aria-label="Submit form">Save</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;