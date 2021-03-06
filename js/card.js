'use strict';

(function () {
  var TypeTranslate = {
    PALACE_RU: 'Дворец',
    FLAT_RU: 'Квартира',
    HOUSE_RU: 'Дом',
    BUNGALO_RU: 'Бунгало'
  };

  var typeMap = {
    palace: TypeTranslate.PALACE_RU,
    flat: TypeTranslate.FLAT_RU,
    house: TypeTranslate.HOUSE_RU,
    bungalo: TypeTranslate.BUNGALO_RU
  };

  var getCard = function (element, item) {
    renderCard(item);
    element.classList.add('map__pin--active');
    closeCard();
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    var activePin = document.querySelector('.map__pin--active');
    if (mapCard) {
      activePin.classList.remove('map__pin--active');
      mapCard.remove();
    }
    document.removeEventListener('keydown', popupEscHandler);
  };

  var popupEscHandler = function (evt) {
    window.util.keyaction.addEscEvent(evt, removeCard);
  };

  var closeButtonClickHandler = function () {
    removeCard();
  };

  var closeCard = function () {
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', popupEscHandler);
  };

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var addCardsImg = function (photos, cardElement) {
    var popupDiv = cardElement.querySelector('.popup__photos');
    popupDiv.innerHTML = '';
    photos.forEach(function (img) {
      var imgTag = document.createElement('img');
      imgTag.classList.add('popup__photo');
      imgTag.src = img;
      imgTag.width = '45';
      imgTag.height = '40';
      imgTag.alt = 'Фотография жилья';
      popupDiv.appendChild(imgTag);
    });
  };

  var addFeaturesItem = function (features, cardElement) {
    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    features.forEach(function (featureName) {
      var featureItem = document.createElement('li');
      var featureClassName = 'popup__feature--' + featureName;
      featureItem.classList.add('popup__feature');
      featureItem.classList.add(featureClassName);
      featuresList.appendChild(featureItem);
    });
  };

  var renderCard = function (obj) {
    removeCard();
    var cardElement = cardTemplate.cloneNode(true);
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));

    var title = cardElement.querySelector('.popup__title');
    title.textContent = obj.offer.title;

    var address = cardElement.querySelector('.popup__text--address');
    address.textContent = obj.offer.address;

    var price = cardElement.querySelector('.popup__text--price');
    price.textContent = obj.offer.price + '₽/ночь';

    var type = cardElement.querySelector('.popup__type');
    type.textContent = typeMap[obj.offer.type];

    var rooms = cardElement.querySelector('.popup__text--capacity');
    switch (true) {
      case (obj.offer.rooms === 0 && obj.offer.guests === 0):
        rooms.textContent = '';
        break;
      case (obj.offer.rooms === 0):
        rooms.textContent = 'Подходит ' + obj.offer.guests + ' гостей';
        break;
      case (obj.offer.guests === 0):
        rooms.textContent = obj.offer.rooms + ' комнаты';
        break;
      default:
        rooms.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    }

    var checkInOut = cardElement.querySelector('.popup__text--time');
    switch (true) {
      case (obj.offer.checkin === ''):
      case (obj.offer.checkout === ''):
        checkInOut.textContent = '';
        break;
      default:
        checkInOut.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    }

    var description = cardElement.querySelector('.popup__description');
    description.textContent = obj.offer.description;

    var avatar = cardElement.querySelector('.map__card img');
    avatar.src = obj.author.avatar;

    addCardsImg(obj.offer.photos, cardElement);
    addFeaturesItem(obj.offer.features, cardElement);
  };

  window.card = {
    get: getCard,
    remove: removeCard
  };
})();
