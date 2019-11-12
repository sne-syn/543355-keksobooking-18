'use strict';

(function () {
  var Price = {
    BUNGALO_MIN_PRICE: 0,
    FLAT_MIN_PRICE: 1000,
    HOUSE_MIN_PRICE: 5000,
    PALACE_MIN_PRICE: 10000
  };

  var Type = function (minprice) {
    this.minprice = minprice;
    this.errorText = 'Минимальная цена за ночь ' + minprice + '₽';
  };

  var validTypeMap = {
    bungalo: new Type(Price.BUNGALO_MIN_PRICE),
    flat: new Type(Price.FLAT_MIN_PRICE),
    house: new Type(Price.HOUSE_MIN_PRICE),
    palace: new Type(Price.PALACE_MIN_PRICE)
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

  var setDisabledValue = function (optionList) {
    optionList.forEach(function (option) {
      option.setAttribute('disabled', 'disabled');
      option.removeAttribute('selected');
    });
  };

  var setSelectedValue = function (select, option) {
    var current = select.querySelector('[value="' + option + '"]');
    current.removeAttribute('disabled');
    current.setAttribute('selected', 'selected');
  };

  var limitGuestOptions = function () {
    var availableGuests = roomGuestsMap[roomSelect.value];
    availableGuests.forEach(function (option) {
      setSelectedValue(guestsCapacity, option);
    });
  };

  var limitTimeOutOptions = function () {
    var availableTimeOption = timeInOutMap[timeInSelect.value];
    setSelectedValue(timeOutSelect, availableTimeOption);
  };

  roomSelect.addEventListener('change', function () {
    setDisabledValue(capacitySelectOptions);
    limitGuestOptions();
  });

  timeInSelect.addEventListener('change', function () {
    setDisabledValue(timeOutOptions);
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
    window.util.keyaction.addEscEvent(evt, removeSuccessMessage);
  };
  var errorMessageEscHandler = function (evt) {
    window.util.keyaction.addEscEvent(evt, removeErrorMessage);
  };
  var successMessageClickHandler = function () {
    removeSuccessMessage();
  };
  var errorMessageClickHandler = function () {
    removeErrorMessage();
  };

  var showSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    window.main.deactivatePage();
    document.addEventListener('keydown', successMessageEscHandler);
    document.addEventListener('click', successMessageClickHandler);
  };

  var showErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorElement);
    document.addEventListener('keydown', errorMessageEscHandler);
    document.addEventListener('click', errorMessageClickHandler);
  };

  var removeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    removeStateMessage(successMessage);
    document.removeEventListener('keydown', successMessageEscHandler);
    document.removeEventListener('click', successMessageClickHandler);
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    removeStateMessage(errorMessage);
    document.removeEventListener('keydown', errorMessageEscHandler);
    document.removeEventListener('click', errorMessageClickHandler);
  };

  var resetButton = form.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
  });

  window.form = {
    cleanFieldset: cleanFieldset,
    errorMessageEscHandler: errorMessageEscHandler,
    errorMessageClickHandler: errorMessageClickHandler
  };

})();
