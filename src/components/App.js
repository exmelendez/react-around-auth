import React, {useState, useEffect} from  'react';
import { Switch, useHistory } from 'react-router-dom';
import api from '../utils/api';
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

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "", email: "", _id: "", isLoggedIn: false });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithoutFormOpen, setPopupWithoutFormOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupError, setPopupError] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const jwt = localStorage.getItem('jwt');
  const history = useHistory();

  function closeAllPopups(e) {
    if (e.target.classList.contains('modal__close-btn') || e.target.classList.contains('modal_is-open') || e.key === "Escape") {
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setEditAvatarPopupOpen(false);
      setImagePopupOpen(false);
      setPopupWithoutFormOpen(false);
      setSelectedCard(null);
      document.removeEventListener("keyup", handleEscClose);
    }
  }

  function enableEscKey() {
    document.addEventListener("keyup", handleEscClose);
  }

  const getCards = () => {
    api.getCardList()
    .then(cardData => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  };

  const getUserData = userEmail => {
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
      })
      .catch((err) => console.log(err));
  };

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

  function handleMessagePopup(popupMsg, isMsgError) {
    setPopupMessage(popupMsg);
    setPopupError(isMsgError);
    setPopupWithoutFormOpen(!isPopupWithoutFormOpen);
    enableEscKey();
  }

  function handleSignup(password, email) {
    auth.register(password, email)
    .then((res) => {
      if(res.data){
        history.push('/signin');
        handleMessagePopup('Success! You have now been registered.', false);
      }
    })
    .catch(err => {
      handleMessagePopup('Oops, something went wrong! Please try again.', true);
      console.log(err)
    });
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

  useEffect(() => {

    if (token) {
      auth.getContent(jwt).then((res) => {
        if (res.data) {
          getUserData(res.data.email);
          getCards();
          history.push('/');
        }
      }).catch((err) => console.log(err));
    }
  }, [history, jwt, token]);

  return (
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Header />
        <Switch>
          <UnprotectedRoute path="/signin">
            <Login tokenSet={setToken} getUserData={getUserData} getCards ={getCards} onMessagePopup={handleMessagePopup} />
          </UnprotectedRoute>
          <UnprotectedRoute path="/signup">
           <Register onMessagePopup={handleMessagePopup} handleSignup={handleSignup}/>
          </UnprotectedRoute>
          <ProtectedRoute path="/">
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleEditAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          </ProtectedRoute>
        </Switch>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
        <InfoTooltip name="message" isOpen={isPopupWithoutFormOpen} onClose={closeAllPopups} message={popupMessage} isErrorMsg={isPopupError}/>

        {
          isImagePopupOpen ? <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/> : ""
        }
      </CurrentUserContext.Provider>
  );
}

export default App;
