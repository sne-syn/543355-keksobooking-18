'use strict';
(function () {

  window.main = {
    runActivePageMode: function () {
      window.pin.getPinCoordinate(window.pin.pinActiveY);
      window.backend.setServerInteraction(window.pin.successHandler, window.pin.errorHandler);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    },
  };

})();
