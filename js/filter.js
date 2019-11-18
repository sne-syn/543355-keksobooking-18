'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var PriceRange = {
    LOW_POINT: 10000,
    HIGH_POINT: 50000
  };

  var stateMap = {
    'housing-type': DEFAULT_VALUE,
    'housing-price': DEFAULT_VALUE,
    'housing-rooms': DEFAULT_VALUE,
    'housing-guests': DEFAULT_VALUE,
    'features': []
  };

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

  var convertCardPriceForFilter = function (priceCard) {
    switch (true) {
      case (priceCard < PriceRange.LOW_POINT):
        return 'low';
      case (priceCard >= PriceRange.LOW_POINT && priceCard <= PriceRange.HIGH_POINT):
        return 'middle';
      case (priceCard > PriceRange.HIGH_POINT):
        return 'high';
      default:
        return false;
    }
  };

  var isTypeOk = function (item) {
    switch (true) {
      case (item.offer.type === stateMap['housing-type']):
      case (stateMap['housing-type'] === DEFAULT_VALUE):
        return true;
      default:
        return false;
    }
  };

  var isPriceOk = function (item) {
    switch (true) {
      case (convertCardPriceForFilter(item.offer.price) === stateMap['housing-price']):
      case (stateMap['housing-price'] === DEFAULT_VALUE):
        return true;
      default:
        return false;
    }
  };

  var isRoomsOk = function (item) {
    switch (true) {
      case (item.offer.rooms === convertToNumber(stateMap['housing-rooms'])):
      case (stateMap['housing-rooms'] === DEFAULT_VALUE):
        return true;
      default:
        return false;
    }
  };

  var isGuestsOk = function (item) {
    switch (true) {
      case (item.offer.guests === convertToNumber(stateMap['housing-guests'])):
      case (stateMap['housing-guests'] === DEFAULT_VALUE):
        return true;
      default:
        return false;
    }
  };

  var isFeaturesOk = function (item) {
    if (findMatchFeatures(stateMap.features, item.offer.features)) {
      return true;
    }
    return false;
  };

  var filterPins = function (item) {
    if (isTypeOk(item) && isPriceOk(item) && isRoomsOk(item) && isGuestsOk(item) && isFeaturesOk(item)) {
      return true;
    }
    return false;
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
