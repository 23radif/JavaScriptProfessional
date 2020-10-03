"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cart =
/*#__PURE__*/
function () {
  function Cart() {
    var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'getCart.json';
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.cart';
    var containerShoppingCart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#shopping-cart';

    _classCallCheck(this, Cart);

    this.source = source;
    this.container = container;
    this.countGoods = 0; //Общее кол-во товаров в корзине

    this.amount = 0; //Общая стоимость товаров в корзине

    this.cartItems = []; //Массив со всеми товарами

    this.containerShoppingCart = containerShoppingCart;

    this._init();
  }

  _createClass(Cart, [{
    key: "_render",
    value: function _render() {
      var $totalGoods = $("<a href=\"checkout.html\"><img src=\"img/cart.svg\" alt=\"cart\"><div class=\"cart-circle-five sum-goods\"></div></a>");
      var $cartItemsDiv = $('<form/>', {
        class: 'cart-items-wrap cart-box'
      });
      var $totalPrice = $("\n      <div class=\"total\"><p>TOTAL</p><p class=\"sum-price\"></p></div>\n      <button class=\"cart-button-checkout href-checkout\">CHECKOUT</button>\n      <button class=\"cart-button-go-to-cart href-go-to-cart\">GO TO CART</button>\n");
      $totalGoods.appendTo($(this.container));
      $cartItemsDiv.appendTo($(this.container));
      $totalPrice.appendTo($cartItemsDiv); // //jQ-UI Отлавливаем перемещаемый элемент в корзину и отправляем в this.addProduct():
      // $(this.container).droppable({
      //   drop: (event, ui) => {
      //     this.addProduct(ui.draggable.find('.buyBtn'));
      //   }
      // });
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this = this;

      this._render();

      if (!localStorage.getItem('mycart')) {
        //добавляем localStorage
        fetch(this.source).then(function (result) {
          return result.json();
        }).then(function (data) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data.contents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var product = _step.value;

              _this.cartItems.push(product);

              _this._renderItem(product);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          _this.countGoods = data.countGoods;
          _this.amount = data.amount;
          localStorage.setItem('mycart', JSON.stringify(_this.cartItems));
          localStorage.setItem('amount', JSON.stringify(_this.amount));
          localStorage.setItem('countGoods', JSON.stringify(_this.countGoods));

          _this._renderSum();
        });
      } else {
        this.cartItems = JSON.parse(localStorage.getItem('mycart'));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.cartItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var product = _step2.value;

            this._renderItem(product);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.amount = JSON.parse(localStorage.getItem('amount'));
        this.countGoods = JSON.parse(localStorage.getItem('countGoods'));

        this._renderSum();
      }

      this._renderShoppingCart();

      $('.href-checkout').click(function (event) {
        event.preventDefault();
        location.href = 'checkout.html';
      });
      $('.href-go-to-cart').click(function (event) {
        event.preventDefault();
        location.href = 'shopping-cart.html';
      });

      this._autocomplete();

      this._dragAndDrop();
    }
  }, {
    key: "_renderSum",
    value: function _renderSum() {
      $('.sum-goods').text("".concat(this.countGoods));
      $('.sum-price').text("".concat(this.amount, "$"));
    }
  }, {
    key: "_renderItem",
    value: function _renderItem(product) {
      var $container = $('<div/>', {
        class: 'cart-item cart-flex',
        'data-product': product.id_product
      });
      var $reboxZane = $('<div/>', {
        class: 'rebox-zane'
      });
      var $removeElement = $("<p><a class=\"icon-cancel-circled\" href=\"#\"></a></p>");
      $reboxZane.append("\n      <p class=\"product-name\">".concat(product.product_name, "</p>\n      <p><i class=\"icon-star\"></i><i class=\"icon-star\"></i><i class=\"icon-star\"></i><i class=\"icon-star\"></i><i class=\"icon-star-half-alt\"></i></p>\n      <p><span class=\"product-quantity\">").concat(product.quantity, "</span><span> x </span><span>$").concat(product.price, "</span></p>\n    "));
      $removeElement.appendTo($reboxZane);
      $container.append($("\n      <img class=\"cart-img\" src=\"".concat(product.img, "\" alt=\"").concat(product.alt, "\">\n")));
      $reboxZane.appendTo($container);
      $container.prependTo($('.cart-items-wrap'));

      this._remove(product, $removeElement, $container);
    }
  }, {
    key: "_updateCart",
    value: function _updateCart(product) {
      var $container = $("div[data-product=\"".concat(product.id_product, "\"]"));
      $container.find('.product-quantity').text(product.quantity);
      $container.find('.product-price').text("$".concat(product.quantity * product.price));
    }
  }, {
    key: "addProduct",
    value: function addProduct(element) {
      var productId = +$(element).data('id');
      var find = this.cartItems.find(function (product) {
        return product.id_product === productId;
      });

      if (find) {
        find.quantity++;
        this.countGoods++;
        this.amount += find.price;

        this._updateCart(find);
      } else {
        var product = {
          id_product: productId,
          img: $(element).data('img'),
          alt: $(element).data('alt'),
          price: +$(element).data('price'),
          product_name: $(element).data('name'),
          quantity: 1
        };
        this.cartItems.push(product);
        this.amount += product.price;
        this.countGoods++;

        this._renderItem(product);
      }

      localStorage.setItem('mycart', JSON.stringify(this.cartItems)); //Так же добавляем данные в localStorage

      localStorage.setItem('amount', JSON.stringify(this.amount));
      localStorage.setItem('countGoods', JSON.stringify(this.countGoods));

      this._renderSum();
    }
  }, {
    key: "_remove",
    value: function _remove(product, $removeElement, $container, $subtotal, $quantity) {
      var _this2 = this;

      $removeElement.click(function (event) {
        event.preventDefault();

        if (product.quantity > 0) {
          product.quantity--;

          _this2._updateCart(product);

          _this2.countGoods--;
          _this2.amount -= product.price;

          _this2._renderSum();

          if (!product.quantity) {
            $container.remove();

            _this2.cartItems.splice(_this2.cartItems.indexOf(product), 1); //так же удаление по индексу из массива

          }

          if ($subtotal) {
            $subtotal.text(product.price * product.quantity);
            $quantity.children().val(product.quantity);
          }

          localStorage.setItem('mycart', JSON.stringify(_this2.cartItems));
          localStorage.setItem('amount', JSON.stringify(_this2.amount));
          localStorage.setItem('countGoods', JSON.stringify(_this2.countGoods));
        }
      });
    }
  }, {
    key: "_renderShoppingCart",
    value: function _renderShoppingCart() {
      var _this3 = this;

      $(this.containerShoppingCart).append("\n      <div class=\"product-row\">\n          <div class=\"product-row-first\"><p>PRODUCT DETAILS</p></div>\n          <div class=\"product-row-other\">\n              <div><p>UNITE PRICE</p></div>\n              <div><p>QUANTITY</p></div>\n              <div><p>SHIPPING</p></div>\n              <div><p>SUBTOTAL</p></div>\n              <div><p>ACTION</p></div></div>\n      </div>\n    ");
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.cartItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var product = _step3.value;
          var $container = $('<div/>', {
            class: 'product-row'
          });
          var $productRowFirst = "\n        <a href=\"product.html\" class=\"product-row-first\">\n            <div><img class=\"shopping-cart-img\" src=\"".concat(product.img, "\" alt=\"").concat(product.alt, "\"></div>\n            <div>\n                <div><p>").concat(product.product_name, "</p></div>\n                <div><p><i class=\"icon-star\"></i><i class=\"icon-star\"></i><i class=\"icon-star\"></i><i class=\"icon-star\"></i><i class=\"icon-star-half-alt\"></i></p></div>\n                <div><p>Color:</p><p>Red</p></div>\n                <div><p>Size:</p><p>XII</p></div>\n            </div>\n        </a>\n      ");
          var $productRowOther = $('<div/>', {
            class: 'product-row-other'
          });
          var $unitePrice = $("<div><p>".concat(product.price, "</p></div>"));
          var $quantity = $("<div><input type=\"number\" value=\"".concat(product.quantity, "\" min=\"1\" max=\"999\"></div>"));
          var $shipping = $("<div><p>FREE</p></div>");
          var $subtotal = $("<div>".concat(product.price * product.quantity, "</div>"));
          var $action = $("<div><p><a class=\"icon-cancel-circled\" href=\"#\"></a></p></div>");
          $container.append($productRowFirst);
          $productRowOther.append($unitePrice);
          $productRowOther.append($quantity);
          $productRowOther.append($shipping);
          $productRowOther.append($subtotal);
          $productRowOther.append($action);
          $productRowOther.appendTo($container);
          $($container).appendTo(this.containerShoppingCart);

          this._remove(product, $action, $container, $subtotal, $quantity);

          this._quantity($quantity, product, $subtotal);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      $(this.containerShoppingCart).append("\n      <div class=\"product-shopping-cart\">\n          <button class=\"clear-shopping-cart\">CLEAR SHOPPING CART</button>\n          <button class=\"href-checkout\">CONTINUE SHOPPING</button>\n      </div>\n      <div class=\"product-shipping-total\">\n          <div>\n              <p>SHIPPING ADRESS</p>\n              <input id=\"product-shipping-adress\" list=\"shipping-adress\" placeholder=\"Bangladesh\">\n              <datalist id=\"shipping-adress\">\n                  <option label=\"Bangladesh\" value=\"Bangladesh\"></option>\n                  <option label=\"France\" value=\"France\"></option>\n                  <option label=\"Italia\" value=\"Italia\"></option>\n                  <option label=\"South Korea\" value=\"South Korea\"></option>\n                  <option label=\"USA\" value=\"USA\"></option>\n                  <option label=\"Uzbekistan\" value=\"Uzbekistan\"></option>\n                  <option label=\"Poland\" value=\"Poland\"></option>\n                  <option label=\"China\" value=\"China\"></option>\n                  <option label=\"Canada\" value=\"Canada\"></option>\n              </datalist>\n              <input type=\"text\" placeholder=\"State\">\n              <input type=\"text\" placeholder=\"Postcode/Zip\">\n              <button>GET A QUOTE</button>\n          </div>\n          <div>\n              <p>COUPON DISCOUNT</p>\n              <p>Enter your coupon code if you have one</p>\n              <input type=\"text\" placeholder=\"State\">\n              <button>APPLY COUPON</button>\n          </div>\n          <div>\n              <p>SUB TOTAL</p><p class=\"sum-price\">".concat(this.amount, "$</p>\n              <p>GRAND TOTAL</p><p class=\"sum-price\">").concat(this.amount, "$</p>\n              <div></div>\n             <button class=\"href-checkout\">PROCEED TO CHECKOUT</button>\n          </div>\n      </div>\n    "));
      $('.clear-shopping-cart').click(function () {
        $(_this3.containerShoppingCart).remove();
        $('.cart-items-wrap').remove();
        $('.sum-goods').text('0');
        localStorage.clear();
      });
    }
  }, {
    key: "_quantity",
    value: function _quantity($quantity, product, $subtotal) {
      var _this4 = this;

      $quantity.on('click', 'input', event, function () {
        _this4._quantityUpdate($quantity, product, $subtotal);
      });
      $quantity.keyup(event, function () {
        _this4._quantityUpdate($quantity, product, $subtotal);
      });
    }
  }, {
    key: "_quantityUpdate",
    value: function _quantityUpdate($quantity, product, $subtotal) {
      this.cartItems[this.cartItems.indexOf(product)].quantity = event.target.value;
      product.quantity = event.target.value;
      this.amount = 0;
      this.countGoods = 0;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.cartItems[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var item = _step4.value;
          this.amount += item.quantity * item.price;
          this.countGoods += +item.quantity;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      $subtotal.text(product.price * product.quantity);

      this._updateCart(product);

      this._renderSum();

      localStorage.setItem('mycart', JSON.stringify(this.cartItems)); //Так же добавляем данные в localStorage

      localStorage.setItem('amount', JSON.stringify(this.amount));
      localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
    } //jQuery UI

  }, {
    key: "_autocomplete",
    value: function _autocomplete() {
      var availableTags = ['a', 'ability', 'able', 'about', 'above', 'accept', 'according', 'account', 'across', 'act', 'action', 'activity', 'actually', 'add', 'address', 'administration', 'admit', 'adult', 'affect', 'after', 'again', 'against', 'age', 'agency', 'agent', 'ago', 'agree', 'agreement', 'ahead', 'air', 'all', 'allow', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'American', 'among', 'amount', 'analysis', 'and', 'animal', 'another', 'answer', 'any', 'anyone', 'anything', 'appear', 'apply', 'approach', 'area', 'argue', 'arm', 'around', 'arrive', 'art', 'article', 'artist', 'as', 'ask', 'assume', 'at', 'attack', 'attention', 'attorney', 'audience', 'author', 'authority', 'available', 'avoid', 'away', 'baby', 'back', 'bad', 'bag', 'ball', 'bank', 'bar', 'base', 'be', 'beat', 'beautiful', 'because', 'become', 'bed', 'before', 'begin', 'behavior', 'behind', 'believe', 'benefit', 'best', 'better', 'between', 'beyond', 'big', 'bill', 'billion', 'bit', 'black', 'blood', 'blue', 'board', 'body', 'book', 'born', 'both', 'box', 'boy', 'break', 'bring', 'brother', 'budget', 'build', 'building', 'business', 'but', 'buy', 'by', 'call', 'camera', 'campaign', 'can', 'cancer', 'candidate', 'capital', 'car', 'card', 'care', 'career', 'carry', 'case', 'catch', 'cause', 'cell', 'center', 'central', 'century', 'certain', 'certainly', 'chair', 'challenge', 'chance', 'change', 'character', 'charge', 'check', 'child', 'choice', 'choose', 'church', 'citizen', 'city', 'civil', 'claim', 'class', 'clear', 'clearly', 'close', 'coach', 'cold', 'collection', 'college', 'color', 'come', 'commercial', 'common', 'community', 'company', 'compare', 'computer', 'concern', 'condition', 'conference', 'Congress', 'consider', 'consumer', 'contain', 'continue', 'control', 'cost', 'could', 'country', 'couple', 'course', 'court', 'cover', 'create', 'crime', 'cultural', 'culture', 'cup', 'current', 'customer', 'cut', 'dark', 'data', 'daughter', 'day', 'dead', 'deal', 'death', 'debate', 'decade', 'decide', 'decision', 'deep', 'defense', 'degree', 'Democrat', 'democratic', 'describe', 'design', 'despite', 'detail', 'determine', 'develop', 'development', 'die', 'difference', 'different', 'difficult', 'dinner', 'direction', 'director', 'discover', 'discuss', 'discussion', 'disease', 'do', 'doctor', 'dog', 'door', 'down', 'draw', 'dream', 'drive', 'drop', 'drug', 'during', 'each', 'early', 'east', 'easy', 'eat', 'economic', 'economy', 'edge', 'education', 'effect', 'effort', 'eight', 'either', 'election', 'else', 'employee', 'end', 'energy', 'enjoy', 'enough', 'enter', 'entire', 'environment', 'environmental', 'especially', 'establish', 'even', 'evening', 'event', 'ever', 'every', 'everybody', 'everyone', 'everything', 'evidence', 'exactly', 'example', 'executive', 'exist', 'expect', 'experience', 'expert', 'explain', 'eye', 'face', 'fact', 'factor', 'fail', 'fall', 'family', 'far', 'fast', 'father', 'fear', 'federal', 'feel', 'feeling', 'few', 'field', 'fight', 'figure', 'fill', 'film', 'final', 'finally', 'financial', 'find', 'fine', 'finger', 'finish', 'fire', 'firm', 'first', 'fish', 'five', 'floor', 'fly', 'focus', 'follow', 'food', 'foot', 'for', 'force', 'foreign', 'forget', 'form', 'former', 'forward', 'four', 'free', 'friend', 'from', 'front', 'full', 'fund', 'future', 'game', 'garden', 'gas', 'general', 'generation', 'get', 'girl', 'give', 'glass', 'go', 'goal', 'good', 'government', 'great', 'green', 'ground', 'group', 'grow', 'growth', 'guess', 'gun', 'guy', 'hair', 'half', 'hand', 'hang', 'happen', 'happy', 'hard', 'have', 'he', 'head', 'health', 'hear', 'heart', 'heat', 'heavy', 'help', 'her', 'here', 'herself', 'high', 'him', 'himself', 'his', 'history', 'hit', 'hold', 'home', 'hope', 'hospital', 'hot', 'hotel', 'hour', 'house', 'how', 'however', 'huge', 'human', 'hundred', 'husband', 'I', 'idea', 'identify', 'if', 'image', 'imagine', 'impact', 'important', 'improve', 'in', 'include', 'including', 'increase', 'indeed', 'indicate', 'individual', 'industry', 'information', 'inside', 'instead', 'institution', 'interest', 'interesting', 'international', 'interview', 'into', 'investment', 'involve', 'issue', 'it', 'item', 'its', 'itself', 'job', 'join', 'just', 'keep', 'key', 'kid', 'kill', 'kind', 'kitchen', 'know', 'knowledge', 'land', 'language', 'large', 'last', 'late', 'later', 'laugh', 'law', 'lawyer', 'lay', 'lead', 'leader', 'learn', 'least', 'leave', 'left', 'leg', 'legal', 'less', 'let', 'letter', 'level', 'lie', 'life', 'light', 'like', 'likely', 'line', 'list', 'listen', 'little', 'live', 'local', 'long', 'look', 'lose', 'loss', 'lot', 'love', 'low', 'machine', 'magazine', 'main', 'maintain', 'major', 'majority', 'make', 'man', 'manage', 'management', 'manager', 'many', 'market', 'marriage', 'material', 'matter', 'may', 'maybe', 'me', 'mean', 'measure', 'media', 'medical', 'meet', 'meeting', 'member', 'memory', 'mention', 'message', 'method', 'middle', 'might', 'military', 'million', 'mind', 'minute', 'miss', 'mission', 'model', 'modern', 'moment', 'money', 'month', 'more', 'morning', 'most', 'mother', 'mouth', 'move', 'movement', 'movie', 'Mr', 'Mrs', 'much', 'music', 'must', 'my', 'myself', 'name', 'nation', 'national', 'natural', 'nature', 'near', 'nearly', 'necessary', 'need', 'network', 'never', 'new', 'news', 'newspaper', 'next', 'nice', 'night', 'no', 'none', 'nor', 'north', 'not', 'note', 'nothing', 'notice', 'now', 'n\'t', 'number', 'occur', 'of', 'off', 'offer', 'office', 'officer', 'official', 'often', 'oh', 'oil', 'ok', 'old', 'on', 'once', 'one', 'only', 'onto', 'open', 'operation', 'opportunity', 'option', 'or', 'order', 'organization', 'other', 'others', 'our', 'out', 'outside', 'over', 'own', 'owner', 'page', 'pain', 'painting', 'paper', 'parent', 'part', 'participant', 'particular', 'particularly', 'partner', 'party', 'pass', 'past', 'patient', 'pattern', 'pay', 'peace', 'people', 'per', 'perform', 'performance', 'perhaps', 'period', 'person', 'personal', 'phone', 'physical', 'pick', 'picture', 'piece', 'place', 'plan', 'plant', 'play', 'player', 'PM', 'point', 'police', 'policy', 'political', 'politics', 'poor', 'popular', 'population', 'position', 'positive', 'possible', 'power', 'practice', 'prepare', 'present', 'president', 'pressure', 'pretty', 'prevent', 'price', 'private', 'probably', 'problem', 'process', 'produce', 'product', 'production', 'professional', 'professor', 'program', 'project', 'property', 'protect', 'prove', 'provide', 'public', 'pull', 'purpose', 'push', 'put', 'quality', 'question', 'quickly', 'quite', 'race', 'radio', 'raise', 'range', 'rate', 'rather', 'reach', 'read', 'ready', 'real', 'reality', 'realize', 'really', 'reason', 'receive', 'recent', 'recently', 'recognize', 'record', 'red', 'reduce', 'reflect', 'region', 'relate', 'relationship', 'religious', 'remain', 'remember', 'remove', 'report', 'represent', 'Republican', 'require', 'research', 'resource', 'respond', 'response', 'responsibility', 'rest', 'result', 'return', 'reveal', 'rich', 'right', 'rise', 'risk', 'road', 'rock', 'role', 'room', 'rule', 'run', 'safe', 'same', 'save', 'say', 'scene', 'school', 'science', 'scientist', 'score', 'sea', 'season', 'seat', 'second', 'section', 'security', 'see', 'seek', 'seem', 'sell', 'send', 'senior', 'sense', 'series', 'serious', 'serve', 'service', 'set', 'seven', 'several', 'sex', 'sexual', 'shake', 'share', 'she', 'shoot', 'short', 'shot', 'should', 'shoulder', 'show', 'side', 'sign', 'significant', 'similar', 'simple', 'simply', 'since', 'sing', 'single', 'sister', 'sit', 'site', 'situation', 'six', 'size', 'skill', 'skin', 'small', 'smile', 'so', 'social', 'society', 'soldier', 'some', 'somebody', 'someone', 'something', 'sometimes', 'son', 'song', 'soon', 'sort', 'sound', 'source', 'south', 'southern', 'space', 'speak', 'special', 'specific', 'speech', 'spend', 'sport', 'spring', 'staff', 'stage', 'stand', 'standard', 'star', 'start', 'state', 'statement', 'station', 'stay', 'step', 'still', 'stock', 'stop', 'store', 'story', 'strategy', 'street', 'strong', 'structure', 'student', 'study', 'stuff', 'style', 'subject', 'success', 'successful', 'such', 'suddenly', 'suffer', 'suggest', 'summer', 'support', 'sure', 'surface', 'system', 'table', 'take', 'talk', 'task', 'tax', 'teach', 'teacher', 'team', 'technology', 'television', 'tell', 'ten', 'tend', 'term', 'test', 'than', 'thank', 'that', 'the', 'their', 'them', 'themselves', 'then', 'theory', 'there', 'these', 'they', 'thing', 'think', 'third', 'this', 'those', 'though', 'thought', 'thousand', 'threat', 'three', 'through', 'throughout', 'throw', 'thus', 'time', 'to', 'today', 'together', 'tonight', 'too', 'top', 'total', 'tough', 'toward', 'town', 'trade', 'traditional', 'training', 'travel', 'treat', 'treatment', 'tree', 'trial', 'trip', 'trouble', 'true', 'truth', 'try', 'turn', 'TV', 'two', 'type', 'under', 'understand', 'unit', 'until', 'up', 'upon', 'us', 'use', 'usually', 'value', 'various', 'very', 'victim', 'view', 'violence', 'visit', 'voice', 'vote', 'wait', 'walk', 'wall', 'want', 'war', 'watch', 'water', 'way', 'we', 'weapon', 'wear', 'week', 'weight', 'well', 'west', 'western', 'what', 'whatever', 'when', 'where', 'whether', 'which', 'while', 'white', 'who', 'whole', 'whom', 'whose', 'why', 'wide', 'wife', 'will', 'win', 'wind', 'window', 'wish', 'with', 'within', 'without', 'woman', 'wonder', 'word', 'work', 'worker', 'world', 'worry', 'would', 'write', 'writer', 'wrong', 'yard', 'yeah', 'year', 'yes', 'yet', 'you', 'young', 'your', 'yourself'];
      $('.search').autocomplete({
        source: availableTags
      });
    } //jQuery UI

  }, {
    key: "_dragAndDrop",
    value: function _dragAndDrop() {
      var _this5 = this;

      $('.parent-product, .buyBtn').draggable({
        revert: true
      });
      $('.header-flex').droppable({
        drop: function drop(event, ui) {
          if (ui.draggable.find('.buyBtn').length === 0) {
            _this5.addProduct(ui.draggable);
          } else {
            _this5.addProduct(ui.draggable.find('.buyBtn'));
          }
        }
      });
    }
  }]);

  return Cart;
}();