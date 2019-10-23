'use strict';

(function () {

  var validTypeMap = {
    'bungalo': {
      'minprice': '0',
      'errorText': 'Минимальная цена за ночь 0₽'
    },
    'flat': {
      'minprice': '1000',
      'errorText': 'Минимальная цена за ночь 1000₽'
    },
    'house': {
      'minprice': '5000',
      'errorText': 'Минимальная цена за ночь 5000₽'
    },
    'palace': {
      'minprice': '10000',
      'errorText': 'Минимальная цена за ночь 10000₽'
    }
  };

  var timeInOutMap = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var roomGuestsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStyleLeft = mainPin.style.left;
  var mainPinStyleTop = mainPin.style.top;
  var form = document.querySelector('.ad-form');
  var guestsCapacity = form.querySelector('#capacity');
  var roomSelect = form.querySelector('#room_number');
  var secondSelectOptions = form.querySelectorAll('#capacity option');
  var typeSelect = form.querySelector('#type');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');

  var checkGuestOptions = function () {
    var availableGuests = roomGuestsMap[roomSelect.value];
    availableGuests.forEach(function (option) {
      var current = guestsCapacity.querySelector('[value="' + option + '"]');
      current.removeAttribute('disabled');
      current.setAttribute('selected', 'selected');
    });
  };

  roomSelect.addEventListener('change', function () {
    secondSelectOptions.forEach(function (option) {
      option.setAttribute('disabled', 'disabled');
      option.removeAttribute('selected');
    });
    checkGuestOptions();
  });

  // TimeInOut validation

  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');
  var timeOutOption = form.querySelectorAll('#timeout option');

  var checkTimeOutOptions = function () {
    var availableTimeOption = timeInOutMap[timeInSelect.value];
    var current = timeOutSelect.querySelector('[value="' + availableTimeOption + '"]');
    current.removeAttribute('disabled');
    current.setAttribute('selected', 'selected');
  };

  timeInSelect.addEventListener('change', function () {
    timeOutOption.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
      item.removeAttribute('selected');
    });
    checkTimeOutOptions();
  });

  // Title-validation.

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }

    // Пробы switch'a

    // switch(titleInput) {
    //   case titleInput.validity.tooShort:
    //   titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    //   break;

    //   case titleInput.validity.valueMissing:
    //   titleInput.setCustomValidity('Обязательное поле');
    //   break;

    //   default:
    //   titleInput.setCustomValidity('');
    // }
  });

  // Type&price-validation

  typeSelect.addEventListener('change', function (evt) {
    var types = evt.target.value;
    priceInput.placeholder = validTypeMap[types].minprice;
    priceInput.setAttribute('min', validTypeMap[types].minprice);

    priceInput.addEventListener('invalid', function () {
      if (priceInput.validity.rangeOverflow) {
        priceInput.setCustomValidity('Предельно допустимая стоимость - 1000000');
      } else if (priceInput.validity.rangeUnderflow) {
        priceInput.setCustomValidity(validTypeMap[types].errorText);
      } else if (priceInput.validity.valueMissing) {
        priceInput.setCustomValidity('Обязательное поле');
      } else {
        priceInput.setCustomValidity('');
      }
    });
  });

  form.addEventListener('submit', function (evt) {
    window.backend.setServerInteraction(formSuccessHandler, formErrorHandler, new FormData(form));
    evt.preventDefault();
  });

  var cleanFieldset = function () {
    form.reset();
    checkGuestOptions();
    checkTimeOutOptions();
  };

  var removePins = function () {
    var mapPins = document.querySelector('.map__pins');
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (items) {
      if (items !== mainPin) {
        items.remove();
      }
    });
  };

  var setNonActivePageMode = function () {
    cleanFieldset();
    window.pin.getPinCoordinate(window.pin.pinNonActiveY);
    document.querySelector('.map').classList.add('map--faded');
    document.activeElement.blur();
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.card.removeCard();
    removePins();
    window.main.toggleEnableDisable(window.main.fieldset, true);
    mainPin.style.left = mainPinStyleLeft;
    mainPin.style.top = mainPinStyleTop;
  };

  var formSuccessHandler = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    setNonActivePageMode();
  };

  var removeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
    }
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    if (errorMessage) {
      errorMessage.remove();
    }
  };

  document.addEventListener('click', function () {
    removeSuccessMessage();
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      removeSuccessMessage();
    });
  });

  var formErrorHandler = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorElement);
  };


  document.addEventListener('click', function () {
    removeErrorMessage();
  });

  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      removeErrorMessage();
    });
  });

})();
