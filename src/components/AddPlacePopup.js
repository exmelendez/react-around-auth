import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const containerStyle = {
    isStyled: false,
    closeBtnClass: "",
    containerClass: "",
    submitBtnClass: ""
  };

  function handleCardLinkAdd(e) {
    setCardLink(e.target.value);
  }

  function handleCardNameAdd(e) {
    setCardName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink
    });
    setCardName('');
    setCardLink('');
  }

  return (
    <PopupWithForm btnText="Add" containerStyling={containerStyle} handleSubmit={handleSubmit} isOpen={isOpen} name={"add-card"} onClose={onClose} title={"New place"} >
      <input id="card-title" className="form__input form__input_card-title" type="text" name="name" placeholder="Title"
            minLength="1" maxLength="30" value={cardName} onChange={handleCardNameAdd} required />
      <span id="card-title-error" className="form__error"></span>

      <input id="card-url" className="form__input form__input_card-url" type="url" name="link" placeholder="Link" value={cardLink} onChange={handleCardLinkAdd}
        required />
      <span id="card-url-error" className="form__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;