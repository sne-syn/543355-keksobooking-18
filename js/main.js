'use strict';
(function () {
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
  };
  window.main.toggleEnableDisable(window.main.fieldset, true);
})();
