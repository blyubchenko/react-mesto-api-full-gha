import logo from "../images/logo/logo-min.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="логотип Место" className="header__logo" />
      <div className="header__wrapper">
        <p className="header__email">{props.loggedIn ? props.email : ""}</p>
        <button
          onClick={props.onClick}
          className={
            props.loggedIn ? "header__link header__link_logged" : "header__link"
          }
        >
          {props.text}
        </button>
      </div>
    </header>
  );
}
export default Header;
