import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../blocks/contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Popup from "./Popup";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  useEffect(() => {
    resetForm();
    setValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, props.isOpen]);

  return (
    <Popup name="profile" isOpen={props.isOpen} onClose={props.onClose}>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        size="large"
        titleBtn="Сохранить"
        onSubmit={handleSubmit}
        isLoading={props.isLoading}
        isDisabled={!isValid}
      >
        <fieldset className="popup__wraper-input">
          <input
            className="popup__input"
            onChange={handleChange}
            value={values.name || ""}
            type="text"
            id="name"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className={`popup__input-error ${
              !isValid && "popup__input-error_active" && props.isOpen
            }`}
            id="name-error"
          >
            {errors.name}
          </span>
          <input
            className="popup__input"
            onChange={handleChange}
            value={values.description || ""}
            type="text"
            id="about"
            name="description"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            className={`popup__input-error ${
              !isValid && "popup__input-error_active" && props.isOpen
            }`}
            id="about-error"
          >
            {errors.description}
          </span>
        </fieldset>
      </PopupWithForm>
    </Popup>
  );
}

export default EditProfilePopup;
