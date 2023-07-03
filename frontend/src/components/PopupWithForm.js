function PopupWithForm(props) {
  return (
        <form
          className={`popup__form popup__form_size_${props.size}`}
          name={`form-${props.name}`}
          action="#"
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button  disabled={props.isDisabled} className={`popup__button-save button-submit  ${props.isDisabled && 'popup__button-save_inactive'}`}type="submit">
            {props.isLoading ? "Сохранение..." : props.titleBtn}
          </button>
        </form>
  );
}

export default PopupWithForm;
