'use strict';

(function () {

  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];

  window.similarObjects = {similarRentOffers: []};
  var rentOffersQuantity = 8;
  var mapWidth = 1200;
  var locationMinY = 130;
  var locationMaxY = 630;

  // Выдает случайное число в диапазоне

  var getRandomValueFromInterval = function (min, max) {
    var randomFromInterval = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomFromInterval;
  };

  //  Генерирует массив похожих предложений

  var generateSimilarObject = function (numberOfSimilarItems, array) {
    for (var i = 0; i < numberOfSimilarItems; i++) {

      var randomXLocation = getRandomValueFromInterval(0, mapWidth);
      var randomYLocation = getRandomValueFromInterval(locationMinY, locationMaxY);

      array.push({
        'author': {
          'avatar': 'img/avatars/user0' + [i + 1] + '.png'
        },
        'offer': {
          'title': 'Qualia Jinnan flat',
          'address': [randomXLocation, randomYLocation],
          'price': 400,
          'type': ACCOMODATION_TYPES[2],
          'rooms': 2,
          'guests': 5,
          'checkin': CHECK_IN[2],
          'checkout': CHECK_OUT[2],
          'features': FEATURES.slice(0, getRandomValueFromInterval(0, FEATURES.length)),

          'description': 'Рядом с апартаментами находятся такие популярные достопримечательности, как концертный зал Шидакс, древнеегипетский художественный музей и музей Шикисай.',
          'photos': PHOTOS
        },
        'location': {
          'x': randomXLocation,
          'y': randomYLocation
        }
      });
    }
  };

  generateSimilarObject(rentOffersQuantity, window.similarObjects.similarRentOffers);
})();
