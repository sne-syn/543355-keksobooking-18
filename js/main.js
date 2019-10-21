'use strict';
(function () {

  var fieldset = document.querySelectorAll('.ad-form fieldset');
  var toggleEnableDisable = function (element, booleanType) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = booleanType;
    }
  };
  toggleEnableDisable(fieldset, true);

  window.main = {
    runActivePageMode: function () {
      toggleEnableDisable(fieldset, false);
      window.pin.getPinCoordinate(window.pin.pinActiveY);
      window.backend.setServerInteraction(window.pin.successHandler, window.pin.errorHandler);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    }
  };

})();
