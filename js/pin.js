'use strict';

(function () {
  var Pin = {
    MAP_PIN_ROUND_HEIGHT: 35,
    MAP_PIN_WITH_POINT_HIGHT: 70,
    MAP_PIN_WIDTH: 65,
    OFFER_PIN_HEIGHT: 70
  };

  var MapLimit = {
    Y_MIN: 130 - Pin.MAP_PIN_WITH_POINT_HIGHT,
    Y_MAX: 630 - Pin.MAP_PIN_WITH_POINT_HIGHT,
    X_MIN: 0 - Pin.MAP_PIN_WIDTH / 2,
    X_MAX: 1200 - Pin.MAP_PIN_WIDTH / 2,
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
  var pinX = coordsLeft + Pin.MAP_PIN_WIDTH / 2;
  var pinNonActiveY = coordsTop + Pin.MAP_PIN_ROUND_HEIGHT / 2;
  var pinActiveY = coordsTop + Pin.MAP_PIN_WITH_POINT_HIGHT;

  var getPinCoordinate = function (x, y) {
    addressInput.value = Math.floor(x) + ', ' + Math.floor(y);
  };
  getPinCoordinate(pinX, pinNonActiveY);

  var setPinLimits = function (axis, min, max) {
    if (axis > max) {
      return max;
    } else if (axis < min) {
      return min;
    } else {
      return axis;
    }
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

      mainPin.style.left = setPinLimits(yCoords, MapLimit.X_MIN, MapLimit.X_MAX) + 'px';
      mainPin.style.top = setPinLimits(xCoords, MapLimit.Y_MIN, MapLimit.Y_MAX) + 'px';

      getPinCoordinate(xCoords + Pin.MAP_PIN_WITH_POINT_HIGHT, yCoords + Pin.MAP_PIN_WIDTH / 2);
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
      window.main.activatePage();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      window.main.activatePage();
    });
  });

  window.pin = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    remove: removePins,
    getCoordinate: getPinCoordinate,
    nonActiveY: pinNonActiveY,
    activeY: pinActiveY,
    x: pinX,
    enum: Pin,
    offers: window.pin.offers
  };
})();
