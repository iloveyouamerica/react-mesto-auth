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
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import * as mestoAuth from '../utils/mestoAuth.js';
import toolTipSuccess from '../images/popup-overlay/tooltip-success.png';
import toolTipFail from '../images/popup-overlay/tooltip-fail.png';
import MobileMenu from './MobileMenu.js';

function App() {

  // переменная для понимания факта залогиненного пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  // хук для навигации
  const navigate = useNavigate();

  // переменная видимости мобильного меню
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

  // переменная изменения кнопки мобильного меню с крестика на бургер и обратно
  const [mobileMenuButtonClick, setMobileMenuButtonClick] = React.useState(false);

  // константы состояния для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = React.useState({isOpen: false, title: '', image: ''});

  // создаём стейт currentUSer для хранения данных о пользователе (ПР11)
  const [currentUser, setCurrentUser] = useState({});

  // стейт для хранения email авторизованного пользователя
  const [userEmail, setUserEmail] = React.useState('');

  // стейт для карточек
  const [cards, setCards] = React.useState([]);

  // useEffect для проверки токена
  useEffect(() => {
    // если у пользователя в localStorage есть токен, то проверим действующий он или нет
    const token = localStorage.getItem('token');
    //console.log(`token: ${token}`);
    if(token) {
      //console.log(`token: ${token}`);
      mestoAuth.checkToken(token)
        .then((res) => { // res содержит поле объект data, в котором есть поля _id и email
          //console.log(res);
          setLoggedIn(true);
          navigate("/mesto", {replace: true});
          setUserEmail(res.data.email);
          //console.log(userEmail);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  //создаём эффект при измении loggedIn (если пользователь авторизуется)
  useEffect(() => {
    if(loggedIn) {
      api.getUserInfo() // запрос на получение информации о пользователе
        .then((userInfo) => {
          //console.log(userInfo, "API");
          setCurrentUser(userInfo);
          //console.log(currentUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

// создаём эффект первичного монтирования карточек
  useEffect(() => {
    if(loggedIn) {
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
    }
  }, [loggedIn]);

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
    setIsInfoTooltipPopup({isOpen: false, title: '', image: ''});
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

  // обработчик для регистрации пользователя
  function handleRegister(email, password) {

    // вызываем функцию регистрации нового пользователя
    mestoAuth.register(email, password)
      .then((res) => {
        //console.log(res);
        setIsInfoTooltipPopup({isOpen: true, title: 'Вы успешно зарегистрировались!', image: toolTipSuccess});
        // закроем попап tooltip через 3 секунды
        setTimeout(() => closeAllPopups(), 3000);
        navigate('/sign-in', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopup({isOpen: true, title: 'Что-то пошло не так! Попробуйте ещё раз.', image: toolTipFail});
        setTimeout(() => closeAllPopups(), 3000);
      });
  }

  // обработчик для авторизации пользователя
  function handleLogin(email, password) {
    //console.log(`App.js ${email}, ${password}`);

    // вызываем функцию авторизации
    mestoAuth.authorize(email, password)
      .then((data) => {
        //console.log(data);
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopup({isOpen: true, title: 'Что-то пошло не так! Попробуйте ещё раз.', image: toolTipFail});
        setTimeout(() => closeAllPopups(), 3000);
      });
  }

  // обработчик кнопки выхода из учётной записи
  function handleLogOut(event) {
    event.preventDefault();
    
    // удалим токен пользователя из localStorage
    localStorage.clear('token');

    // установим loggeIn в false
    setLoggedIn(false);

    // перелинкуем пользователя на страницу авторизации
    navigate("/sign-in", {replace: true});

    // запроем мобильное меню (если мы в мобильной версии)
    setMobileMenuVisible(false);

    // восстановим вид бургера для копки мобильного меню
    setMobileMenuButtonClick(false);
  }

  // обработчик появления мобильного меню
  function handleMobileMenuVisible() {
    mobileMenuVisible ? setMobileMenuVisible(false) : setMobileMenuVisible(true);
    mobileMenuButtonClick ? setMobileMenuButtonClick(false) : setMobileMenuButtonClick(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="wrapper">
          {loggedIn && <MobileMenu state={mobileMenuVisible} email={userEmail} onLogOut={handleLogOut} />}
          <Header 
            email={userEmail}
            onLogOut={handleLogOut}
            onVisible={handleMobileMenuVisible}
            menuBtn={mobileMenuButtonClick} />
          <main className="main">
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
              <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
              <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
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
          </main>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Да"></PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip state={isInfoTooltipPopup} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;