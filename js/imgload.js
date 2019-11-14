'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_SIZE = 70;

  var fileChooser = document.querySelector('.ad-form__upload  input[type=file]');
  var previewBlock = document.querySelector('.ad-form__photo');

  var addLoadedImg = function (reader) {
    previewBlock.innerHTML = '';
    var previewImg = document.createElement('img');
    previewBlock.appendChild(previewImg);
    previewImg.src = reader.result;
    previewImg.style.width = PREVIEW_SIZE + 'px';
    previewImg.style.height = PREVIEW_SIZE + 'px';
  };

  var removeLoadedImg = function () {
    previewBlock.innerHTML = '';
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        addLoadedImg(reader);
      });

      reader.readAsDataURL(file);
    }
  });

  window.imgload = {
    remove: removeLoadedImg
  };

})();
