import React, {useState} from 'react';
import headerLogo from '../images/logo.svg';
import headerBurger from '../images/hamburger_icon_143010.svg';
import {Link, Route} from 'react-router-dom'

function Header ({email, onSignOut}) {

  const [isOpen, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(true)
  }

  const handleMenuQuit = () => {
    setOpen(false)
  }

  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="Логотип"/>
      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{email}</p>
          <button className="header__button" type="button" onClick={onSignOut}>Выйти</button>
        </div>
          <button className="header__burger-menu-button" type="button" onClick={handleMenuClick}>
            <img src={headerBurger} className="header__burger-menu" alt="Меню"/>
          </button>

      </Route>
      <Route path="/sign-up">
        <Link className="header__link" to='/sign-in'>Войти</Link> 
      </Route>
      <Route path="/sign-in">
        <Link className="header__link" to="/sign-up">Регистрация</Link>
      </Route>
    </header>
  );
}

export default Header;