import PopupWithForm from './PopupWithForm';

function RemoveCardPopup({card, isOpen, onClose, onSubmit}) {
  const containerStyle = {
    isStyled: true,
    closeBtnClass: "",
    containerClass: "modal__container_type-delete",
    submitBtnClass: "modal__confirm-delete-btn"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm btnText="Yes" containerStyling={containerStyle} handleSubmit={handleSubmit} isOpen={isOpen} name={"confirm-delete"} onClose={onClose} title={"Are you sure?"} />
  );
}

export default RemoveCardPopup;