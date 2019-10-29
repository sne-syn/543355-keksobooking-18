'use strict';

(function () {
  // filter logic
  var priceMap = {
    'low': 10000,
    'middle': {
      'from': 10000,
      'to': 50000
    },
    'high': 50000,
  };

  var filter = document.querySelector('.map__filters');
  var typeFilter = document.getElementById('housing-type');
  var priceFilter = document.getElementById('housing-price');
  var typeFilterValue;
  var priceFilterValue;

  var updateItems = function () {
    // фильтрует по типу жилья
    var sameType = oferrs.filter(function (it) {
      return it.offer.type === typeFilterValue;
    });

    if (typeFilterValue === 'any') {
      window.render(oferrs);
    } else {
      window.render(sameType);
    }
    // фильтрует по цене

    var checkFittingPrice = oferrs.filter(function (it) {
      switch (priceFilterValue) {
        case 'low':
          return it.offer.price < priceMap.low;
        case 'middle':
          return it.offer.price > priceMap.middle.from && it.offer.price < priceMap.middle.to;
        case 'high':
          return it.offer.price > priceMap.high;
        default:
          return it.offer.price;
      }
    });

    if (priceFilterValue === 'any') {
      window.render(oferrs);
    } else {
      window.render(checkFittingPrice);
    }
  };

  // следит за изменением всего filter
  var featuresList = [];
  filter.addEventListener('change', function (evt) {
    var newValue = evt.target.value;
    var clickedFilter = evt.target.name;
    if (clickedFilter === 'features') {
      featuresList.push(newValue);
    }
    console.log('Option ' + newValue + ' from ' + clickedFilter + ' was chosen');
    console.log(featuresList);
  });

  // следит за изменением type
  typeFilter.addEventListener('change', function () {
    var newValue = typeFilter.value;
    typeFilterValue = newValue;
    updateItems();
  });

  priceFilter.addEventListener('change', function () {
    var newValue = priceFilter.value;
    priceFilterValue = newValue;
    updateItems();
  });

  // pin logic

  var Pin = {
    MAP_PIN_POINT_HEIGHT: 22,
    MAP_PIN_BUTTON_HEIGHT: 63,
    OFFER_PIN_HEIGHT: 70,
    MAP_PIN_WIDTH: 40
  };

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var oferrs = [];
  var successHandler = function (data) {
    oferrs = data;
    window.render(oferrs);
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
    window.main.runActivePageMode();
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
    Pin: Pin
  };
})();
