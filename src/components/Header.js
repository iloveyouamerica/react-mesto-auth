// компонент Header
import logoPath from '../images/header/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  // useLocation - объект содержит информацию о текущем пути, параметрах запроса и других свойствах местоположения
  // у useLocation есть свойство pathname, там содержится адрес текущей страницы, зная его мы можем менять / убирать ссылку в header
  //console.log(useLocation().pathname);

  return(
    <header className="header">
      <img src={logoPath} alt="Логотип страницы в заголовке." className="header__logo" />
      {useLocation().pathname == "/sign-up" && <Link to="./sign-in" className="header__link">Войти</Link>} 
      {useLocation().pathname == "/sign-in" && <Link to="./sign-up" className="header__link">Регистрация</Link>}
      {useLocation().pathname == "/mesto" &&
        <> 
          <button
            type="button"
            className={`header__menu-button ${props.menuBtn ? "header__menu-button_click" : ""}`}
            onClick={props.onVisible}></button>
          <nav className="header__menu">
            <span className="header__email">{props.email}</span>
            <Link to="./sign-in" className="header__link header__link_exit" onClick={props.onLogOut}>Выйти</Link>
          </nav>
        </>
      }
    </header>
  );
}

export default Header;