'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinStyleLeft = mainPin.style.left;
  var mainPinStyleTop = mainPin.style.top;

  window.main = {
    fieldset: document.querySelectorAll('.ad-form fieldset'),
    toggleEnableDisable: function (element, booleanType) {
      element.forEach(function (input) {
        input.disabled = booleanType;
      });
    },

    runActivePageMode: function () {
      window.pin.getPinCoordinate(window.pin.pinActiveY);
      window.main.toggleEnableDisable(window.main.fieldset, false);
      window.backend.setServerInteraction(window.pin.successHandler, window.pin.errorHandler);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    },

    setNonActivePageMode: function () {
      mainPin.style.left = mainPinStyleLeft;
      mainPin.style.top = mainPinStyleTop;
      window.form.cleanFieldset();
      document.activeElement.blur();
      window.card.removeCard();
      window.pin.removePins();
      window.main.toggleEnableDisable(window.main.fieldset, true);
      window.pin.getPinCoordinate(window.pin.pinNonActiveY);
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
    }
  };
  window.main.toggleEnableDisable(window.main.fieldset, true);
})();
