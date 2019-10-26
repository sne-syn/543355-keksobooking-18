'use strict';

(function () {

  var Pin = {
    MAP_PIN_POINT_HEIGHT: 22,
    MAP_PIN_BUTTON_HEIGHT: 63,
    OFFER_PIN_HEIGHT: 70,
    MAP_PIN_WIDTH: 40
  };

  var mapPins = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin');

  var renderOffer = function (item) {
      var pinElement = pinTemplate.content.cloneNode(true);
      var element = pinElement.querySelector('.map__pin');

      element.style.left = (item.location.x - Pin.MAP_PIN_WIDTH / 2) + 'px';
      element.style.top = (item.location.y - Pin.OFFER_PIN_HEIGHT) + 'px';
      element.querySelector('.map__pin img').alt = item.offer.title;
      element.querySelector('.map__pin img').src = item.author.avatar;

      return element;
  };

  window.render = function (data) {
    var takeNumber =  data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderOffer(data[i]));
    }
  };

})();
