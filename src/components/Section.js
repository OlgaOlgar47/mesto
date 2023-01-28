export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  setItem(element) {
    this._container.prepend(element);
  }

  //публичный метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);      
    });
  }
}