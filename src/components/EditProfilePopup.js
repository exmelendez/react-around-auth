import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({handleUpdateUser, isOpen, onClose}) {
  const { currentUser } = useContext(CurrentUserContext);
<<<<<<< HEAD
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
=======
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
>>>>>>> c7611c9278cca99f9e06ecc3df1d854a33c69f1c

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(name, description);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
<<<<<<< HEAD
=======
    console.log('userContext - EditProfilePopup:', currentUser);
    console.log('userContext name prop - EditProfilePopup:', name);
>>>>>>> c7611c9278cca99f9e06ecc3df1d854a33c69f1c
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