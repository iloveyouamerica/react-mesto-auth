// Login.js component /sign-in

import React from 'react';
import * as mestoAuth from '../utils/mestoAuth.js';

function Login(props){

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  function handleInputChange(event) {
    // деструктурируем объект event.target
    const {name, value} = event.target;
    //console.log(`Name: ${name}, Value: ${value}`);

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  // функция обработки отправки формы
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("запрос на сервер с авторизацией");

    if(!formValue.email || !formValue.password) {
      return;
    }

    // вызываем функцию авторизации
    props.onLogin(formValue.email, formValue.password);
  }

  return(
    <div className="form-container">
      <form className="form form_auth" onSubmit={handleFormSubmit}>
        <h3 className="form__title form__title_auth">Вход</h3>
        <label>
          <input
            type="email"
            name="email"
            className="form__input form__input_auth"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            value={formValue.email}
            onChange={handleInputChange}
            required />
        </label>
        <label>
          <input
            type="password"
            name="password"
            className="form__input form__input_auth"
            placeholder="Пароль"
            minLength="2"
            maxLength="30"
            value={formValue.password}
            onChange={handleInputChange}
            required />
        </label>
        <button type="submit" className="form__submit form__submit_auth">Войти</button>
      </form>
    </div>
  );
}

export default Login;