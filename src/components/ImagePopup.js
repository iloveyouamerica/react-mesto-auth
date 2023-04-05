// компонент ImagePopup (для просмотра большой картинки)

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_opacity_dark popup_type_image-view ${card.link ? 'popup_opened' : ''}`} id="popup-image-view">
      <div className="popup__container">
        <button type="button" className="popup__close-btn button" onClick={onClose}></button>
        <figure className="view-image">
          <img src={card.link} alt={card.name} className="view-image__image" />
          <figcaption className="view-image__title">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;