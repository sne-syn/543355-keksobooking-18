'use strict';
(function () {
  var fieldset = document.querySelectorAll('.ad-form fieldset');

  window.main = {
    runActivePageMode: function () {
      window.form.toggleEnableDisable(fieldset, false);
      window.pin.getPinCoordinate(window.pin.pinActiveY);
      window.pin.addMapPins(window.similarRentOffers);
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    }
  };
})();
