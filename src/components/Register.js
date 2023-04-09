// Register.js или маршрут sign-up
import { Link } from 'react-router-dom';

function Register(props) {

  // функция обработки отправки формы
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("запрос на сервер с регистрацией");
  }

  return(
    <div className="form-container">
      <form className="form form_auth" onSubmit={handleFormSubmit}>
        <h3 className="form__title form__title_auth">Регистрация</h3>
        <label>
          <input
            type="email"
            name="email"
            className="form__input form__input_auth"
            placeholder="Email"
            minLength="2"
            maxLength="30"
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
            required />
        </label>
        <button type="submit" className="form__submit form__submit_auth">Зарегистрироваться</button>
        <Link to="../sign-in" className="form__link">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  );
}

export default Register;