import Popup from "./Popup";

function ImagePopup(props) {
  return (
    <Popup name="photo-viwer" isOpen={props.card._id} onClose={props.onClose}>
      <div className="popup__wraper">
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <p className="popup__description">{props.card.name}</p>
      </div>
    </Popup>
  );
}
export default ImagePopup;