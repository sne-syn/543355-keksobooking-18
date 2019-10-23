'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.pin = {
    successHandler: function (items) {
      items.forEach(function (item) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style.left = (item.location.x - mapPinWidth / 2) + 'px';
        pinElement.style.top = (item.location.y - offerPinHeight) + 'px';
        pinElement.querySelector('.map__pin img').alt = item.offer.title;
        pinElement.querySelector('.map__pin img').src = item.author.avatar;
        mapPins.appendChild(pinElement);
        window.card.openCard(pinElement, items, item);
      });
    },

    errorHandler: function () {
      var errorTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      document.querySelector('main').appendChild(errorElement);
    },

    removePins: function () {
      var pins = mapPins.querySelectorAll('.map__pin');
      pins.forEach(function (items) {
        if (items !== mainPin) {
          items.remove();
        }
      });
    }
  };

  var mapPinPointHeight = 22;
  var mapPinButtonHeight = 63;
  var offerPinHeight = 70;
  var mapPinHeight = mapPinPointHeight + mapPinButtonHeight;
  var mapPinWidth = 40;
  var coordsLeft = parseInt(mainPin.style.left, 10);
  var coordsTop = parseInt(mainPin.style.top, 10);
  var addressInput = document.querySelector('#address');
  window.pin.pinX = Math.round(coordsLeft + mapPinWidth / 2);
  window.pin.pinNonActiveY = Math.round(coordsTop + mapPinButtonHeight / 2);
  window.pin.pinActiveY = Math.round(coordsTop + mapPinHeight);

  window.pin.getPinCoordinate = function (pinModeY) {
    addressInput.value = window.pin.pinX + ', ' + pinModeY;
  };

  window.pin.getPinCoordinate(window.pin.pinNonActiveY);

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
    window.main.runActivePageMode();
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      window.main.runActivePageMode();
    });
  });
})();
