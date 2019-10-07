'use strict';

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var rentOffersQuantity = 8;
var similarRentOffers = [];
var mapWidth = 1200;
var mapPinPointHeight = 22;
var mapPinButtonHeight = 63;
var mapPinHeight = mapPinPointHeight + mapPinButtonHeight;
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

// Добавляет пины на карту, pins' click&count

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var openCardWithPin = function (pinElement) {
  var pins = mapPins.querySelectorAll('.map__pin');
  for (var i = 1; i < pins.length; i++) {
    pins[i].addEventListener('click', function () {
      renderCard(similarRentOffers[0]);
    });
  }
};

var addMapPins = function (items) {
  for (var i = 0; i < items.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (items[i].location.x - mapPinWidth / 2) + 'px';
    pinElement.style.top = (items[i].location.y - mapPinHeight) + 'px';
    pinElement.querySelector('.map__pin img').alt = items[i].offer.title;
    pinElement.querySelector('.map__pin img').src = items[i].author.avatar;

    mapPins.appendChild(pinElement);
  }
  openCardWithPin(pinElement);
};

// Добавляет карточку

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var typeMap = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var addCardsImg = function (photos, cardElement) {
  var popupDiv = cardElement.querySelector('.popup__photos');
  popupDiv.innerHTML = '';
  for (var j = 0; j < photos.length; j++) {
    var imgTag = document.createElement('img');
    imgTag.classList.add('popup__photo');
    imgTag.src = photos[j];
    imgTag.width = '45';
    imgTag.height = '40';
    imgTag.alt = 'Фотография жилья';
    popupDiv.appendChild(imgTag);
  }
};

var addFeaturesItem = function (features, cardElement) {
  var featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (var j = 0; j < features.length; j++) {
    var featureItem = document.createElement('li');
    var featureClassName = 'popup__feature--' + features[j];
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(featureClassName);
    featuresList.appendChild(featureItem);
  }
};

var renderCard = function (obj) {
  var cardElement = cardTemplate.cloneNode(true);
  map.insertBefore(cardElement, map.querySelector('.map__filters-container'));

  var title = cardElement.querySelector('.popup__title');
  title.textContent = obj.offer.title;

  var address = cardElement.querySelector('.popup__text--address');
  address.textContent = obj.offer.address;

  var price = cardElement.querySelector('.popup__text--price');
  price.textContent = obj.offer.price + '₽/ночь';

  var type = cardElement.querySelector('.popup__type');
  type.textContent = typeMap[obj.offer.title];

  var rooms = cardElement.querySelector('.popup__text--capacity');
  rooms.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';

  var checkInOut = cardElement.querySelector('.popup__text--time');
  checkInOut.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;

  var description = cardElement.querySelector('.popup__description');
  description.textContent = obj.offer.description;

  var avatar = cardElement.querySelector('.map__card img');
  avatar.src = obj.author.avatar;

  addCardsImg(obj.offer.photos, cardElement);
  addFeaturesItem(obj.offer.features, cardElement);
};

// Заполнение поля адреса

var mainPin = document.querySelector('.map__pin--main');
var coordsLeft = parseInt(mainPin.style.left, 10);
var coordsTop = parseInt(mainPin.style.top, 10);

var pinX = Math.round(coordsLeft + mapPinWidth / 2);
var pinActiveY = Math.round(coordsTop + mapPinHeight);
var pinNonActiveY = Math.round(coordsTop + mapPinButtonHeight / 2);

var getPinCoordinate = function (pinModeY) {
  var addressInput = document.querySelector('#address');
  addressInput.value = pinX + ', ' + pinModeY;
};

getPinCoordinate(pinNonActiveY);

// переключает disabled для inputs

var fieldset = document.querySelectorAll('.ad-form fieldset');

var toggleEnableDisable = function (element, booleanType) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = booleanType;
  }
};

toggleEnableDisable(fieldset, true);

// Включает активный режим страницы

var runActivePageMode = function () {
  toggleEnableDisable(fieldset, false);
  getPinCoordinate(pinActiveY);
  addMapPins(similarRentOffers);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');


};

// "Слушает" событие перетаскивания основного пина

mainPin.addEventListener('mousedown', function () {
  runActivePageMode();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    runActivePageMode();
  }
});

// Validation

var form = document.querySelector('.ad-form');
var titleInput = form.querySelector('#title');
var priceInput = form.querySelector('#price');
var typeSelect = form.querySelector('#type');
var tymeInSelect = form.querySelector('#tymein');
var tymeOutSelect = form.querySelector('#tymeout');

var guestsCapacity = form.querySelector('#capacity');
var roomSelect = form.querySelector('#room_number');
var roomOptions = roomSelect.querySelectorAll('#room_number option');

var p = document.getElementById('p');
roomSelect.addEventListener('change', function () {
  var index = roomSelect.selectedIndex;

  p.innerHTML = 'selectedIndex: ' + index;

  if (index == 2) {
    console.log("it works");
    console.log(roomSelect.options[roomSelect.selectedIndex].value);
    console.log(guestsCapacity.options[guestsCapacity.selectedIndex].value);
  }
});

// Guest validation

guestsCapacity.addEventListener('invalid', function (evt) {
  if (roomSelect.options[roomSelect.selectedIndex].value === 1 && guestsCapacity.options[guestsCapacity.selectedIndex].value !== 1) {
    guestsCapacity.setCustomValidity('Слишком много гостей для выбраного типа жилья');
  } else if (roomSelect.options[roomSelect.selectedIndex].value === 2 && guestsCapacity.options[guestsCapacity.selectedIndex].value !== 1 || guestsCapacity.options[guestsCapacity.selectedIndex].value !== 2) {
    guestsCapacity.setCustomValidity('Слишком много гостей для выбраного типа жилья');
  } else if (roomSelect.options[roomSelect.selectedIndex].value === 3 && guestsCapacity.options[guestsCapacity.selectedIndex].value !== 1 || guestsCapacity.options[guestsCapacity.selectedIndex].value !== 2 || guestsCapacity.options[guestsCapacity.selectedIndex].value !== 3) {
    guestsCapacity.setCustomValidity('Выбранный тип жилья подходит только для гостей');
  } else if (roomSelect.options[roomSelect.selectedIndex].value === 4 && guestsCapacity.options[guestsCapacity.selectedIndex].value !== 4) {
    guestsCapacity.setCustomValidity('Выбранный тип жилья не для гостей');
  } else {
    guestsCapacity.setCustomValidity('');
  }
});


// Title-validation. 'border' при ошибке не виден из-за boxShadow

titleInput.addEventListener('invalid', function (evt) {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    titleInput.style.border = 'red';
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
    titleInput.style.border = 'red';
  } else {
    titleInput.setCustomValidity('');
  }
});

//  Price-validation. 'border' при ошибке не виден из-за boxShadow

priceInput.addEventListener('invalid', function (evt) {
  if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Предельно допустимая стоимость - 1000000');
    priceInput.style.border = 'red';
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
    priceInput.style.border = 'red';
  } else {
    priceInput.setCustomValidity('');
  }
});

// Перетаскивание пина

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    map.removeEventListener('mousemove', onMouseMove);
    map.removeEventListener('mouseup', onMouseUp);
  };

  map.addEventListener('mousemove', onMouseMove);
  map.addEventListener('mouseup', onMouseUp);

});
