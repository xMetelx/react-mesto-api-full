import React from 'react';
import successIcon from '../images/Union_check.svg';
import failIcon from '../images/Union_cross.svg';

function InfoTooltip ({isOpen, isSucceed, onClose}) {

  const InfoTooltipText = isSucceed ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."
  const InfoTooltipIcon = isSucceed ? successIcon : failIcon

  return (
      <div className={isOpen ? `popup popup_opened` : `popup`}>
        <div className="info-tooltip">
          <button type="button" className="popup__close" onClick={onClose}></button>
          <img src={InfoTooltipIcon} alt={InfoTooltipText} className="info-tooltip__icon" />
          <h3 className="info-tooltip__title">{InfoTooltipText}</h3>
        </div>
      </div>
  ) 
}

export default InfoTooltip;
