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

    console.log(checkFittingPrice);

    window.render(checkFittingPrice);
  };

  filter.addEventListener('change', function (evt) {
    var newValue = evt.target.value;
    var clickedFilter = evt.target.name;
    var featureValue = state[clickedFilter].indexOf(newValue);
    if (clickedFilter === 'features') {
      if (featureValue == -1) {
        state[clickedFilter].push(newValue);
      } else {
        state[clickedFilter].splice(featureValue, 1);
      }
    } else {
      state[clickedFilter] = newValue;
    }
    console.log(state);
    var filteredPins = window.pin.offers.filter(filterPins);
    window.render(filteredPins);
  });

  var filterPins = function (item) {
    var count = [];
    if (item.offer.type === state['housing-type'] || state['housing-type'] === 'any') {
      count.push(1);
      console.log(count);
    }
    if (item.offer.rooms === state['housing-rooms'] || state['housing-rooms'] === 'any') {
      count.push(1);
    }
    if (item.offer.guests === state['housing-guests'] || state['housing-guests'] === 'any') {
      count.push(1);
    }

    return count.length === 2;
  };
  var arrayCard = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var arrayFilter = ["wifi", "dishwasher", "ggro", "parking", "washer", "elevator"];

  // находим совпадения в массивах и копируем в отдельный массив, сравниваем, Если идентичны - тру.

  var checkLength = function (count) {
    var newArray = [];
    arrayFilter.forEach(function (feature) {
      newArray.push(arrayCard.includes(feature));
    });
    if (newArray.indexOf(false) === -1) {
      count.push(1);
    }
  };
  checkLength(count);

})();
