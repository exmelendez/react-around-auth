import { useState, useContext, useEffect, useRef } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({handleUpdateUser, isOpen, onClose}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    console.log('userContext - EditProfilePopup:', currentUser);
    console.log('userContext name prop - EditProfilePopup:', name);
  }, [currentUser]);

  return (
    <>
      <PopupWithForm name={"edit-profile"} title={"Edit profile"} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
        <input id="profile-name" onChange={handleNameChange} className="form__input form__input-profile-name" type="text" name="name" placeholder="Name"
              minLength="2" maxLength="40" defaultValue={name} required />
        <span id="profile-name-error" className="form__error"></span>

        <input id="profile-title" onChange={handleDescriptionChange} className="form__input form__input-profile-title" type="text" name="about"
          placeholder="Title" minLength="2" maxLength="200" defaultValue={description} required />
        <span id="profile-title-error" className="form__error"></span>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopup;