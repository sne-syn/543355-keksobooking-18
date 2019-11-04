'use strict';

(function () {
  var Pin = {
    MAP_PIN_POINT_HEIGHT: 22,
    MAP_PIN_BUTTON_HEIGHT: 63,
    OFFER_PIN_HEIGHT: 70,
    MAP_PIN_WIDTH: 40
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  window.pin = {
    offers: []
  };

  var successHandler = function (data) {
    window.pin.offers = data;
    window.render(window.pin.offers);
  };

  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorElement);
  };

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (items) {
      if (items !== mainPin) {
        items.remove();
      }
    });
  };

  var coordsLeft = parseInt(mainPin.style.left, 10);
  var coordsTop = parseInt(mainPin.style.top, 10);
  var addressInput = document.querySelector('#address');
  var mapPinHeight = Pin.MAP_PIN_POINT_HEIGHT + Pin.MAP_PIN_BUTTON_HEIGHT;
  var pinX = Math.round(coordsLeft + Pin.MAP_PIN_WIDTH / 2);
  var pinNonActiveY = Math.round(coordsTop + Pin.MAP_PIN_BUTTON_HEIGHT / 2);
  var pinActiveY = Math.round(coordsTop + mapPinHeight);

  var getPinCoordinate = function (pinModeY) {
    addressInput.value = pinX + ', ' + pinModeY;
  };

  getPinCoordinate(pinNonActiveY);

  var fillAdressInput = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var xCoords = (mainPin.offsetTop - shift.y);
      var yCoords = (mainPin.offsetLeft - shift.x);

      mainPin.style.top = xCoords + 'px';
      mainPin.style.left = yCoords + 'px';

      fillAdressInput(xCoords, yCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('mousedown', function () {
    if (window.pin.offers.length === 0) {
      window.main.runActivePageMode();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      window.main.runActivePageMode();
    });
  });

  window.pin = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    removePins: removePins,
    getPinCoordinate: getPinCoordinate,
    pinX: pinX,
    pinNonActiveY: pinNonActiveY,
    pinActiveY: pinActiveY,
    Pin: Pin,
    offers: window.pin.offers
  };
})();
