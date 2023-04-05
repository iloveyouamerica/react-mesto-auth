// компонент Header
import logoPath from '../images/header/logo.svg';

function Header(props) {
  return(
    <header className="header">
      <img src={logoPath} alt="Логотип страницы в заголовке." className="header__logo" />
    </header>
  );
}

export default Header;