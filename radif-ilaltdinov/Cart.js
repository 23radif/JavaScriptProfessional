class Cart {
  constructor(source, container = '#cart') {
    this.source = source;
    this.container = container;
    this.countGoods = 0; //Общее кол-во товаров в корзине
    this.amount = 0; //Общая стоимость товаров в корзине
    this.cartItems = []; //Массив со всеми товарами
    this._init();
  }

  _render() {
    let $cartItemsDiv = $('<div/>', {
      class: 'cart-items-wrap'
    });
    let $totalGoods = $('<div/>', {
      class: 'cart-summary sum-goods'
    });
    let $totalPrice = $('<div/>', {
      class: 'cart-summary sum-price'
    });
    $(this.container).text('Корзина');
    $cartItemsDiv.appendTo($(this.container));
    $totalGoods.appendTo($(this.container));
    $totalPrice.appendTo($(this.container));
    //jQ-UI Отлавливаем перемещаемый элемент в корзину и отправляем в this.addProduct():
    $(this.container).droppable({
      drop: (event, ui) => {
        this.addProduct(ui.draggable.find('.buyBtn'));
      }
    });
  }

  _init() {
    this._render();
    fetch(this.source)
      .then(result => result.json())
      .then(data => {
        for (let product of data.contents) {
          this.cartItems.push(product);
          this._renderItem(product);
        }
        this.countGoods = data.countGoods;
        this.amount = data.amount;
        this._renderSum();
      });
  }

  _renderSum() {
    $('.sum-goods').text(`Всего товаров в корзине: ${this.countGoods}`);
    $('.sum-price').text(`Общая стоимость: ${this.amount} руб.`);
  }

  _renderItem(product) {
    let $container = $('<div/>', {
      class: 'cart-item',
      'data-product': product.id_product
    });
    let $removeElement = $('<a/>', { //удаление товара
      href: '#',
      class: 'remove-element',
      text: 'x'
    });
    $container.append($(`<p class="product-name">${product.product_name}</p>`));
    $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
    $container.append($(`<p class="product-price">${product.price} руб.</p>`));
    $removeElement.appendTo($container); //удаление товара
    $container.appendTo($('.cart-items-wrap'));
    this._remove(product, $removeElement);
  }

  _updateCart(product) {
    let $container = $(`div[data-product="${product.id_product}"]`);
    $container.find('.product-quantity').text(product.quantity);
    $container.find('.product-price').text(`${product.quantity * product.price} руб.`);
  }

  addProduct(element) {
    let productId = +$(element).data('id');
    let find = this.cartItems.find(product => product.id_product === productId);
    if (find) {
      find.quantity++;
      this.countGoods++;
      this.amount += find.price;
      this._updateCart(find);
    } else {
      let product = {
        id_product: productId,
        price: +$(element).data('price'),
        product_name: $(element).data('name'),
        quantity: 1
      };
      this.cartItems.push(product);
      this.amount += product.price;
      this.countGoods++;
      this._renderItem(product);
    }
    this._renderSum();
  }

  _remove(product, $removeElement) {
    //TODO: удаление товара
    $removeElement.click(event => {
      event.preventDefault();
      if (product.quantity > 0) {
        if (+product.id_product === +event.target.parentElement.dataset.product) {
          product.quantity--;
          this._updateCart(product);
          this.countGoods--;
          this.amount -= product.price;
          this._renderSum();

          if (!product.quantity) {
            event.target.parentElement.remove();
            this.cartItems.splice(this.cartItems.indexOf(product), 1) //так же удаление по индексу из массива
          }
        }
      }
    })
  }
}