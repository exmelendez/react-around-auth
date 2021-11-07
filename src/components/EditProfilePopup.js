import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({handleInputChange, handleSubmit, isOpen, onClose}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <PopupWithForm name={"edit-profile"} title={"Edit profile"} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
        <input id="profile-name" onChange={handleInputChange} className="form__input form__input-profile-name" type="text" name="name" placeholder="Name"
              minLength="2" maxLength="40" defaultValue={currentUser.name} required />
        <span id="profile-name-error" className="form__error"></span>

        <input id="profile-title" onChange={handleInputChange} className="form__input form__input-profile-title" type="text" name="about"
          placeholder="Title" minLength="2" maxLength="200" defaultValue={currentUser.about} required />
        <span id="profile-title-error" className="form__error"></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;