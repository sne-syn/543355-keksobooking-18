'use strict';

(function () {

  window.pin = {
    pinActiveY: Math.round(coordsTop + mapPinHeight),
    addMapPins: function (items) {
      for (var i = 0; i < items.length; i++) {
        var pinElement = pinTemplate.cloneNode(true);

        pinElement.style.left = (items[i].location.x - mapPinWidth / 2) + 'px';
        pinElement.style.top = (items[i].location.y - mapPinHeight) + 'px';
        pinElement.querySelector('.map__pin img').alt = items[i].offer.title;
        pinElement.querySelector('.map__pin img').src = items[i].author.avatar;

        mapPins.appendChild(pinElement);

        window.card.openCardPopup(pinElement, i);
      }
    },
    getPinCoordinate: function (pinModeY) {
      addressInput.value = pinX + ', ' + pinModeY;
    }
  };

  var map = document.querySelector('.map');
  var mapPinPointHeight = 22;
  var mapPinButtonHeight = 63;
  var mapPinHeight = mapPinPointHeight + mapPinButtonHeight;
  var mapPinWidth = 40;
  var mainPin = document.querySelector('.map__pin--main');

  var coordsLeft = parseInt(mainPin.style.left, 10);
  var coordsTop = parseInt(mainPin.style.top, 10);

  var pinX = Math.round(coordsLeft + mapPinWidth / 2);
  var pinNonActiveY = Math.round(coordsTop + mapPinButtonHeight / 2);

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // Перетаскивание основного пина

  var addressInput = document.querySelector('#address');

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

  // Заполнение поля адреса

  window.pin.getPinCoordinate(pinNonActiveY);

  mainPin.addEventListener('mousedown', function () {
    window.main.runActivePageMode();
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.main.runActivePageMode());
  });

})();
