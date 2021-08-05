import {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button className="profile__avatar-overlay" onClick={onEditAvatar}></button>
        </div>

        <div className="profile__info">
          <p className="profile__name">{currentUser.name}</p>
          <button className="profile__edit-btn" onClick={onEditProfile} aria-label="Profile edit"></button>
          <p className="profile__title">{currentUser.about}</p>
        </div>

        <button className="profile__add-btn" onClick={onAddPlace} aria-label="Add card"></button>
      </section>

      <section className="photos">

       <ul className="photos__grid">
         {
           cards.map(card => (
             <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
           ))
         }
       </ul>
      </section>
    </main>
  );
}

export default Main;