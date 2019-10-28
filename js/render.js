'use strict';
(function () {

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin');

  var renderOffer = function (item) {
      var pinElement = pinTemplate.content.cloneNode(true);
      var element = pinElement.querySelector('.map__pin');

      element.style.left = (item.location.x - window.pin.Pin.MAP_PIN_WIDTH / 2) + 'px';
      element.style.top = (item.location.y - window.pin.Pin.OFFER_PIN_HEIGHT) + 'px';
      element.querySelector('.map__pin img').alt = item.offer.title;
      element.querySelector('.map__pin img').src = item.author.avatar;
      // window.card.openCard(pinElement, item);

      return element;
  };

  window.render = function (data) {
    window.pin.removePins();
    var takeNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderOffer(data[i]));
    }
  };

})();
