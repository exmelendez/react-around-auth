import React, {useState, useEffect} from  'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Signin from './Signin';
import Signup from './Signup';
import ProtectedRoute from './ProtectedRoute';
// import * as auth from '../middleware/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "" });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  // const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log('isLoggedIn:', isLoggedIn);

  function closeAllPopups(e) {
    if (e.target.classList.contains('modal__close-btn') || e.target.classList.contains('modal_is-open') || e.key === "Escape") {
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setEditAvatarPopupOpen(false);
      setImagePopupOpen(false);
      setSelectedCard(null);
      document.removeEventListener("keyup", handleEscClose);
    }
  }

  function enableEscKey() {
    document.addEventListener("keyup", handleEscClose);
  }

  function handleAddPlace(newPlace) {
    api.addCard(newPlace)
    .then(newCard => {
      setCards([newCard, ...cards]);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setAddPlacePopupOpen(false);
    });
  }

  function handleCardClick(card) {
    setImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
    enableEscKey();
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
    .then(() => {
      const updatedCards = cards.filter((c) => c._id !== card._id);
      setCards(updatedCards);
    })
    .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err));
  }

  function handleEditAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
    enableEscKey();
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    enableEscKey();
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
    enableEscKey();
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups(e);
    }
  }

  function handleSignIn() {
    if (localStorage.getItem('jwt')) {

    }
  }

  function handleSignUp(password, email) {

    /*
    console.log('signup btn clicked, App.js line 107');
    console.log('password - App.js - line 108:', password);
    console.log('email - App.js - line 109:', email);
    auth.register(password, email)
    .then()
    */
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
  }

  function handleUpdateAvatar(avatar) {
    
    api.setUserAvatar(avatar)
    .then(response => {
      setCurrentUser({
        name: currentUser.name,
        about: currentUser.about,
        avatar: response.avatar,
        email: currentUser.email
      });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setEditAvatarPopupOpen(false);
    });
  }

  function handleUpdateUser(inputValues) {
    api.setUserInfo(inputValues)
    .then(userInfoResponse => {
      setCurrentUser({
        name: userInfoResponse.name,
        about: userInfoResponse.about,
        avatar: currentUser.avatar
      });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setEditProfilePopupOpen(false);
    });
  }

  function toggleLogin(e) {
    e.preventDefault();
    setIsLoggedIn(!isLoggedIn);
    // console.log('login btn clicked');
  }

  useEffect(() => {
    api.getUserInfo()
    .then(user => {
      user.email = 'email@mail.com';
      setCurrentUser(user);
      // setIsLoginForm(false);
    })
    .catch((err) => console.log(err));

    api.getCardList()
    .then(cardData => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
      
  }, []);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={isLoggedIn} />
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
           <Signup />
          </Route>
          <ProtectedRoute path="/" loggedIn={isLoggedIn}>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleEditAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          </ProtectedRoute>
        </Switch>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

        {
          isImagePopupOpen ? <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/> : ""
        }

      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
