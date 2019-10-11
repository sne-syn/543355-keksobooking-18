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

var typeMap = {
  'bungalo': {
    'title': 'Бунгало',
    'placeholder': '100',
    'errorText': 'Минимальная цена за ночь 0'
  },
  'flat': {
    'title': 'Квартира',
    'placeholder': '1000',
    'errorText': 'Минимальная цена за ночь 1000'
  },
  'house': {
    'title': 'Дом',
    'placeholder': '5000',
    'errorText': 'Минимальная цена за ночь 5000'
  },
  'palace': {
    'title': 'Дворец',
    'placeholder': '10000',
    'errorText': 'Минимальная цена за ночь 10000'
  }
};

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

    pinElement.addEventListener('click', function () {
      renderCard(similarRentOffers[0]);
      pinElement.classList.add('map__pin--active');
    });
  }
};

// "Слушает" активацию основного пина

var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function () {
  runActivePageMode();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    runActivePageMode();
  }
});

// Перетаскивание основного пина

var addressInput = document.querySelector('#address');

var fillAdressInput = function (x, y) {
  addressInput.value = x + ', ' + y;
};

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

    var xCoords = (mainPin.offsetTop - shift.y);
    var yCoords = (mainPin.offsetLeft - shift.x);

    mainPin.style.top = xCoords + 'px';
    mainPin.style.left = yCoords + 'px';

    fillAdressInput(xCoords, yCoords);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    map.removeEventListener('mousemove', onMouseMove);
    map.removeEventListener('mouseup', onMouseUp);
  };

  map.addEventListener('mousemove', onMouseMove);
  map.addEventListener('mouseup', onMouseUp);
});

// Заполнение поля адреса

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

// Добавляет карточку

var map = document.querySelector('.map');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var addCardsImg = function (photos, cardElement) {
  var popupDiv = cardElement.querySelector('.popup__photos');
  popupDiv.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    var imgTag = document.createElement('img');
    imgTag.classList.add('popup__photo');
    imgTag.src = photos[i];
    imgTag.width = '45';
    imgTag.height = '40';
    imgTag.alt = 'Фотография жилья';
    popupDiv.appendChild(imgTag);
  }
};

var addFeaturesItem = function (features, cardElement) {
  var featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (var i = 0; i < features.length; i++) {
    var featureItem = document.createElement('li');
    var featureClassName = 'popup__feature--' + features[i];
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
  type.textContent = typeMap[obj.offer.type].title;

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

// Переключает disabled для inputs

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

// Validation
var form = document.querySelector('.ad-form');

var guestsCapacity = form.querySelector('#capacity');
var roomSelect = form.querySelector('#room_number');
var roomOptions = form.querySelectorAll('#room_number option');
var secondSelectOptions = form.querySelectorAll('#capacity option');

roomSelect.addEventListener('change', function (evt) {
  var roomGuestsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var availableGuests = roomGuestsMap[roomSelect.value];

  // поставить disabled всем option внутри второго инпута
  for (var i = 0; i < secondSelectOptions.length; i++) {
    secondSelectOptions[i].setAttribute("disabled", "disabled");
  }

  for (var j = 0; j < availableGuests.length; j++) {
    secondSelectOptions[availableGuests[j]].removeAttribute("disabled");
  }
});

// TimeInOut validation

var timeInSelect = form.querySelector('#timein');
var timeOutSelect = form.querySelector('#timeout');
var timeInOption = form.querySelector('#timein option');
var timeOutOption = form.querySelector('#timeout option');

timeInSelect.addEventListener('change', function (evt) {
  var timeInOutMap = {
    '12:00': "12:00",
    '13:00': '13:00',
    '14:00': '14:00'
  }

  var timeInOutValue = timeInOutMap[timeInSelect.value];
  console.log(timeInOutValue);

  timeOutOption.setAttribute("disabled", "disabled");

  // timeOutOption[timeInOutValue].removeAttribute("disabled");
});

// Title-validation. 'border' при ошибке не виден из-за boxShadow

var titleInput = form.querySelector('#title');

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
var priceInput = form.querySelector('#price');

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

// Type-validation

var typeSelect = form.querySelector('#type');
var typeOption = form.querySelector('#type option');

typeSelect.addEventListener('change', function (evt) {
  var types = typeOption.value;

  priceInput.placeholder = typeMap[types].placeholder;
  typeSelect.setCustomValidity(typeMap[types].errorText);
});

// var typeMap = {
//   'bungalo': {
//     'title': 'Бунгало',
//     'placeholder': '100',
//     'errorText': 'Минимальная цена за ночь 0'
//   },
//   'flat': {
//     'title': 'Квартира',
//     'placeholder': '1000',
//     'errorText': 'Минимальная цена за ночь 1000'
//   },
//   'house': {
//     'title': 'Дом',
//     'placeholder': '5000',
//     'errorText': 'Минимальная цена за ночь 5000'
//   },
//   'palace': {
//     'title': 'Дворец',
//     'placeholder': '10000',
//     'errorText': 'Минимальная цена за ночь 10000'
//   }
// };
