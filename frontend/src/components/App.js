import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext'
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/auth';

function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen]  = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [IsInfoTooltipOpen, setIsInfoTooltipOpened] = useState(false);
  const [isSucceed, setSucceed] = useState(true);
  const history = useHistory();

  const onRegister = ({email, password}) => {
    return auth
      .signUp(email, password)
      .then(() => {
        setSucceed(true);
        setIsInfoTooltipOpened(true);
        history.push('/sign-in')
      })
      .catch(() => {
        setSucceed(false)
        setIsInfoTooltipOpened(true);
      })
    }

  const onLogin = ({email, password}) => {
    return auth
      .signIn(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setUserData(email);
        setLoggedIn(true);
        history.push('/')
      })
      .catch(() => {
        setLoggedIn(false)
        setSucceed(false);
        setIsInfoTooltipOpened(true);
      })
  }

  useEffect (() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
          .then((data) => {
            setLoggedIn(true);
            setUserData(data.email);
            history.push('/');
          })
          .catch(err => console.log(err))
    }
  }, [history])

  useEffect (() => {
    const token = localStorage.getItem('token');
      if (token) {
        Promise.all([api.getUserInfo(token), api.getCards(token)])
          .then(([userData, cards]) => {
            setCurrentUser(userData)
            setCards(cards)
          })
          .catch(err => console.log(err))
      }
  }, [loggedIn])


  // useEffect (() => {
  //   api.getUserInfo()
  //     .then((data) => setCurrentUser(data))
  //     .catch(err => console.log(err))
  //   api.getCards()
  //     .then((data) => setCards(data))
  //     .catch(err => console.log(err))
  // }, 
  // []);



  // useEffect(() => {
  //   if (loggedIn) 
  //     history.push('/')
  // }, [history, loggedIn])

  const onSignOut = () => {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }  

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpened(false);
  }

  function handleEditProfileClick  () {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick  () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick  () {
    setisAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick (card) {
    setConfirmDeletePopupOpen(true);
    setCardToDelete(card)
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(card => card._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err))
  }

  function handleCardDelete () {
    api.removeCard(cardToDelete._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== cardToDelete._id))
        closeAllPopups()
  })
      .catch(err => console.log(err))
  }

  function handleUpdateUser (data) {
    api.patchProfile(data.name, data.about)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar (data) {
    api.patchAvatar (data.avatar) 
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit (data) {
    api.postCard(data.name, data.link)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userData} onSignOut={onSignOut}/>

        <Switch>

          <Route path = "/sign-up">
            <Register onRegister = {onRegister} />
          </Route>
          
          <Route path = "/sign-in"> 
            <Login onLogin={onLogin} />
          </Route>

          <ProtectedRoute
            exact
            path ="/"
            loggedIn = {loggedIn}

            onEditAvatar = {handleEditAvatarClick}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDeleteClick}
            cards = {cards}

            component = {Main}
          ></ProtectedRoute>

        </Switch>  
          
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser} /> 
        <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onSubmit={handleUpdateAvatar} />
        <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onSubmit = {handleAddPlaceSubmit} />
        <ConfirmDeletePopup isOpen = {isConfirmDeletePopupOpen} onClose = {closeAllPopups} onSubmit = {handleCardDelete} />

        <ImagePopup 
          card = {selectedCard}
          onClose = {closeAllPopups}
        />

        <InfoTooltip
          id = "accept"
          isOpen = {IsInfoTooltipOpen}
          onClose = {closeAllPopups}
          isSucceed = {isSucceed}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
