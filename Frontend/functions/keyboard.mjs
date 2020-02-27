function keyboard(...args) {
  let key = {};
  key.values = args;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = event => {
    if (key.values.findIndex(val => val === event.key) !== -1) {
      event.preventDefault();
      if (key.press) key.press(event.key);
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (key.values.findIndex(val => val === event.key) !== -1) {
      event.preventDefault();
      if (key.isDown && key.release) key.release();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
}

export default keyboard;
