'use strict';

var OK_STATUS_CODE = 200;
var urlGet = 'https://js.dump.academy/keksobooking/data';
var urlPost = 'https://js.dump.academy/keksobooking';
var timeOutLimit = 10000; // 10s

window.backend = {
  setServerInteraction: function (onLoad, onError, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс. Проверьте соединение и повторите попытку.');
    });

    xhr.timeout = timeOutLimit;
    if (data) {
      xhr.open('POST', urlPost);
      xhr.send(data);
    } else {
      xhr.open('GET', urlGet);
      xhr.send();
    }
  }
};
