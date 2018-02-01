var callBackKeyDown = function (element) {
  switch (event.keyCode) {
    case keynavigator.KEYS.ENTER:
      break;
    case keynavigator.KEYS.TAB:
      break;
    case keynavigator.KEYS.SPACE:
      break;
  }
};

var hisEventKeydown = function (e) {
  return true;
};

keynavigator.init({
  initWrapper: ".keynavigator",
  activeClass: "cursorActive",
  activeIndex: 0,
  callBackKeyDown: callBackKeyDown,
  hisEventKeydown: hisEventKeydown
});
