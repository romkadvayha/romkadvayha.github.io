var callBackKeyDown = function (element) {
  console.log(element);
};

var hisEventKeydown = function (e) {
  switch (e.keyCode) {
    case keynavigator.KEYS.ENTER:
      break;
    case keynavigator.KEYS.TAB:
      break;
    case keynavigator.KEYS.SPACE:
      break;
  }
  return true;
};

keynavigator.init({
  initWrapper: ".keynavigator",
  activeClass: "cursorActive",
  activeIndex: 0,
  callBackKeyDown: callBackKeyDown,
  hisEventKeydown: hisEventKeydown
});
