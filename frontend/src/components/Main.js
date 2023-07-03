import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../blocks/contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          src={currentUser.avatar}
          alt="Фото профиля"
          className="profile__avatar"
        />
        <button
          onClick={onEditAvatar}
          aria-label="Кнопка редактирования аватара"
          type="button"
          className="profile__avatar-button"
        ></button>
        <div className="profile__wraper-title">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            aria-label="Кнопка редактирования профиля"
            type="button"
          ></button>
        </div>
        <p className="profile__subtitle">{currentUser.about}</p>
        <button
          onClick={onAddPlace}
          className="profile__photo-button"
          aria-label="Кнопка добавить фото"
          type="button"
        ></button>
      </section>

      <section className="cards" aria-label="Галерея мест">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
              currentUserId={currentUser._id}
              key={card._id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
