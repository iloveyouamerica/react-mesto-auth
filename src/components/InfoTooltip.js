// компонент InfoTooltip.js - это попап с информацией об успешной или неуспешной регистрацией пользователя

function InfoTooltip({state, onClose}) {
  return(
    <div className={`popup popup_type_tooltip ${state.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn button" onClick={onClose}></button>
        <div className="info-tooltip">
          <img src={state.image} className="info-tooltip__img" />
          <h3 className="info-tooltip__title">{state.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;