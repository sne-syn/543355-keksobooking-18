'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStyleLeft = mainPin.style.left;
  var mainPinStyleTop = mainPin.style.top;

  var fieldset = document.querySelectorAll('.ad-form fieldset');
  var toggleEnableDisable = function (element, booleanType) {
    element.forEach(function (input) {
      input.disabled = booleanType;
    });
  };

  var runActivePageMode = function () {
    window.pin.getPinCoordinate(window.pin.pinActiveY);
    toggleEnableDisable(fieldset, false);
    window.backend.load(window.pin.successHandler, window.pin.errorHandler);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  var setNonActivePageMode = function () {
    mainPin.style.left = mainPinStyleLeft;
    mainPin.style.top = mainPinStyleTop;
    window.form.cleanFieldset();
    document.activeElement.blur();
    window.card.removeCard();
    window.pin.removePins();
    toggleEnableDisable(fieldset, true);
    window.pin.getPinCoordinate(window.pin.pinNonActiveY);
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
  };

  toggleEnableDisable(fieldset, true);

  window.main = {
    fieldset: fieldset,
    toggleEnableDisable: toggleEnableDisable,
    runActivePageMode: runActivePageMode,
    setNonActivePageMode: setNonActivePageMode
  };
})();
