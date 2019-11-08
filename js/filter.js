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

  var stateMap = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
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
    if (value !== 'any') {
      var newValue = parseInt(value, 10);
      return newValue;
    }
    return undefined;
  };

  var filterPins = function (item) {
    var count = 0;
    if (item.offer.type === stateMap['housing-type'] || stateMap['housing-type'] === 'any') {
      count++;
    }
    if (checkFittingPrice(item.offer.price) === stateMap['housing-price'] || stateMap['housing-price'] === 'any') {
      count++;
    }
    if (item.offer.rooms === convertToNumber(stateMap['housing-rooms']) || stateMap['housing-rooms'] === 'any') {
      count++;
    }
    if (item.offer.guests === convertToNumber(stateMap['housing-guests']) || stateMap['housing-guests'] === 'any') {
      count++;
    }
    if (findMatchFeatures(stateMap.features, item.offer.features)) {
      count++;
    }
    return count === Object.keys(stateMap).length;
  };

  var checkFittingPrice = function (priceCard) {
    if (priceCard < priceMap.low) {
      return 'low';
    } else if (priceCard >= priceMap.middle.from && priceCard <= priceMap.middle.to) {
      return 'middle';
    } else if (priceCard > priceMap.high) {
      return 'high';
    }
    return undefined;
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
