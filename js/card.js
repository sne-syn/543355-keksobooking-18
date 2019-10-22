'use strict';
(function () {
  var typeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  window.card = {
    openCard: function (element, card, i) {
      element.addEventListener('click', function () {
        getCard(element, card, i);
      });

      element.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, function () {
          getCard(element, card, i);
        });
      });
    },

    removeCard: function () {
      var mapCard = document.querySelector('.map__card');
      var activePin = document.querySelector('.map__pin--active');
      if (mapCard) {
        mapCard.remove();
        activePin.classList.remove('map__pin--active');
      }
    }
  };

  var getCard = function (element, card, i) {
    renderCard(card[i]);
    element.classList.add('map__pin--active');
    closeCard();
  };

  var closeCard = function () {
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      window.card.removeCard();
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, function () {
        window.card.removeCard();
      });
    });
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
    window.card.removeCard();
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
