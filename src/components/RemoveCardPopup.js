import PopupWithForm from './PopupWithForm';

function RemoveCardPopup({card, isOpen, onClose, onSubmit}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm btnText="Yes" handleSubmit={handleSubmit} isOpen={isOpen} name={"confirm-delete"} onClose={onClose} title={"Are you sure?"} />
  );
}

export default RemoveCardPopup;