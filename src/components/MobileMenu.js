// MobileMenu.js

import { Link } from 'react-router-dom';

function MobileMenu(props) {
  return(
    <nav className={`mobile-menu ${props.state ? "mobile-menu_visible" : ""}`}>
      <span className="header__email">{props.email}</span>
      <Link to="./sign-in" className="header__link header__link_exit" onClick={props.onLogOut}>Выйти</Link>
    </nav>
  );
}

export default MobileMenu;