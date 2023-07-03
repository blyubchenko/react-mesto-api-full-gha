import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Popup from "./Popup";

function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }
  useEffect(() => {
    if (props.isOpen) {
      resetForm();
      setValues({
        name: "",
        link: "",
      });
    }
  }, [props.isOpen]);

  return (
    <Popup name="profile" isOpen={props.isOpen} onClose={props.onClose}>
    <PopupWithForm
      name="photo"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      size="large"
      titleBtn="Создать"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isDisabled={!isValid}
    >
      <fieldset className="popup__wraper-input">
        <input
          onChange={handleChange}
          value={values.name || ""}
          className="popup__input"
          type="text"
          id="title"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active" && props.isOpen
          }`}
          id="title-error"
        >
          {errors.name}
        </span>
        <input
          onChange={handleChange}
          value={values.link || ""}
          className="popup__input"
          type="url"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active" && props.isOpen
          }`}
          id="link-error"
        >
          {errors.link}
        </span>
      </fieldset>
    </PopupWithForm>
    </Popup>
  );
}

export default AddPlacePopup;
