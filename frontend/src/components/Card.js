function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const isOwn = props.card.owner._id === props.currentUserId;
  const isLiked = props.card.likes.some((i) => i._id === props.currentUserId);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;
  return (
    <article className="card">
      {isOwn && (
        <button
          aria-label="Кнопка Удалить"
          type="button"
          className="card__basket-button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__wraper-title">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wraper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Кнопка Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
