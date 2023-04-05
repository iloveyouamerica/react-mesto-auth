/* Задание: "Вынесите общий компонент попапов
Создайте компонент PopupWithForm и используйте его, чтобы вынести общий код следующих попапов:
«Редактировать профиль»
«Новое место»
«Обновить аватар»
«Вы уверены?»" */

// общий компонет попапов с формой

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn button" onClick={props.onClose}></button>
        <form
          method="POST"
          name={props.name}
          className="popup__form form"
          id={`form-${props.name}`}
          onSubmit={props.onSubmit}
          noValidate>
          <h3 className="form__title">{props.title}</h3>
          {props.children}
          <button type="submit" className="form__submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;