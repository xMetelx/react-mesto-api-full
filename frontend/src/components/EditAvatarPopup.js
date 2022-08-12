import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onSubmit}) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  function handleSubmit (evt) {
    evt.preventDefault();
    onSubmit({
      avatar: avatarRef.current.value
    })
  }

return (

    <PopupWithForm
      name = "change-avatar"
      title = "Обновить аватар"
      buttonText = "Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input required id="input-avatar" type="url" name="avatar" placeholder="Ваша ссылка" className="popup__input popup__input_avatar" ref={avatarRef} />
      <span className="input-avatar-error popup__inputs-error">Вы пропустили это поле</span>
    </PopupWithForm>
)}

export default EditAvatarPopup;