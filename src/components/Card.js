import { useContext } from  'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photos__item">
      <button className={`photos__delete-btn ${isOwn && 'photos__delete-btn_visible'}`} aria-label="Delete card" onClick={handleDeleteClick}></button>
      <div className="photos__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>

      <div className="photos__item-info">
        <p className="photos__title">{card.name}</p>
        <div className="photos__likes-container">
          <button className={`photos__love-btn ${isLiked && 'photos__love-btn_liked'}`} aria-label="Love" onClick={handleLikeClick}></button>
          <p className="photos__likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;