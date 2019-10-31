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

  var state = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
    'features': []
  };

  var filter = document.querySelector('.map__filters');
  var typeFilter = document.getElementById('housing-type');
  var priceFilter = document.getElementById('housing-price');
  var typeFilterValue;
  var priceFilterValue;

  var updateItems = function () {
    // фильтрует по типу жилья
    var sameType = window.pin.offers.filter(function (it) {
      return it.offer.type === typeFilterValue;
    });

    window.render(sameType);
    // фильтрует по цене

    var checkFittingPrice = window.pin.offers.filter(function (it) {
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

    window.render(checkFittingPrice);
  };


  filter.addEventListener('change', function (evt) {
    var newValue = evt.target.value;
    var clickedFilter = evt.target.name;
    var featureValue = state[clickedFilter].indexOf(newValue);
    if (clickedFilter === 'features') {
      if (featureValue  == -1) {
        state[clickedFilter].push(newValue);
      } else {
        state[clickedFilter].splice(featureValue, 1);
      }
    } else {
      state[clickedFilter] = newValue;
    }
    console.log(state);
  });

})();
