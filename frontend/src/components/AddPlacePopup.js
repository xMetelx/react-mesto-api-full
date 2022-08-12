import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onSubmit}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function onChangeAddName (evt) {
    setName(evt.target.value)
  }

  function onChangeAddLink (evt) {
    setLink(evt.target.value)
  }

  function handleSubmit (evt) {
    evt.preventDefault ()
    onSubmit ({name, link})
  }

  return (
    <PopupWithForm
    name = "add-card"
    title = "Новое место"
    buttonText = "Создать"
    isOpen = {isOpen}
    onClose = {onClose}
    onSubmit = {handleSubmit}
  >
    <input onChange={onChangeAddName} value={name} required id="input-title" type="text" name="title" minLength="1" maxLength="30" placeholder="Название" className="popup__input popup__input_title" /><span className="input-title-error popup__inputs-error">Вы пропустили это поле</span>
    <input onChange={onChangeAddLink} value={link} required id="input-link" type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_link" />
    <span className="input-link-error popup__inputs-error">Вы пропустили это поле</span>  
  </PopupWithForm>  

  )

}

export default AddPlacePopup;