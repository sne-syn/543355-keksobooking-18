'use strict';

(function () {
  var Keycode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    SPACE_KEYCODE: 32
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Keycode.ENTER_KEYCODE) {
      action();
    }
  };

  window.util = {
    Keycode: Keycode,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
