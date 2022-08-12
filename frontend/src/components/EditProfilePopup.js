import React, {useEffect, useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup ({isOpen, onClose, onSubmit}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  function onChangeName (evt) {
    setName(evt.target.value)
  }

  function onChangeDescription (evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit (evt) {
    evt.preventDefault();
    onSubmit({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name = "edit-profile"
      title = "Редактировать профиль"
      buttonText="Сохранить"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
    >
      <input onChange={onChangeName} value={name} required id="input-name" type="text" name="name" minLength="2" maxLength="40" placeholder="Ваше имя" className="popup__input popup__input_name_name" /> 
      <span className="input-name-error popup__inputs-error">Вы пропустили это поле</span>
      <input onChange={onChangeDescription} value={description} required id="input-job" type="text" name="about" minLength="2" maxLength="200" placeholder="Род занятий" className="popup__input popup__input_name_job" />
      <span className="input-job-error popup__inputs-error">Вы пропустили это поле</span>

    </PopupWithForm>
  )

}

export default EditProfilePopup;