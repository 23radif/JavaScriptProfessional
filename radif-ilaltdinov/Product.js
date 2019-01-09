class Product {
  constructor(id, title, price, img = 'https://placehold.it/200x150', container = '#product') {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
    this.container = container;
    this._render(this.container);
  }

  _render(container) {
    let $wrapper = $('<div/>', {
      class: 'product'
    });
    //jQ-UI Добавляем возможность перемещения в корзинуЖ
    $wrapper.draggable({
      revert: true
    });
    let $desc = $('<div/>', {
      class: 'desc'
    });
    let $img = $('<img/>', {
      src: this.img,
      alt: 'Some img alt'
    });
    let $name = $('<p/>', {
      text: this.title
    });
    let $price = $(`<p>Цена: <span class="product-price">${this.price}</span> руб.</p>`);

    let $buyBtn = $('<button/>', {
      class: 'buyBtn',
      text: 'Купить',
      'data-id': this.id,
      'data-price': this.price,
      'data-name': this.title
    });

    // Создание структуры
    $img.appendTo($wrapper);
    $name.appendTo($desc);
    $price.appendTo($desc);
    $buyBtn.appendTo($desc);
    $desc.appendTo($wrapper);
    $(container).append($wrapper);
  }

}