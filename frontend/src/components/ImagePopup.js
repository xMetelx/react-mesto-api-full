import React from "react";

const ImagePopup = ({card, onClose}) => {

  return (
    <div className={`popup ${card.link && 'popup_opened'}`}>
      <div className="popup__box-for-picture">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={card.link} className="popup__picture" alt="Фото" /> 
        <p className="popup__description" >{card.name}</p>
      </div>
    </div>  
  )
}

export default ImagePopup;