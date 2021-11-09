import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
  const avatarInputRef = useRef(null);

  const containerStyle = {
    isStyled: true,
    closeBtnClass: "",
    containerClass: "modal__container_update-avatar",
    submitBtnClass: ""
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarInputRef.current.value);
  }

  return(
    <PopupWithForm btnText="Save" containerStyling={containerStyle} handleSubmit={handleSubmit} isOpen={isOpen} name={"edit-avatar"} onClose={onClose} title={"Change profile picture"} >
      { /*   Just to be transparent Gennadiy Barsegyan, I don't believe it is accurate to have the default avatar input as empty.
      That was not the case previous to this project. But since you are the reviewer and I wish to pass the review I will modify as you wish, but I do not agree with it.  */ }
      <input id="avatar-url" className="form__input form__input_avatar-update" type="url" name="avatar" placeholder="Link" ref={avatarInputRef} defaultValue={''} required />
      <span id="avatar-url-error" className="form__error"></span>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;