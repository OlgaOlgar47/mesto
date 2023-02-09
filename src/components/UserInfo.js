export class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
    return userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  changeAvatar(link) {
    this._avatar.src = link;
  }
}
