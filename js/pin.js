'use strict';

(function () {
  var priceMap = {
    'low': 10000,
    'middle': {
      'from': 10000,
      'to': 50000
    },
    'high': 50000,
  };

  var state = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'features': []
  };

  var filter = document.querySelector('.map__filters');

  var findMatchFeatures = function (arrFilter, arrOffer) {
    var answers = [];
    arrFilter.forEach(function (feature) {
      answers.push(arrOffer.includes(feature));
    });
    if (answers.indexOf(false) === -1) {
      return true;
    }
  };

  var convertToNumber = function (value) {
    if (value !== 'any') {
      var newValue = parseInt(value, 10);
      return newValue;
    }
  };

  var filterPins = function (item) {
    var count = 0;
    if (item.offer.type === state['housing-type'] || state['housing-type'] === 'any') {
      count++;
    }
    if (checkFittingPrice(item.offer.price) === state['housing-price'] || state['housing-price'] === 'any') {
      count++;
    }
    if (item.offer.rooms === convertToNumber(state['housing-rooms']) || state['housing-rooms'] === 'any') {
      count++;
    }
    if (item.offer.guests === convertToNumber(state['housing-guests']) || state['housing-guests'] === 'any') {
      count++;
    }
    if (findMatchFeatures(state.features, item.offer.features)) {
      count++;
    }
    return count === Object.keys(state).length;
  };

  var checkFittingPrice = function (priceCard) {
    if (priceCard < priceMap.low) {
      return 'low';
    } else if (priceCard > priceMap.middle.from && priceCard < priceMap.middle.to) {
      return 'middle';
    } else if (priceCard > priceMap.high) {
      return 'high';
    }
  };

  filter.addEventListener('change', function (evt) {
    window.card.removeCard();
    var newValue = evt.target.value;
    var clickedFilter = evt.target.name;
    var featureValue = state[clickedFilter].indexOf(newValue);
    if (clickedFilter === 'features') {
      if (featureValue === -1) {
        state[clickedFilter].push(newValue);
      } else {
        state[clickedFilter].splice(featureValue, 1);
      }
    } else {
      state[clickedFilter] = newValue;
    }

    var filteredPins = offers.filter(filterPins);
    window.render(filteredPins);
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

  var offers = [];
  var successHandler = function (data) {
    offers = data;
    window.render(offers);
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
    if (offers.length === 0) {
      window.main.runActivePageMode();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      window.main.runActivePageMode();
    });
  });

  window.pin = {
    offers: offers,
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
