import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const avatarInputRef = useRef(avatar);

  function handleAvatarChange() {
    setAvatar(avatarInputRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar});
  }

  return(
    <PopupWithForm name={"edit-avatar"} title={"Change profile picture"} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
      <input id="card-url" className="form__input form__input_avatar-update" type="url" name="avatar" placeholder="Link" onChange={handleAvatarChange} ref={avatarInputRef} defaultValue={currentUser.avatar}
            required />
      <span id="card-url-error" className="form__error"></span>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;