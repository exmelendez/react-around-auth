function ImagePopup({isOpen, onClose, card}) {
  const xSymbol = '\u002B';

  return (
    
  <div className={`modal modal_type_image-view ${isOpen ? 'modal_is-open' : ''}`} onClick={onClose}>
    <div className="modal__container modal__container_size-image" style={{ backgroundImage: `url(${card.link})` }}>
      <button className="modal__close-btn modal_close_image-view" aria-label="Close popup" onClick={onClose}>{xSymbol}</button>
      <p className="modal__image-title">{card.name}</p>
    </div>
  </div>
  );
}

export default ImagePopup;