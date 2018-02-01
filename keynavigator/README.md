# keynavigator
Init Keynavigator
```javascript
keynavigator.init({
  initWrapper: ".keynavigator",
  activeClass: "active",
  activeIndex: 0,
  callBackKeyDown: callBackKeyDown,
  hisEventKeydown: hisEventKeydown
});

var callBackKeyDown = function (element) {
  console.log(element);
};

var hisEventKeydown = function (e) {
  console.log(e);
  return true;
};
  ```
 
```javascript
keynavigator.activeElement(1); // Active 2 element
keynavigator.activeElement(2); // Active 3 element
  ```
Active index
`keynavigator.options.activeIndex`
