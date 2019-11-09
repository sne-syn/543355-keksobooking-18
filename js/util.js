'use strict';

(function () {
  var Keycode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    SPACE_KEYCODE: 32
  };

  var keyaction = {
    addEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC_KEYCODE) {
        action();
      }
    },
    addEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER_KEYCODE) {
        action();
      }
    },
    removeSpaceEvent: function (evt) {
      if (evt.keyCode === Keycode.SPACE_KEYCODE) {
        evt.preventDefault();
      }
    }
  };

  window.util = {
    keyaction: keyaction
  };
})();
