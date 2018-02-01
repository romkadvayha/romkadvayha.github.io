var keynavigator = {};

keynavigator.KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  TAB: 9,
  SPACE: 32
};

keynavigator.options = {
  initWrapper: "keynavigator",
  activeClass: "active",
  activeIndex: 0,
  keyNavBlocks: [],
  callBackKeyDown: null,
  hisEventKeydown: null
};

keynavigator.checkKey = function (e) {
  e = e || event;
  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
};

keynavigator.activeElement = function (index) {
  keynavigator.options.keyNavBlocks[index].classList.add(keynavigator.options.activeClass);
  if (keynavigator.options.activeIndex !== index) {
    keynavigator.options.keyNavBlocks[keynavigator.options.activeIndex].classList.remove(keynavigator.options.activeClass);
    keynavigator.options.activeIndex = index;
  }
  if (keynavigator.options.callBackKeyDown !== null) {
    keynavigator.options.callBackKeyDown(keynavigator.options.keyNavBlocks[keynavigator.options.activeIndex]);
  }
};

keynavigator.activeElementByRowIndex = function (row, rowIndex, defaultFirst) {
  var rowElements = document.querySelectorAll(keynavigator.options.initWrapper + " > [data-keynavigator-row='" + row + "']");
  var newActiveIndex = null;
  for (var i = 0; i < rowElements.length; i++) {
    if (rowElements[i].dataset.keynavigatorRowIndex == rowIndex) {
      newActiveIndex = rowElements[i].dataset.keynavigatorIndex;
      break;
    }
    newActiveIndex = rowElements[i].dataset.keynavigatorIndex;
  }
  if (newActiveIndex == null) {
    if (defaultFirst) {
      newActiveIndex = 0;
    } else {
      newActiveIndex = keynavigator.options.keyNavBlocks.length - 1;
    }
  }
  return keynavigator.activeElement(newActiveIndex);
};

keynavigator.init = function (obj) {
  keynavigator.options.initWrapper = (obj.initWrapper) ? obj.initWrapper : keynavigator.options.initWrapper;
  keynavigator.options.activeClass = (obj.activeClass) ? obj.activeClass : keynavigator.options.activeClass;
  keynavigator.options.activeIndex = (obj.activeIndex) ? obj.activeIndex : keynavigator.options.activeIndex;
  keynavigator.options.callBackKeyDown = (obj.callBackKeyDown) ? obj.callBackKeyDown : keynavigator.options.callBackKeyDown;
  keynavigator.options.hisEventKeydown = (obj.hisEventKeydown) ? obj.hisEventKeydown : keynavigator.options.hisEventKeydown;

  keynavigator.options.keyNavBlocks = document.querySelectorAll(keynavigator.options.initWrapper + " > [data-keynavigator]");
  keynavigator.activeElement(keynavigator.options.activeIndex);
  keynavigator.countBlocksLine(0);
  keynavigator.keydown();
};

keynavigator.keydown = function () {
  window.addEventListener('keydown', function (event) {
    if (keynavigator.options.hisEventKeydown(event)) {
      switch (event.keyCode) {
        case keynavigator.KEYS.LEFT:
          keynavigator.keyDownLeftHandler(event);
          break;
        case keynavigator.KEYS.UP:
          keynavigator.keyDownUpHandler(event);
          return false;
          break;
        case keynavigator.KEYS.RIGHT:
          keynavigator.keyDownRightHandler(event);
          break;
        case keynavigator.KEYS.DOWN:
          keynavigator.keyDownDownHandler(event);
          break;
      }
    }
  }, false);
};

keynavigator.countBlocksLine = function (rowNum) {
  var resCount = 0;
  var count = 0;
  var row = 0;
  var activeBlockLineTop = keynavigator.options.keyNavBlocks[0].offsetTop;
  for (var i = 0; i < keynavigator.options.keyNavBlocks.length; i++) {
    if (activeBlockLineTop == keynavigator.options.keyNavBlocks[i].offsetTop) {
      count++;
    } else {
      if (rowNum == row && resCount == 0) {
        resCount = count;
      }
      count = 1;
      row++;
      activeBlockLineTop = keynavigator.options.keyNavBlocks[i].offsetTop;
    }
    keynavigator.options.keyNavBlocks[i].dataset.keynavigatorIndex = i;
    keynavigator.options.keyNavBlocks[i].dataset.keynavigatorRowIndex = count - 1;
    keynavigator.options.keyNavBlocks[i].dataset.keynavigatorRow = row;
  }
  return resCount;
};

keynavigator.keyDownLeftHandler = function (event) {
  keynavigator.checkKey(event);
  var activeIndex = keynavigator.options.activeIndex;
  activeIndex--;
  if (activeIndex < 0) {
    activeIndex = keynavigator.options.keyNavBlocks.length - 1;
  }
  keynavigator.activeElement(activeIndex);
};

keynavigator.keyDownRightHandler = function (event) {
  keynavigator.checkKey(event);
  var activeIndex = keynavigator.options.activeIndex;
  activeIndex++;
  if (activeIndex >= keynavigator.options.keyNavBlocks.length) {
    activeIndex = 0;
  }
  keynavigator.activeElement(activeIndex);
};

keynavigator.keyDownUpHandler = function (event) {
  keynavigator.checkKey(event);
  var row = parseInt(keynavigator.options.keyNavBlocks[keynavigator.options.activeIndex].dataset.keynavigatorRow) - 1;
  var rowIndex = parseInt(keynavigator.options.keyNavBlocks[keynavigator.options.activeIndex].dataset.keynavigatorRowIndex);
  keynavigator.activeElementByRowIndex(row, rowIndex, false);
};

keynavigator.keyDownDownHandler = function (event) {
  keynavigator.checkKey(event);
  var row = parseInt(keynavigator.options.keyNavBlocks[keynavigator.options.activeIndex].dataset.keynavigatorRow) + 1;
  var rowIndex = parseInt(keynavigator.options.keyNavBlocks[keynavigator.options.activeIndex].dataset.keynavigatorRowIndex);
  keynavigator.activeElementByRowIndex(row, rowIndex, true);
};
