import React from "react";
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function ActionConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(props.card);
  }
  return (
    <Popup name="confirmation" isOpen={props.isOpen} onClose={props.onClose}>
      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        titleBtn="Да"
        size="small"
        onSubmit={handleSubmit}
      />
    </Popup>
  );
}

export default ActionConfirmationPopup;
