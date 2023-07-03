import React, { useEffect } from "react";
export default function Popup (props) {

  useEffect(() => {
    if (!props.isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [props.isOpen, props.onClose])


  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        props.onClose();
    }
  }

  return (
    <div
    className={`popup popup_${props.name} ${
      props.isOpen ? "popup_opened" : ""
    } `}
    onClick={handleOverlay}
  >
     <div className= {props.name !== 'photo-viwer' ? "popup__container" : "popup__container_type-viwer"}>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        {props.children}
      </div>
    </div>
  );
};