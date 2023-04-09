// Login.js component /sign-in

function Login(){

  // функция обработки отправки формы
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("запрос на сервер с авторизацией");
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
        <button type="submit" className="form__submit form__submit_auth">Войти</button>
      </form>
    </div>
  );
}

export default Login;