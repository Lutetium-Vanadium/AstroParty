class InputListeners {
  constructor(...keyNames) {
    console.log({ keyNames });
    this.values = keyNames ? keyNames : [];
    console.log(this.values);

    // Functions that the user define
    this.press = null;
    this.releaseKey = null;
    this.touch = null;
    this.releaseTouch = null;

    window.addEventListener("keydown", this.keyDownHandler, false);
    window.addEventListener("keyup", this.keyUpHandler, false);

    window.addEventListener("touchstart", this.touchDownHandler, false);
    window.addEventListener("touchend", this.touchReleaseHandler, false);
  }

  trackKeydown = (press, releaseKey) => {
    this.press = press;
    this.releaseKey = releaseKey;
  };
  trackTouch = (touch, releaseTouch) => {
    this.touch = touch;
    this.releaseTouch = releaseTouch;
  };

  keyDownHandler = event => {
    if (this.values.findIndex(val => val === event.key) !== -1) {
      event.preventDefault();
      if (this.press) this.press(event.key);
    }
  };
  touchDownHandler = event => {
    if (this.touch) {
      event.preventDefault();
      this.touch(event.touches[0]);
    }
  };

  keyUpHandler = event => {
    if (this.values.findIndex(val => val === event.key) !== -1) {
      event.preventDefault();
      if (this.releaseKey) this.releaseKey();
    }
  };
  touchReleaseHandler = event => {
    if (this.releaseTouch) {
      event.preventDefault();
      this.releaseTouch();
    }
  };

  unsubscribe = () => {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);

    window.removeEventListener("touchstart", this.touchDownHandler);
    window.removeEventListener("touchend", this.touchReleaseHandler);
  };
}

export default InputListeners;
