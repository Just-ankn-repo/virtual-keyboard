/* eslint-disable import/extensions */
/* global document window */

import KeyboardButton from './KeyboardButton.js';

export default class KeyboardFrame {
  constructor(keyCodes, keyboardMap, mods) {
    this.selfObj = '';
    this.allButtons = '';
    this.keyCodes = keyCodes;
    this.keyboardMap = keyboardMap;
    this.mods = mods;
  }

  generate() {
    this.selfObj = document.createElement('div');
    this.selfObj.className = 'keyboard_frame';
    for (let i = 0; i < this.keyboardMap.length; i += 1) {
      const keyboardRow = document.createElement('ul');
      keyboardRow.className = 'keyboard_row';
      keyboardRow.classList.add(`row_${i}`);
      for (let j = 0; j < this.keyboardMap[i].length; j += 1) {
        window[`key_${this.keyboardMap[i][j]}`] = new KeyboardButton(this.keyboardMap[i][j], keyboardRow, this.keyCodes);
        window[`key_${this.keyboardMap[i][j]}`].create(this.mods.lang);
        keyboardRow.append(window[`key_${this.keyboardMap[i][j]}`].selfObj);
      }
      this.selfObj.append(keyboardRow);
    }
  }

  refresh(mod) {
    this.mods = mod;
    this.allButtons.forEach((element) => {
      const keyId = element.classList[1].match(/\d+/g);
      if (this.mods.lang === 'default' || !this.keyCodes[keyId][this.mods.lang]) {
        if (this.keyCodes[keyId].shift && ((this.mods.shiftKey === 'on' && this.mods.capsKey === 'off') || (this.mods.shiftKey === 'off' && this.mods.capsKey === 'on'))) {
          window[`key_${keyId}`].update(this.keyCodes[keyId].shift);
        } else {
          window[`key_${keyId}`].update(this.keyCodes[keyId].default);
        }
      } else if (this.mods.lang === 'ru' && this.keyCodes[keyId][this.mods.lang]) {
        if ((this.mods.shiftKey === 'on' && this.mods.capsKey === 'off') || (this.mods.shiftKey === 'off' && this.mods.capsKey === 'on')) {
          window[`key_${keyId}`].update(this.keyCodes[keyId][this.mods.lang].shift);
        } else {
          window[`key_${keyId}`].update(this.keyCodes[keyId][this.mods.lang].default);
        }
      }
    });
  }
}
