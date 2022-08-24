import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function Login ({onLogin}) {
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
    if (!email || !password) {
      console.log("not mail, not pass");
    }
    else {
      onLogin({email, password})
        .then(resetForm)
        .then(() => history.push("/"))
    }
  }

return (
  <div className="auth">
  <h1 className="auth__title">Вход</h1>
  <form onSubmit={handleSubmit} className="auth__form">
    <input className="auth__input" onChange={onChangeEmail} required value={email} id="input-email" name="email" type="email" minLength="7" maxLength="40" placeholder="Email" />
    <input className="auth__input" onChange={onChangePassword} required value={password} id="input-password" name="password" type="password" placeholder="Пароль" />
    <button className="auth__button" type="submit" >Войти</button>
    </form>
  </div>  
)
}

export default Login;