import xMark from '../images/x_mark.svg'
import checkMark from '../images/check_mark.svg'

function InfoTooltip({name, isOpen, onClose, message, isErrorMsg}) {
  const xSymbol = '\u002B';

  return (
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_is-open' : ''}`} onClick={onClose}>
      <div className="modal__container modal_msg-type">
        <button className={`modal__close-btn`} aria-label="Close popup" onClick={onClose}>{xSymbol}</button>
        <img className="modal__msg-image" src={isErrorMsg ? xMark : checkMark} alt="error status indicator" />
        <p className="modal__msg-text" >{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;