import React, {useContext} from "react"
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = (props) => {

  const currentUser = useContext(CurrentUserContext);

  function handleClick ()  {
    props.click(props.card);
  }

  function handleLikeClick () {
    props.like(props.card);
  }

  function handleDeleteClick () {
    props.delete(props.card)
  }

  const isOwn = props.card.owner === currentUser._id;
  
  // назначить кнопку удаления через className
  const cardDeleteButtonClassName = (
    `element__basket ${isOwn ? 'element__basket_status_active' : ''}`
  )

  // определить наличие лайка 
  const isLiked = props.card.likes.some(card => card._id === currentUser._id)

  // назначить статус кнопки лайка
  const cardLikeButtonClassName = `element__button ${isLiked ? 'element__button-like_status_active' : ''}`

  return (
    <li className="element">
      <div style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick} className="element__image" />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="element__subscription">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-position">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="element__like-counter">{props.card.likes.length}</div>
        </div>
      </div>  
    </li>
  )
}

export default Card; 