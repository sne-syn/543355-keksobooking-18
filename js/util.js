'use strict';

(function () {
  var Keycode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    SPACE_KEYCODE: 32
  };

  var keyaction = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER_KEYCODE) {
        action();
      }
    },
    isSpaceEvent: function (evt) {
      if (evt.keyCode === Keycode.SPACE_KEYCODE) {
        evt.preventDefault();
      }
    }
  };

  window.util = {
    keyaction: keyaction
  };
})();
