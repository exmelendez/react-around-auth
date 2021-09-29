import React, {useState, useEffect} from  'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import Test from './Test';
import * as auth from '../middleware/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "", email: "", _id: "", isLoggedIn: false });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState('');
  // const [isLoginForm, setIsLoginForm] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const location = useLocation();
  // console.log('location App:', location);

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

  /*
  function handleSignOut() {
    localStorage.removeItem('jwt');
  }
  */

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
    console.log('useEffect ran - App - line 143');
    if(localStorage.getItem('jwt')) {
      setToken(localStorage.getItem('jwt'));
      console.log('token:', token);

      auth.getContent(token)
      .then((res) => {
        console.log('response object res - App line 149:', res);
        if(res.message) {
          console.log('the data does not exist')
        } else {
          console.log('the data exists');

          setCurrentUser(prev => ({
            ...prev,
            email: res.data.email,
            isLoggedIn: true
          }));
  
          api.getUserInfo()
          .then(user => {
            setCurrentUser(prev => ({
              ...prev,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              _id: user._id
            }));
          })
          .catch((err) => console.log(err));
  
          api.getCardList()
          .then(cardData => {
            setCards(cardData);
          })
          .catch((err) => console.log(err));

          history.push('/');
        }
        
      })
      .catch((err) => console.log(err));

    } else {
      history.push('/signin');
    }
      /*
      if(currentUser.isLoggedIn) {
        history.push(location);
      }
      */
  }, []);

  /*
  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      // const jwt = localStorage.getItem('jwt');
      setToken(localStorage.getItem('jwt'));

      auth.getContent(token)
      .then((res) => {
        console.log('auth get content response - App.JS', res);
        console.log('logged in status - App:', currentUser.isLoggedIn);
        setCurrentUser(prev => ({
          ...prev,
          isLoggedIn: true
        }));
        // history.push('/');
      })
      .catch((err) => console.log(err))
    }
  }, []);
  */

  return (
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Header />
        <Switch>
          <Route path="/signin">
            <Signin tokenSet={setToken} />
          </Route>
          <Route path="/signup">
           <Signup />
          </Route>
          <ProtectedRoute path="/test">
            <Test />
          </ProtectedRoute>
          <ProtectedRoute path="/">
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
  );
}

export default App;
