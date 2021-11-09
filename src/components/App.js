import React, {useState, useEffect, useCallback} from  'react';
import { Switch, useHistory } from 'react-router-dom';
import * as api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import RemoveCardPopup from './RemoveCardPopup';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "", email: "", _id: "6c1c8237c69449d3ebececeb", isLoggedIn: false });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithoutFormOpen, setPopupWithoutFormOpen] = useState(false);
  const [isRemoveCardPopupOpen, setRemoveCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupError, setPopupError] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });
  const [updateForm, setUpdateForm] = useState({
    about: "",
    name: ""
  });

  const clearFormState = useCallback(() => {
    setFormState(prevState => ({
      ...prevState,
      email: "",
      password: ""
    }));
  }, []);

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setPopupWithoutFormOpen(false);
    setRemoveCardPopupOpen(false);
    setSelectedCard(null);
  }, [setEditProfilePopupOpen, setAddPlacePopupOpen, setEditAvatarPopupOpen, setImagePopupOpen, setPopupWithoutFormOpen]);

  const closeModal = useCallback((e) => {
    if (e.key === 'Escape' || e.target === e.currentTarget) {
      closeAllPopups();
    }
  }, [closeAllPopups]);

  function enableEscKey() {
    document.addEventListener("keyup", closeModal);
  }

  const getCards = () => {
    api.getCardList()
    .then(cardData => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  };

  const getContent = useCallback((userEmail) => {
    api.getUserInfo()
      .then(user => {
        setCurrentUser(prev => ({
          ...prev,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
          email: userEmail,
          isLoggedIn: true
        }));
        getCards();
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPlace(newPlace) {
    api.addCard(newPlace)
    .then(newCard => {
      setCards([newCard, ...cards]);
      setAddPlacePopupOpen(false);
    })
    .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
    enableEscKey();
  }

  function handleCardDelete(card) {
    setRemoveCardPopupOpen(!isRemoveCardPopupOpen);
    setSelectedCard(card);
    enableEscKey();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
    enableEscKey();
  }

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    enableEscKey();
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
    enableEscKey();
  }

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    setUpdateForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  function handleLogin(e) {
    e.preventDefault();

    if(!formState.email || !formState.password) {
      handleMessagePopup('Make sure to fill in both the email & password field', true);
      return;
    }

    auth.authorize(formState.password, formState.email)
    .then((res) => {
      if(res.token){
        localStorage.setItem('jwt', res.token);
        handleTokenCheck(res.token);
        clearFormState();
      }
    })
    .catch((err) => {
      console.log(err);
      handleMessagePopup('Incorrect email or password! Please try again.', true);
    });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setCurrentUser(prev => ({
      ...prev,
      name: "",
      about: "",
      avatar: "",
      email: "",
      _id: "",
      isLoggedIn: false
    }));
    history.replace('/signin');
  }

  function handleMessagePopup(popupMsg, isMsgError) {
    setPopupMessage(popupMsg);
    setPopupError(isMsgError);
    setPopupWithoutFormOpen(!isPopupWithoutFormOpen);
    enableEscKey();
  }

  function handleSignup(e) {
    e.preventDefault();

    if(!formState.email || !formState.password) {
      handleMessagePopup('Make sure to fill in both the email & password field', true);
      return;
    }

    auth.register(formState.password, formState.email)
    .then((res) => {
      if(res.data){
        history.push('/signin');
        clearFormState();
        handleMessagePopup('Success! You have now been registered.', false);
      }
    })
    .catch(err => {
      handleMessagePopup('Oops, something went wrong! Please try again.', true);
      console.log(err)
    });
  }

  const handleTokenCheck = useCallback((token) => {
    auth.tokenCheck(token)
    .then(({data}) => {
      getContent(data.email);
    })
    .then(() => history.push('/'))
    .catch(err => console.log(err));
  }, [getContent, history]);

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({avatar: avatar})
    .then(res => {
      setCurrentUser(prev => ({
        ...prev,
        avatar: res.avatar
      }));
      setEditAvatarPopupOpen(false);
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(e) {
    e.preventDefault();

    if(!updateForm.name || !updateForm.about) {
      handleMessagePopup('Make sure to fill in all fields', true);
      return;
    }

    api.setUserInfo(updateForm)
    .then(res => {
      setCurrentUser(prev => ({
        ...prev,
        name: res.name,
        about: res.about
      }));
      setEditProfilePopupOpen(false);
    })
    .catch((err) => console.log(err))
  }

  function removeCard(card) {
    api.removeCard(card._id)
    .then(() => {
      const updatedCards = cards.filter((c) => c._id !== card._id);
      setCards(updatedCards);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      handleTokenCheck(jwt);
    }
  }, [handleTokenCheck]);

  return (
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Header handleLogout={handleLogout} />
        <Switch>
          <UnprotectedRoute path="/signup">
           <Register clearFormState={clearFormState} formState={formState} handleInputChange={handleAuthInputChange} handleSubmit={handleSignup} />
          </UnprotectedRoute>
          <UnprotectedRoute path="/signin">
            <Login clearFormState={clearFormState} formState={formState} handleInputChange={handleAuthInputChange} handleSubmit={handleLogin} />
          </UnprotectedRoute>
          <ProtectedRoute path="/">
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          </ProtectedRoute>
        </Switch>
        <Footer />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlace} onClose={closeModal} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeModal} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup handleInputChange={handleFormInputChange} handleSubmit={handleUpdateUser} inputVals={updateForm} inputUpdate={setUpdateForm} isOpen={isEditProfilePopupOpen} onClose={closeModal} />
        <InfoTooltip name="message" isOpen={isPopupWithoutFormOpen} onClose={closeModal} message={popupMessage} isErrorMsg={isPopupError}/>
        
        {
          isImagePopupOpen && <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeModal}/>
        }
        {
          isRemoveCardPopupOpen && <RemoveCardPopup card={selectedCard} isOpen={isRemoveCardPopupOpen} onClose={closeModal} onSubmit={removeCard} />
        }

      </CurrentUserContext.Provider>
  );
}

export default App;
