import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contextst/currentUserContext";

function EditProfilePopup(props) {

  // переменные состояния полей формы, делаем управляемые компоненты
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // подписываемся на контекст CurrentUserContext (данные о пользователе)
  const currentUSer = React.useContext(CurrentUserContext);
  //console.log(currentUSer);

  // установим хук useEffect, чтобы при монтировании заполнить поля формы
  useEffect(() => {
    setName(currentUSer.name);
    setDescription(currentUSer.about);
  }, [currentUSer, props.isOpen]); // каждый раз при изменении текущего пользователя или состояния попапа (открыт / закрыт)

  // обработчик ввода данных в input "name"
  function handleChangeName(event) {
    //console.log(event.target.value);
    setName(event.target.value);
  }

  // обработчик ввода данных в input "description"
  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  // обработчик отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    //console.log(name, description);

    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
         <label>
          <input 
            type="text"
            name="username"
            className="form__input"
            id="input-name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
            value={name || ''}
            required />
          <span className="form__error-message input-name-error"></span>
        </label>
        <label>
          <input
            type="text"
            name="userinfo"
            className="form__input"
            id="input-about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
            value={description || ''}
            required />
          <span className="form__error-message input-about-error"></span>
        </label>
      </PopupWithForm>
  );
}

export default EditProfilePopup;