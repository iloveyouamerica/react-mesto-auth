// компонент Header
import logoPath from '../images/header/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header(props) {
  // useLocation - объект содержит информацию о текущем пути, параметрах запроса и других свойствах местоположения
  // у useLocation есть свойство pathname, там содержится адрес текущей страницы, зная его мы можем менять / убирать ссылку в header
  //console.log(useLocation().pathname);

  return(
    <header className="header">
      <img src={logoPath} alt="Логотип страницы в заголовке." className="header__logo" />
      <Routes>
        <Route exact path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
        <Route exact path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
        <Route exact path="/mesto" element={
          <> 
            <button
              type="button"
              className={`header__menu-button ${props.menuBtn ? "header__menu-button_click" : ""}`}
              onClick={props.onVisible}></button>
            <nav className="header__menu">
              <span className="header__email">{props.email}</span>
              <Link to="/sign-in" className="header__link header__link_exit" onClick={props.onLogOut}>Выйти</Link>
            </nav>
          </>
        } />
      </Routes>
    </header>
  );
}

export default Header;