import React from  'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  //создаём объект ссылки с помощью хука useRef()
  const changeAvatarInput = React.useRef();

  // обработчик сабмита формы
  function handleSubmit(event) {
    event.preventDefault(); // отменяем стандартное поведение формы

    // console.log(changeAvatarInput.current.value);

    // 
    props.onUpdateAvatar({
      avatar: changeAvatarInput.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <label>
          <input
            type="url"
            name="link"
            className="form__input"
            id="input-avatar-link"
            placeholder="Ссылка на аватар"
            ref={changeAvatarInput}
            required />
          <span className="form__error-message input-avatar-link-error"></span>
        </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;