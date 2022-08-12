import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup ({isOpen, onClose, onSubmit}) {

  function handleSubmit (evt) {
    evt.preventDefault();
    onSubmit();
  }

return (
  <PopupWithForm
    name = 'popup_delete-card'
    isOpen = {isOpen}
    onClose = {onClose}
    onSubmit = {handleSubmit}
    title = "Вы уверены?"
    buttonText="Да!"
  >
  </PopupWithForm>

)
}

export default ConfirmDeletePopup;