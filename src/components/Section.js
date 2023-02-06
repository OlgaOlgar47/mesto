export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  setItem(element) {
    this._container.prepend(element);
  }

  //публичный метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);      
    });
  }
}