
// компонент Card
import React from "react";
import { CurrentUserContext } from "../contextst/currentUserContext";

function Card(card) {

  // обработчик клика по картинке карточки
  function handleClick() {
    card.onCardClick(card);
    //console.log(card);
  }

  // обработчик клика по лайку
  function handleLikeClick() {
    card.onCardLike(card);
  }

  // обработчик удаления карточки
  function handleDeleteClick() {
    card.onCardDelete(card);
  }

  // подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  //console.log(currentUser);

  // определим, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id; //(card получили из props, currentUser - контекст)
  //console.log(card.owner._id);

  // определяем есть ли лайк у карточки, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // создаём переменную, которую передадим в className кнопки лайка
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;

  return (
    <li className="elements__list-item">
      <article className="elements__card card">
        {isOwn && <button 
          type="button"
          className="card__delete button"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}></button>}
        <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
        <div className="card__description">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк" onClick={handleLikeClick}></button>
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;