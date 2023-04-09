// компонент InfoTooltip.js - это попап с информацией об успешной или неуспешной регистрацией пользователя
import successImg from '../images/popup-overlay/tooltip-success.png';
import failImg from '../images/popup-overlay/tooltip-fail.png';

function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn button" onClick={props.onClose}></button>
        <div className="info-tooltip">
          <img src={successImg} className="info-tooltip__img" />
          <h3 className="info-tooltip__title">props.title</h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;