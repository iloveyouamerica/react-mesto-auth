import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contextst/currentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute.js';

function App() {

  const loggedIn = true;

  // константы состояния для попапов

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  // создаём стейт currentUSer для хранения данных о пользователе (ПР11)
  const [currentUser, setCurrentUser] = useState({});

  // стейт для карточек
  const [cards, setCards] = React.useState([]);

  //создаём эффект при монтировании и вызываем api.getUserInfo для обновления стейт-переменной currentUser
  useEffect(() => {
    api.getUserInfo() // запрос на получение информации о пользователе
      .then((userInfo) => {
        //console.log(userInfo, "API");
        setCurrentUser(userInfo);
        //console.log(currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

// создаём эффект первичного монтирования карточек
  useEffect(() => {
    api.getCards() // запрос на получение карточек
      .then((dataCards) => {
        //console.log(dataCards);
        setCards(dataCards.map((item) => ({
          _id: item._id,
          name: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.owner,
        })));
      })
      .catch((err) => {
        console.log(err);
      });
}, []);

  // обработчики кнопок для открытия попапов

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true); // меняем состояние (добавляем класс открытия попап)
    //console.log(isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    //console.log(isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // обработчик для закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  // обработчик лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    //console.log(card.id); // id = ...a811
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => { // newCard - затронутая карточка
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); //state - это первичный массив карточек
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    // отправим запрос в api на удаление карточки и получим ответ сервера - обновлённый список карточек
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id != card._id)); // обновляем стейт cards, удаляя из нового массива нужную карточку
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработчик обновления данных о пользователе
  function handleUpdateUser(newUserData) { // из EditProfilePopup были переданы новые данные пользователя
    api.editUserProfile(newUserData)
      .then((res) => { // res - это ответ сервера, объект обновлённых данных пользователя
        // установим в переменную стейта новые данные о пользователе
        setCurrentUser(res);

        // закроем попап с формой редактирования
        closeAllPopups();

      })
      .catch(err => console.log(err));
  }

  // обработчик обновления аватара пользователя
  function handleUpdateAvatar(userAvatar) { // из EditAvatarPopup
    //console.log(userAvatar);

    api.changeAvatar(userAvatar.avatar)
      .then((res) => { // res - это объект пользователя с данными, пришедший от сервера после обновлений
        // console.log(res);

        // установим в переменную стейта новые данные о пользователе
        setCurrentUser(res);

        // закроем попап с формой
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // обработчик для добавления новых карточек
  function handleAddPlaceSubmit(newCardData) {
    // console.log(newCardData);

    api.addNewCard(newCardData)
      .then((res) => { // res - это массив объектов всех карточек, который вернул сервер после обновления
        // обновите стейт cards с помощью расширенной копии текущего массива
        setCards([res, ...cards]);

        // закроем все попапы
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/mesto" replace /> : <Navigate to="/sign-in" replace />} />
            <Route
              path="/mesto"
              element={<ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onClose={closeAllPopups}
              />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
          </Routes>
          {/* <Main 
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onClose={closeAllPopups} /> */}
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Да"></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;