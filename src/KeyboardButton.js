/* global document */

export default class KeyboardButton {
  constructor(keyCode, parent, keyCodes) {
    this.parent = parent;
    this.selfObj = '';
    this.keyCode = keyCode;
    this.keyCodes = keyCodes;
    this.content = '';
    this.position = 0;
  }

  create(lang) {
    if (!this.keyCodes[this.keyCode][lang]) {
      this.content = this.keyCodes[this.keyCode].default;
    } else if (this.keyCodes[this.keyCode][lang].default) {
      this.content = this.keyCodes[this.keyCode][lang].default;
    } else {
      this.content = this.keyCodes[this.keyCode][lang];
    }
    this.selfObj = document.createElement('li');
    this.selfObj.className = 'key_button';
    this.selfObj.classList.add(`key_${this.keyCode}`);
    this.selfObj.innerHTML = this.content;
  }

  update(content) {
    this.content = content;
    this.selfObj.innerHTML = this.content;
  }
}
