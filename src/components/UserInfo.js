export class UserInfo {
  constructor({name, about}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    console.log(data);
    this._about.textContent = data.about;
  }
}