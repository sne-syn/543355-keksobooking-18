'use strict';
(function () {

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin');

  var pinClickHandler = function (element, item) {
    if (Object.keys(item.offer).length !== 0) {
      window.card.get(element, item);
    }
  };

  var renderOffer = function (item) {
    var pinElement = pinTemplate.content.cloneNode(true);
    var element = pinElement.querySelector('.map__pin');

    element.style.left = (item.location.x - window.pin.enum.MAP_PIN_WIDTH / 2) + 'px';
    element.style.top = (item.location.y - window.pin.enum.OFFER_PIN_HEIGHT) + 'px';
    element.querySelector('.map__pin img').alt = item.offer.title;
    element.querySelector('.map__pin img').src = item.author.avatar;

    element.addEventListener('click', function () {
      pinClickHandler(element, item);
    });

    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.Keycode.SPACE_KEYCODE) {
        evt.preventDefault();
      }
      window.util.isEnterEvent(evt, function () {
        pinClickHandler(element, item);
      });
    });

    return element;
  };

  window.render = function (data) {
    window.pin.remove();
    var takeNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      if (Object.keys(data[i].offer).length !== 0) {
        mapPins.appendChild(renderOffer(data[i]));
      }

    }
  };

})();
