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
    } else if (priceCard >= priceMap.middle.from && priceCard <= priceMap.middle.to) {
      return 'middle';
    } else if (priceCard > priceMap.high) {
      return 'high';
    }
    return undefined;
  };

  window.filter = {
    filterPins: filterPins,
    state: state
  };


  var filter = document.querySelector('.map__filters');
  filter.addEventListener('change', function (evt) {
    window.card.removeCard();
    var newValue = evt.target.value;
    var clickedFilter = evt.target.name;
    if (clickedFilter === 'features') {
      var featureValue = window.filter.state[clickedFilter].indexOf(newValue);
      if (featureValue === -1) {
        window.filter.state[clickedFilter].push(newValue);
      } else {
        window.filter.state[clickedFilter].splice(featureValue, 1);
      }
    } else {
      window.filter.state[clickedFilter] = newValue;
    }

    var filteredPins = window.offers.filter(window.filter.filterPins);
    window.render(filteredPins);
  });
})();
