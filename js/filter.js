'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var Price = {
    LOW_PRICE: 10000,
    MIDDLE_PRICE: {
      FROM: 10000,
      TO: 50000
    },
    HIGH_PRICE: 50000,
  };

  var stateMap = {};
  stateMap[FilterName.TYPE_NAME] = DEFAULT;
  stateMap[FilterName.PRICE_NAME] = DEFAULT;
  stateMap[FilterName.ROOMS_NAME] = DEFAULT;
  stateMap[FilterName.GUESTS_NAME] = DEFAULT;
  stateMap[FilterName.FEATURES] = [];

  var findMatchFeatures = function (arrFilter, arrOffer) {
    var answers = [];
    arrFilter.forEach(function (feature) {
      answers.push(arrOffer.includes(feature));
    });
    return answers.indexOf(false) === -1;
  };

  var convertToNumber = function (value) {
    if (value !== DEFAULT_VALUE) {
      var newValue = parseInt(value, 10);
      return newValue;
    }
    return false;
  };

  var filterPins = function (item) {
    var count = 0;
    if (item.offer.type === stateMap['housing-type'] || stateMap['housing-type'] === DEFAULT_VALUE) {
      count++;
    }
    if (checkFittingPrice(item.offer.price) === stateMap['housing-price'] || stateMap['housing-price'] === DEFAULT_VALUE) {
      count++;
    }
    if (item.offer.rooms === convertToNumber(stateMap['housing-rooms']) || stateMap['housing-rooms'] === DEFAULT_VALUE) {
      count++;
    }
    if (item.offer.guests === convertToNumber(stateMap['housing-guests']) || stateMap['housing-guests'] === DEFAULT_VALUE) {
      count++;
    }
    if (findMatchFeatures(stateMap[FilterName.FEATURES], item.offer.features)) {
      count++;
    }
    return count === Object.keys(stateMap).length;
  };

  var checkFittingPrice = function (priceCard) {
    switch (true) {
      case (priceCard < Price.LOW_PRICE):
        return 'low';
      case (priceCard >= Price.MIDDLE_PRICE.FROM && priceCard <= Price.MIDDLE_PRICE.TO):
        return 'middle';
      case (priceCard > Price.HIGH_PRICE):
        return 'high';
      default:
        return false;
    }
  };

  var filterChangeHandler = window.debounce(function (evt) {
    window.card.remove();
    var newValue = evt.target.value;
    var clickedFilter = evt.target.name;
    if (clickedFilter === 'features') {
      var featureValue = stateMap[clickedFilter].indexOf(newValue);
      if (featureValue === -1) {
        stateMap[clickedFilter].push(newValue);
      } else {
        stateMap[clickedFilter].splice(featureValue, 1);
      }
    } else {
      stateMap[clickedFilter] = newValue;
    }

    var filteredPins = window.pin.offers.filter(filterPins);
    window.render(filteredPins);
  });

  var filter = document.querySelector('.map__filters');
  filter.addEventListener('change', function (evt) {
    filterChangeHandler(evt);
  });

})();
