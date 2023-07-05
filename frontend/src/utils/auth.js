export const BASE_URL = "https://api.mesto.blyubchenko.nomoreparties.sbs";

function inspectResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(new Error(`Error ${response.status}`));
  }
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => inspectResponse(response));
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => inspectResponse(response))
}

export function logout() {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => inspectResponse(response))
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => inspectResponse(response))
    .then((data) =>  data);
};
