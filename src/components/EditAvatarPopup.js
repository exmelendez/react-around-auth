import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
  const {currentUser} = useContext(CurrentUserContext);
  const avatarInputRef = useRef(null);

  const containerStyle = {
    isStyled: false,
    closeBtnClass: "",
    containerClass: "",
    submitBtnClass: ""
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarInputRef.current.value);
  }

  return(
    <PopupWithForm btnText="Save" containerStyling={containerStyle} handleSubmit={handleSubmit} isOpen={isOpen} name={"edit-avatar"} onClose={onClose} title={"Change profile picture"} >
      <input id="avatar-url" className="form__input form__input_avatar-update" type="url" name="avatar" placeholder="Link" ref={avatarInputRef} defaultValue={currentUser.avatar} required />
      <span id="avatar-url-error" className="form__error"></span>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;