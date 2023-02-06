export class Api {
  constructor({ baseURL, headers }) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  getUserData = () => {
    return fetch(this.baseURL + "/users/me", {
      headers: this.headers,
    }).then((res) => res.json());
  };

  editUserData = (values) => {
    return fetch(this.baseURL + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then((res) => res.json());
  };

  getInitialCards = () => {
    return fetch(this.baseURL + "/cards", {
      headers: this.headers,
    }).then((res) => res.json());
  };

  deleteCard = (id) => {
    return fetch(this.baseURL + "/cards/" + id, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => res.json());
  };

  createCard = (values) => {
    return fetch(this.baseURL + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        link: values.link,
      }),
    }).then((res) => res.json());
  };

  likeCard = (id) => {
    return fetch(this.baseURL + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then((res) => res.json());
  };
}
