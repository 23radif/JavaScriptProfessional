"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Reviews =
/*#__PURE__*/
function () {
  function Reviews(source) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#reviews';

    _classCallCheck(this, Reviews);

    this.source = source;
    this.container = container;
    this.reviewsItems = [];

    this._init();
  }

  _createClass(Reviews, [{
    key: "_render",
    value: function _render() {
      var $wrapper = $('<div/>', {
        class: 'wrapper-author'
      });
      var $authorName = $('<p/>', {
        text: 'Name:'
      });
      var $authorNameText = $('<input/>', {
        class: 'author-name'
      });
      var $authorReview = $('<p/>', {
        text: 'Feedback:'
      });
      var $authorReviewText = $('<textarea/>', {
        class: 'author-text',
        cols: '30',
        rows: '10',
        id: '#'
      });
      var $authorReviewButton = $('<button/>', {
        class: 'author-review-button',
        text: 'Send feedback'
      });
      var $jsonReviews = $('<div/>', {
        class: 'json-reviews'
      });
      var $sendFeedback = $('<button/>', {
        class: 'send-feedback',
        text: 'Feedback'
      });
      $authorName.appendTo($wrapper);
      $authorNameText.appendTo($wrapper);
      $authorReview.appendTo($wrapper);
      $authorReviewText.appendTo($wrapper);
      $authorReviewButton.appendTo($wrapper);
      $(this.container).append($wrapper);
      $(this.container).append($jsonReviews);
      $($jsonReviews).append($sendFeedback);
      $($wrapper).hide();
      $sendFeedback.click(function (event) {
        $($wrapper).show().dialog({
          modal: true,
          title: 'You feedback'
        });
      });
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this = this;

      this._render();

      if (!localStorage.getItem('reviews')) {
        fetch(this.source).then(function (result) {
          return result.json();
        }).then(function (data) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var review = _step.value;

              _this.reviewsItems.push(review);

              localStorage.setItem('reviews', JSON.stringify(_this.reviewsItems));

              _this._displayReviews(review);
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
        });
      } else {
        this.reviewsItems = JSON.parse(localStorage.getItem('reviews'));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.reviewsItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var review = _step2.value;

            this._displayReviews(review);
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
      }

      this._toSendReview();
    }
  }, {
    key: "_displayReviews",
    value: function _displayReviews(review) {
      var $container = $('<div/>', {
        class: 'review-container',
        id: review.id,
        'data-is-approved': review.isApproved
      });
      $container.append($("<h3 class=\"review-author\">".concat(review.author, "</h3>")));
      $container.append($("<p class=\"review-text\">".concat(review.text, "</p>")));
      var $approveButton = $("<button class=\"approve-button\">Approve</button>");
      var $removeButton = $("<button class=\"remove-button\">Remove feedback</button>");
      $approveButton.appendTo($container);
      $removeButton.appendTo($container);
      $container.appendTo('.json-reviews');

      this._toApprove($approveButton);

      this._toRemove($removeButton);
    }
  }, {
    key: "_toSendReview",
    value: function _toSendReview() {
      var _this2 = this;

      $('.wrapper-author').keyup(function (event) {
        $('.wrapper-error').remove();
      });
      $('.wrapper-author').on('click', '.author-review-button', function (event) {
        $('.wrapper-error').remove();

        if ($('.author-name').val().length > 2 && $('.author-text').val().length > 15) {
          $('.wrapper-error').remove();
          var thisId = 0;

          _this2.reviewsItems.forEach(function (review) {
            if (thisId <= review.id) {
              thisId = review.id;
              thisId++;
            }
          });

          var $authorReview = {
            author: $('.author-name').val(),
            id: thisId,
            isApproved: false,
            text: $('.author-text').val()
          };

          _this2.reviewsItems.push($authorReview);

          localStorage.setItem('reviews', JSON.stringify(_this2.reviewsItems));

          _this2._displayReviews($authorReview);

          $('.author-name').val('');
          $('.author-text').val('');
          $('.wrapper-author').append($("<p class=\"wrapper-error\">\u041E\u0442\u0437\u044B\u0432 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D!</p>"));
          $('.wrapper-error').css('color', 'green'); // $('.wrapper-author').bind("dialogclose");
        } else {
          $('.wrapper-author').append($("<p class=\"wrapper-error\">\u0418\u043C\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 3 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u0430 \u043E\u0442\u0437\u044B\u0432 \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 15!</p>"));
        }
      });
    }
  }, {
    key: "_toApprove",
    value: function _toApprove($approveButton) {
      var _this3 = this;

      $approveButton.click(function (event) {
        event.target.parentElement.dataset.isApproved = 'true';
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _this3.reviewsItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var review = _step3.value;

            if (+event.target.parentElement.id === +review.id) {
              review.isApproved = 'true';
            }
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
      });
    }
  }, {
    key: "_toRemove",
    value: function _toRemove($removeButton) {
      var _this4 = this;

      $removeButton.click(function (event) {
        event.target.parentElement.remove();
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _this4.reviewsItems[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var review = _step4.value;

            if (+event.target.parentElement.id === +review.id) {
              _this4.reviewsItems.splice(_this4.reviewsItems.indexOf(review), 1);
            }
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

        localStorage.setItem('reviews', JSON.stringify(_this4.reviewsItems));
      });
    }
  }]);

  return Reviews;
}();