import React from "react"

function PopupWithForm (props) {
  return (
    <div className={props.isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        
        <form onSubmit={props.onSubmit} noValidate name={props.name} className="popup__inputs">
          <h2 className="popup__title">{props.title}</h2>
          
          {props.children}

          <button type="submit" className="popup__button">{props.buttonText}</button>
        </form>
      </div>
    </div> 
  )
}

export default PopupWithForm;