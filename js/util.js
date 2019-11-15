'use strict';

(function () {
  var Keycode = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32
  };

  var keyaction = {
    addEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    },
    addEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    },
    removeSpaceEvent: function (evt) {
      if (evt.keyCode === Keycode.SPACE) {
        evt.preventDefault();
      }
    }
  };

  window.util = {
    keyaction: keyaction
  };
})();
