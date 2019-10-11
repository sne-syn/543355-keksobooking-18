// Validation
(function () {
  var typeMap = {
    'bungalo': {
      'title': 'Бунгало',
      'placeholder': '100',
      'errorText': 'Минимальная цена за ночь 0 ₽/ночь'
    },
    'flat': {
      'title': 'Квартира',
      'placeholder': '1000',
      'errorText': 'Минимальная цена за ночь 1000 ₽/ночь'
    },
    'house': {
      'title': 'Дом',
      'placeholder': '5000',
      'errorText': 'Минимальная цена за ночь 5000 ₽/ночь'
    },
    'palace': {
      'title': 'Дворец',
      'placeholder': '10000',
      'errorText': 'Минимальная цена за ночь 10000 ₽/ночь'
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
  var secondSelectOptions = form.querySelectorAll('#capacity option');
  var typeSelect = form.querySelector('#type');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');

  roomSelect.addEventListener('change', function (evt) {
    var availableGuests = roomGuestsMap[roomSelect.value];

    for (var i = 0; i < secondSelectOptions.length; i++) {
      secondSelectOptions[i].setAttribute('disabled', 'disabled');
      secondSelectOptions[i].removeAttribute('selected');
    }

    for (var j = 0; j < availableGuests.length; j++) {
      var current = guestsCapacity.querySelector('[value="' + availableGuests[j] + '"]');
      current.removeAttribute('disabled');
      current.setAttribute('selected', 'selected');
    }
  });

  // TimeInOut validation

  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');
  var timeOutOption = form.querySelectorAll('#timeout option');

  timeInSelect.addEventListener('change', function (evt) {
    var availableTimeOption = timeInOutMap[timeInSelect.value];

    for (var i = 0; i < timeOutOption.length; i++) {
      timeOutOption[i].setAttribute('disabled', 'disabled');
      timeOutOption[i].removeAttribute('selected');
    }

    var current = timeOutSelect.querySelector('[value="' + availableTimeOption + '"]');
    current.removeAttribute('disabled');
    current.setAttribute('selected', 'selected');
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

  // Type-validation

  typeSelect.addEventListener('change', function (evt) {
    var types = evt.target.value;
    priceInput.placeholder = typeMap[types].placeholder;
    console.log(priceInput.value);
    if (priceInput < typeMap[types].placeholder) {
      typeSelect.setCustomValidity(typeMap[types].errorText);
    } else {
      priceInput.setCustomValidity('');
    }
  });
})();
