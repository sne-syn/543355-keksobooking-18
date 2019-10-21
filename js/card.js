'use strict';

(function () {
  window.typeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  window.card.openCardPopup = function (element, item, i) {
    element.addEventListener('click', function () {
      console.log (item);
      console.log (i);
      console.log (element);
      console.log (item[i]);
      // getCard(element, item);
    });

    element.addEventListener('keydown', function (evt) {
      // window.util.isEnterEvent(evt, getCard(element, item));
    });
  };

  var closeCardPopup = function (element) {
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      removeCard(element);
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeCard(element));
    });
  };

  var getCard = function (element, item) {
    renderCard(item);
    element.classList.add('map__pin--active');
    closeCardPopup(element);
  };

  var removeCard = function (element) {
    var mapCard = document.querySelector('.map__card');
    element.classList.remove('map__pin--active');
    if (mapCard) {
      mapCard.remove();
    }
  };

  // Добавляет карту

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
    // var mapCard = document.querySelector('.map__card');
    // if (mapCard) {
    //   mapCard.remove();
    // }
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
})();
