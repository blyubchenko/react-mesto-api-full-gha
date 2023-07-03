import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Popup from "./Popup";

function EditAvatarPopup(props) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      resetForm();
    }
  }, [props.isOpen]);

  return (
    <Popup name="profile" isOpen={props.isOpen} onClose={props.onClose}>
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      titleBtn="Сохранить"
      size="medium"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isDisabled={!isValid}
    >
      <fieldset className="popup__wraper-input">
        <input
          onChange={handleChange}
          value={values.avatar || ""}
          className="popup__input"
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на  аватар"
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active &&" && props.isOpen
          }`}
          id="avatar-error"
        >
          {errors.avatar}
        </span>
      </fieldset>
    </PopupWithForm>
    </Popup>
  );
}

export default EditAvatarPopup;
