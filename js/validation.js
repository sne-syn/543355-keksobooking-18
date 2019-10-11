
// Validation
(function () {
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
    secondSelectOptions[i].setAttribute('disabled', 'disabled');
  }

  for (var j = 0; j < availableGuests.length; j++) {
    secondSelectOptions[availableGuests[j]].removeAttribute('disabled');
  }
});

// TimeInOut validation

var timeInSelect = form.querySelector('#timein');
var timeOutSelect = form.querySelector('#timeout');
var timeInOption = form.querySelector('#timein option');
var timeOutOption = form.querySelector('#timeout option');

timeInSelect.addEventListener('change', function (evt) {
  var timeInOutMap = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var timeInOutValue = timeInOutMap[timeInSelect.value];
  console.log(timeInOutValue);
  timeOutOption.setAttribute('disabled', 'disabled');

  // timeOutOption[timeInOutValue].removeAttribute('disabled');
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
}) ();
