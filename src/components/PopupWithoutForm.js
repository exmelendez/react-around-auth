import xMark from '../images/x_mark.svg'
import checkMark from '../images/check_mark.svg'

function PopupWithoutForm({name, isOpen, onClose, message, isErrorMsg}) {
  const xSymbol = '\u002B';

  return (
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_is-open' : ''}`} onClick={onClose}>
      <div className="modal__container modal_msg-type">
        <button className={`modal__close-btn`} aria-label="Close popup" onClick={onClose}>{xSymbol}</button>
        {/* <h2 className="modal__title">Sign up Message</h2> */}
        <img className="" style={{width: "120px", paddingTop: "40px"}} src={isErrorMsg ? xMark : checkMark} alt="X mark within a circle" />
        <p>{message}</p>
      </div>
    </div>
  );
}

export default PopupWithoutForm;