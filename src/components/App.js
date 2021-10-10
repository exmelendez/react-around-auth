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
import UnprotectedRoute from './UnprotectedRoute';
import PopupWithoutForm from './PopupWithoutForm';
import Test from './Test';
import * as auth from '../middleware/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "", email: "", _id: "", isLoggedIn: false });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithoutFormOpen, setPopupWithoutFormOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const jwt = localStorage.getItem('jwt');
  const history = useHistory();
  const location = useLocation();

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

  /*
  function tokenCheck() {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      console.log('tokenCheck - token found:', jwt);

      auth.getContent(jwt)
      .then((res) => {
        console.log('response object - App line 150:', res);
        if(res.message) {
          console.log('the data does not exist - tokenCheck')
          return false;
        } else {
          setCurrentUser(prev => ({
            ...prev,
            email: res.data.email
          }));

          setToken(jwt);
          return true;
        }
      })
      .catch((err) => {
        console.log(err)
        return false;
      });

    } else {
      console.log('tokenCheck function no token found');
      return false;
    }
  }
  */

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

  const getCards = () => {
    api.getCardList()
    .then(cardData => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  };


  useEffect(() => {

    if (token) {
      auth.getContent(jwt).then((res) => {
        if (res.data) {
          getUserData(res.data.email);
          getCards();
          /*
          api.getUserInfo()
          .then(user => {
            setCurrentUser(prev => ({
              ...prev,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              _id: user._id,
              email: res.data.email,
              isLoggedIn: true
            }));
          })
          .catch((err) => console.log(err));
          
          
          api.getCardList()
          .then(cardData => {
            setCards(cardData);
          })
          .catch((err) => console.log(err));
          */
          history.push('/');
        }
      }).catch((err) => console.log(err));
    }

    /*
    if(tokenCheck()) {
      api.getUserInfo()
      .then(user => {
        setCurrentUser(prev => ({
          ...prev,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
          isLoggedIn: true
        }));
        // setToken(jwt);
        history.push('/');

      })
      .catch((err) => console.log(err));
  
      api.getCardList()
      .then(cardData => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));

    } else {
      console.log('tokenCheck failed - useEffect - App');
      history.push(location);
    }
    */
  }, [history, jwt]);

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
          <UnprotectedRoute path="/signin">
            <Signin tokenSet={setToken} getUserData={getUserData} getCards = {getCards} />
          </UnprotectedRoute>
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
        <PopupWithoutForm name="test" isOpen={isPopupWithoutFormOpen} onClose={closeAllPopups} />

        {
          isImagePopupOpen ? <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/> : ""
        }
      </CurrentUserContext.Provider>
  );
}

export default App;
