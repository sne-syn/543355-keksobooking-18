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

  var form = document.querySelector('.ad-form');
  var guestsCapacity = form.querySelector('#capacity');
  var roomSelect = form.querySelector('#room_number');
  var capacitySelectOptions = form.querySelectorAll('#capacity option');
  var typeSelect = form.querySelector('#type');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');
  var timeOutOptions = form.querySelectorAll('#timeout option');
  var features = form.querySelectorAll('.feature');

  var SPACE_KEYCODE = 32;


  var setSelect = function (optionList) {
    optionList.forEach(function (option) {
      option.setAttribute('disabled', 'disabled');
      option.removeAttribute('selected');
    });
  };

  var limitGuestOptions = function () {
    var availableGuests = roomGuestsMap[roomSelect.value];
    availableGuests.forEach(function (option) {
      var current = guestsCapacity.querySelector('[value="' + option + '"]');
      current.removeAttribute('disabled');
      current.setAttribute('selected', 'selected');
    });
  };

  var limitTimeOutOptions = function () {
    var availableTimeOption = timeInOutMap[timeInSelect.value];
    var current = timeOutSelect.querySelector('[value="' + availableTimeOption + '"]');
    current.removeAttribute('disabled');
    current.setAttribute('selected', 'selected');
  };

  roomSelect.addEventListener('change', function () {
    setSelect(capacitySelectOptions);
    limitGuestOptions();
  });

  timeInSelect.addEventListener('change', function () {
    setSelect(timeOutOptions);
    limitTimeOutOptions();
  });

  var validateInput = function (el, mapElement) {
    switch (true) {
      case (el.validity.rangeOverflow):
        el.setCustomValidity('Предельно допустимая стоимость - 1000000');
        el.style.border = '1px solid red';
        break;
      case (el.validity.rangeUnderflow):
        el.setCustomValidity(validTypeMap[mapElement].errorText);
        el.style.border = '1px solid red';
        break;
      case (el.validity.tooShort):
        el.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
        el.style.border = '1px solid red';
        break;
      case (el.validity.valueMissing):
        el.setCustomValidity('Обязательное поле');
        el.style.border = '1px solid red';
        break;
      default:
        el.setCustomValidity('');
    }
  };

  var priceCheckHandler = function () {
    var typeValue = typeSelect.value;
    validateInput(priceInput, typeValue);
  };

  var titleCheckHandler = function () {
    validateInput(titleInput);
  };

  var typeSelectHandler = function (evt) {
    var typeValue = evt.target.value;
    priceInput.placeholder = validTypeMap[typeValue].minprice;
    priceInput.setAttribute('min', validTypeMap[typeValue].minprice);

    priceInput.addEventListener('invalid', function () {
      validateInput(priceInput, typeValue);
    });
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(showSuccessMessage, showErrorMessage, new FormData(form));
    evt.preventDefault();
  };

  titleInput.addEventListener('invalid', titleCheckHandler);
  priceInput.addEventListener('invalid', priceCheckHandler);
  typeSelect.addEventListener('change', typeSelectHandler);
  form.addEventListener('submit', formSubmitHandler);


  var cleanFieldset = function () {
    var formInput = document.querySelectorAll('.ad-form input');
    form.reset();
    limitGuestOptions();
    limitTimeOutOptions();
    var typeValue = typeSelect.value;
    priceInput.placeholder = validTypeMap[typeValue].minprice;
    formInput.forEach(function (input) {
      input.style.border = '';
    });
  };

  var removeStateMessage = function (message) {
    if (message) {
      message.remove();
    }
  };

  var successMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, removeSuccessMessage);
  };

  var errorMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, removeErrorMessage);
  };

  var showSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    window.main.deactivatePage();
    document.addEventListener('keydown', successMessageEscHandler);
  };

  var showErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorElement);
    document.addEventListener('keydown', errorMessageEscHandler);
  };

  var removeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    removeStateMessage(successMessage);
    document.removeEventListener('keydown', successMessageEscHandler);
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    removeStateMessage(errorMessage);
    document.removeEventListener('keydown', errorMessageEscHandler);
  };

  document.addEventListener('click', function () {
    removeSuccessMessage();
  });

  document.addEventListener('click', function () {
    removeErrorMessage();
  });

  var resetButton = form.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    window.main.deactivatePage();
  });

  window.form = {
    cleanFieldset: cleanFieldset,
    errorMessageEscHandler: errorMessageEscHandler
  };

})();
