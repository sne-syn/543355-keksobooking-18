'use strict';

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];

var rentOffersQuantity = 8;
var similarRentOffers = [];
var mapWidth = 1200;
var mapPinHeight = 85;
var mapPinWidth = 40;
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
        'checkout': CHECK_OUT[1],
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

generateSimilarObject(rentOffersQuantity, similarRentOffers);

document.querySelector('.map').classList.remove('map--faded');

// Добавляет пины на карту

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var addMapPins = function (items) {
  for (var i = 0; i < items.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (items[i].location.x - mapPinWidth / 2) + 'px';
    pinElement.style.top = (items[i].location.y - mapPinHeight) + 'px';
    pinElement.querySelector('.map__pin img').alt = items[i].offer.title;
    pinElement.querySelector('.map__pin img').src = items[i].author.avatar;

    mapPins.appendChild(pinElement);
  }
};

addMapPins(similarRentOffers);

// Добавляет карточку

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var addMapCards = function (items) {
  for (var j = 0; j < items.length; j++) {
    var cardElement = cardTemplate.cloneNode(true);
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));

    var title = cardElement.querySelector('.popup__title');
    title.textContent = items[j].offer.title;

    var address = cardElement.querySelector('.popup__text--address');
    address.textContent = items[j].offer.address;

    var price = cardElement.querySelector('.popup__text--price');
    price.textContent = items[j].offer.price + '₽/ночь';

    var type = cardElement.querySelector('.popup__type');

    if (items[j].offer.type === 'palace') {
      type.textContent = 'Дворец';
    }
    if (items[j].offer.type === 'flat') {
      type.textContent = 'Квартира';
    }
    if (items[j].offer.type === 'house') {
      type.textContent = 'Дом';
    }
    if (items[j].offer.type === 'bungalo') {
      type.textContent = 'Бунгало';
    }

    var rooms = cardElement.querySelector('.popup__text--capacity');
    rooms.textContent = items[j].offer.rooms + ' комнаты для ' + items[j].offer.guests + ' гостей';

    var checkInOut = cardElement.querySelector('.popup__text--time');
    checkInOut.textContent = 'Заезд после ' + items[j].offer.checkin + ', выезд до ' + items[j].offer.checkout;

    var features = cardElement.querySelector('.popup__features li');
    features.textContent = items[j].offer.features;

    var description = cardElement.querySelector('.popup__description');
    description.textContent = items[j].offer.description;



    var photo = cardElement.querySelector('.popup__photo');
    photo.src = items[j].offer.photos[0];

    var avatar = cardElement.querySelector('.map__card img');
    avatar.src = items[j].author.avatar;

  }
};

// Создала доп теги для изображений в галерее попапа; Как их теперь заполнить?

var addCardsImg = function (photos) {
  for (var g = 1; g < photos.length; g++) {
    var popupDiv = document.querySelector('.popup__photos');
    var imgTag = document.createElement('img');
    imgTag.classList.add('popup__photo');
    popupDiv.appendChild(imgTag);
  }
};

addMapCards(similarRentOffers);
addCardsImg(PHOTOS);

console.log(document);

console.log(similarRentOffers);
