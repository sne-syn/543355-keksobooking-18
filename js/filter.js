'use strict';

(function () {
  var DEFAULT_VALUE = 'any';
  var priceMap = {
    'low': 10000,
    'middle': {
      'from': 10000,
      'to': 50000
    },
    'high': 50000,
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

  // если предложение соответствует выбранному фильтру || если оно не ограничивается фильтром вообще - +1 к переменной count. В конце сравниваем количество фильтров и сумму баллов в count.

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
    if (findMatchFeatures(stateMap.features, item.offer.features)) {
      count++;
    }
    return count === Object.keys(stateMap).length;
  };

  var checkFittingPrice = function (priceCard) {
    switch (true) {
      case (priceCard < priceMap.low):
        return 'low';
      case (priceCard >= priceMap.middle.from && priceCard <= priceMap.middle.to):
        return 'middle';
      case (priceCard > priceMap.high):
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
