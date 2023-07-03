import React from "react";

export default function AuthForm(props) {
  return (
    <div className="login">
      <h3 className="login__title">{props.titleName}</h3>
      <form onSubmit={props.onSubmit} className="login__form">
        <div className="login__inputs">
          <input
            required
            id="email"
            name="email"
            type="email"
            value={props.onValues.email || ""}
            onChange={props.onChange}
            className="login__input"
            placeholder="Email"
            minLength="6"
            maxLength="64"
          />
          <span
            className={`popup__input-error ${
              props.isDisabled && "popup__input-error_active"
            }`}
            id="about-error"
          >
            {props.onErrors.email}
          </span>
          <input
            required
            id="password"
            name="password"
            type="password"
            value={props.onValues.password || ""}
            onChange={props.onChange}
            className="login__input"
            placeholder="Пароль"
            minLength="4"
            maxLength="10"
          />
          <span
            className={`popup__input-error ${
              props.isDisabled && "popup__input-error_active"
            }`}
            id="about-error"
          >
            {props.onErrors.password}
          </span>
        </div>
        <button disabled={props.isDisabled} type="submit" className={`login__button ${props.isDisabled && 'login__button_inactive'}`}>
          {props.buttonName}
        </button>
      </form>
    </div>
  );
}
