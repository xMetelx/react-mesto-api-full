import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

//дописать onChange={} в инпуты, on

function Register ({onRegister}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const onChangePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister({email: email, password: password})


      // .then(resetForm)
      // .then(() => history.push('/sign-in'))
    }

  return (
    <div className="auth">
    <h1 className="auth__title">Регистрация</h1>
    <form className="auth__form" onSubmit={handleSubmit}>
    
      <input className="auth__input" value={email} onChange={onChangeEmail} name="email" required  id="input-email" type="email" minLength="7" maxLength="40" placeholder="Email" />
      <input className="auth__input" value={password} onChange={onChangePassword} name="password" required  id="input-password" type="password" minLength="5" maxLength="40" placeholder="Пароль" />
      <button className="auth__button" type="submit" >Зарегистрироваться</button>
    </form>
      <div className='auth__change'>
        <p className='auth__done'>Уже зарегистрированы?</p>
          <Link to="sign-in" className='auth__link'>Войти</Link>
      </div>

    </div>  
  )
  }
  
  export default Register;