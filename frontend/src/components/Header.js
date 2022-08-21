import React from 'react';
import headerLogo from '../images/logo.svg';
import {Link, Route} from 'react-router-dom'

function Header ({email, onSignOut}) {
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="Логотип"/>
      <Route exact path="/">
        <div className="header__info">
          <p className="header__email">{email}</p>
          <button className="header__button" type="button" onClick={onSignOut}>Выйти</button>
        </div>
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