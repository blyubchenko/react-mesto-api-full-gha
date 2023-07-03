import React from "react";
import logoTrue from "../images/logo/true.svg";
import logoFalse from "../images/logo/false.svg";
import Popup from "./Popup";
function InfoTooltip(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
        <img
          src={props.isSuccess ? logoTrue : logoFalse}
          alt={props.isSuccess ? "Успешная регистрация" : "Ошибка регистрации"}
          className="popup__icon"
        />
        <p className="popup__subtitle">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        </Popup>
  );
}
export default InfoTooltip;
