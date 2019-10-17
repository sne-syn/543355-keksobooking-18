'use strict';

(function () {
  var fieldset = document.querySelectorAll('.ad-form fieldset');

  window.form = {
    toggleEnableDisable: function (element, booleanType) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = booleanType;
      }
    }
  };

  window.form.toggleEnableDisable(fieldset, true);
})();
