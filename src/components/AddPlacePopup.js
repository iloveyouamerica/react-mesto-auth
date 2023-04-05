import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  // создаём рефы для инпутов формы
  const inputCardName = React.useRef();
  const inputCardLink = React.useRef();

  // обработчик сабмита формы
  function handleSubmit(event) {
    event.preventDefault();

    props.onAddPlace({
      name:inputCardName.current.value,
      link: inputCardLink.current.value
    });

    // очистим инпуты
    inputCardName.current.value = ''; 
    inputCardLink.current.value = ''; 
  }

  return(
    <PopupWithForm
      title="Новое место"
      name="card-add"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          name="name"
          className="form__input"
          id="input-place-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          ref={inputCardName}
          required />
        <span className="form__error-message input-place-name-error"></span>
      </label>
      <label>
        <input
          type="url"
          name="link"
          className="form__input"
          id="input-place-link"
          placeholder="Ссылка на картинку"
          ref={inputCardLink}
          required />
        <span className="form__error-message input-place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;