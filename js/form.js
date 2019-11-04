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

  // Title-validation.

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
      titleInput.style.border = '1px solid red';
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
      titleInput.style.border = '1px solid red';
    } else {
      titleInput.setCustomValidity('');
    }
  });

  typeSelect.addEventListener('change', function (evt) {
    var types = evt.target.value;
    priceInput.placeholder = validTypeMap[types].minprice;
    priceInput.setAttribute('min', validTypeMap[types].minprice);

    priceInput.addEventListener('invalid', function () {
      if (priceInput.validity.rangeOverflow) {
        priceInput.setCustomValidity('Предельно допустимая стоимость - 1000000');
        priceInput.style.border = '1px solid red';
      } else if (priceInput.validity.rangeUnderflow) {
        priceInput.setCustomValidity(validTypeMap[types].errorText);
        priceInput.style.border = '1px solid red';
      } else if (priceInput.validity.valueMissing) {
        priceInput.setCustomValidity('Обязательное поле');
        priceInput.style.border = '1px solid red';
      } else {
        priceInput.setCustomValidity('');
      }
    });
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(formSuccessHandler, formErrorHandler, new FormData(form));
    evt.preventDefault();
  });

  var cleanFieldset = function () {
    form.reset();
    limitGuestOptions();
    limitTimeOutOptions();
  };

  var formSuccessHandler = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    window.main.setNonActivePageMode();
  };

  var removeSuccessMessage = function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
      window.location.reload();
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

  var resetButton = form.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    window.main.setNonActivePageMode();
    window.location.reload();
  });

  window.form = {
    cleanFieldset: cleanFieldset
  };
})();
