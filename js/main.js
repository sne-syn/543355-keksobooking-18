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
  toggleEnableDisable(fieldset, true);

  var activatePage = function () {
    window.pin.setCoordinate(window.pin.x, window.pin.activeY);
    toggleEnableDisable(fieldset, false);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.backend.load(window.pin.successHandler, window.pin.errorHandler);
  };

  var deactivatePage = function () {
    mainPin.style.left = mainPinStyleLeft;
    mainPin.style.top = mainPinStyleTop;
    window.pin.offers = '';
    window.form.cleanFieldset();
    window.card.remove();
    window.pin.remove();
    toggleEnableDisable(fieldset, true);
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    window.pin.setCoordinate(window.pin.x, window.pin.nonActiveY);
  };

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
