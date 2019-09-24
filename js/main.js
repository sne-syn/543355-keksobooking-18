'use strict';

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];

var rentOffersQuantity = 8;
var similarRentOffers = [];
var randomNumbers = [];
var startNum = 1;
var mapHeight = 170;
var mapPinHeight = 85;
var locationMinY = 130;
var locationMaxY = 630;

document.querySelector('.map').classList.remove('map--faded');

// Наполняет массив числами от 1 до 8

var fillArray = function (numberOfItems, array) {

  for (var i = 0; i < numberOfItems; i++) {
    array.push(startNum++);
  }
};

fillArray(rentOffersQuantity, randomNumbers);

// Перемешивает массив
var shuffledFeatures = FEATURES.slice();
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

shuffleArray(randomNumbers);

// Выдает случайное число в диапазоне

var getRandomValueFromInterval = function (min, max) {
  var randomFromInterval = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomFromInterval;
};

// Выдает случайное значение из массива

var getRandomValue = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

// Добавляет логику в Features
var shuffledFeatures = FEATURES.slice();
var featuresAmount = getRandomValueFromInterval(0, FEATURES.length);
var listOfFeatures = [];

var chooseFeaturesAmount = function (array) {
  for (var i = 0; i < featuresAmount; i++) {
    listOfFeatures.push(array[i]);
  }
};
shuffleArray(shuffledFeatures);
chooseFeaturesAmount(shuffledFeatures);


//  Генерирует массив похожих предложений

var generateSimilarObject = function (numberOfSimilarItems, array) {
  for (var i = 0; i < numberOfSimilarItems; i++) {

    var randomXLocation = getRandomValueFromInterval(0, mapHeight);
    var randomYLocation = getRandomValueFromInterval(locationMinY, locationMaxY);

    array.push({
      'author': {
        'avatar': 'img/avatars/user' + '0' + randomNumbers[i]
      },
      'offer': {
        'title': 'YourTitle',
        'adress': [randomXLocation, randomYLocation],
        'price': 4000,
        'type': ACCOMODATION_TYPES[3],
        'rooms': 2,
        'guests': 5,
        'checkin': CHECK_IN[2],
        'checkout': CHECK_OUT[1],
        'features': listOfFeatures,
        'description': 'Write Your Description Here',
        'photos': getRandomValue(PHOTOS)
      },
      'location': {
        'x': randomXLocation,
        'y': randomYLocation
      }
    });
  }
};

generateSimilarObject(rentOffersQuantity, similarRentOffers);

console.log(similarRentOffers);
