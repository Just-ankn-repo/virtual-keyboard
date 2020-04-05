/* eslint-disable import/extensions */
/* global sessionStorage document window */

import KeyboardFrame from './KeyboardFrame.js';
import InputFrame from './InputFrame.js';
import { KeyCodes, KeyboardMap } from './KeyCodes.js';

const InputBody = new InputFrame();
const KeyboardBody = new KeyboardFrame(KeyCodes, KeyboardMap);

const mods = {
  shiftKey: 'off',
  altKey: 'off',
  ctrlKey: 'off',
  capsKey: 'off',
  lang: 'default',
  change: (mod, value) => {
    mods[mod] = value;
    KeyboardBody.refresh(mods);
    if (mod === 'lang') {
      sessionStorage.lang = value;
    }
  },
};

if (sessionStorage.lang) {
  mods.lang = sessionStorage.lang;
} else {
  sessionStorage.lang = mods.lang;
}

KeyboardBody.mods = mods;
document.body = document.createElement('body');
InputBody.generate();
document.body.append(InputBody.selfObj);
KeyboardBody.generate();
document.body.append(KeyboardBody.selfObj);
KeyboardBody.allButtons = document.querySelectorAll('.key_button');

window.addEventListener('keydown', (event) => {
  if (KeyCodes[event.keyCode]) {
    event.preventDefault();
    if (event.location === 2) {
      window[`key_${event.keyCode}2`].selfObj.classList.add('active');
    } else if (event.keyCode === 20 && window[`key_${event.keyCode}`].selfObj.classList[2] === 'active') {
      window[`key_${event.keyCode}`].selfObj.classList.remove('active');
      mods.change('capsKey', 'off');
    } else {
      window[`key_${event.keyCode}`].selfObj.classList.add('active');
    }
    if (event.keyCode === 20 && window[`key_${event.keyCode}`].selfObj.classList[2] === 'active') {
      mods.change('capsKey', 'on');
    }
    if (event.keyCode === 17) {
      mods.change('ctrlKey', 'on');
    }
    if (event.keyCode === 16) {
      mods.change('shiftKey', 'on');
    }
    if ((event.keyCode === 17 && mods.shiftKey === 'on') || (event.keyCode === 16 && mods.ctrlKey === 'on')) {
      if (mods.lang === 'default') {
        mods.change('lang', 'ru');
      } else if (mods.lang === 'ru') {
        mods.change('lang', 'default');
      }
    }
    if (![16, 17, 18, 20].includes(event.keyCode)) {
      InputBody.print(window[`key_${event.keyCode}`].content);
    }
  }
});

window.addEventListener('keyup', (event) => {
  if (KeyCodes[event.keyCode]) {
    event.preventDefault();
    if (event.location === 2) {
      window[`key_${event.keyCode}2`].selfObj.classList.remove('active');
    } else if (event.keyCode !== 20) {
      window[`key_${event.keyCode}`].selfObj.classList.remove('active');
    }
    if (event.keyCode === 17) {
      mods.change('ctrlKey', 'off');
    } else if (event.keyCode === 16) {
      mods.change('shiftKey', 'off');
    }
  }
});

document.body.addEventListener('mousedown', (event) => {
  if (event.target.classList[0] === 'key_button') {
    event.preventDefault();
    if (['key_16', 'key_17', 'key_18', 'key_20', 'key_162', 'key_172', 'key_182'].includes(event.target.classList[1]) && event.target.classList[2] === 'active') {
      document.querySelector(`.${event.target.classList[1]}`).classList.remove('active');
      if (['key_20'].includes(event.target.classList[1])) {
        mods.change('capsKey', 'off');
      }
      if (['key_16', 'key_162'].includes(event.target.classList[1])) {
        mods.change('shiftKey', 'off');
      }
      if (['key_17', 'key_172'].includes(event.target.classList[1])) {
        mods.change('ctrlKey', 'off');
      }
    } else {
      document.querySelector(`.${event.target.classList[1]}`).classList.add('active');
      if (['key_20'].includes(event.target.classList[1])) {
        mods.change('capsKey', 'on');
      }
      if (['key_16', 'key_162'].includes(event.target.classList[1])) {
        mods.change('shiftKey', 'on');
      }
      if (['key_17', 'key_172'].includes(event.target.classList[1])) {
        mods.change('ctrlKey', 'on');
      }
    }
    if ((['key_17', 'key_172'].includes(event.target.classList[1]) && mods.shiftKey === 'on') || (['key_16', 'key_162'].includes(event.target.classList[1]) && mods.ctrlKey === 'on')) {
      mods.change('ctrlKey', 'off');
      mods.change('shiftKey', 'off');
      if (mods.lang === 'default') {
        mods.change('lang', 'ru');
      } else if (mods.lang === 'ru') {
        mods.change('lang', 'default');
      }
      setTimeout(() => {
        document.querySelector('.key_17').classList.remove('active');
        document.querySelector('.key_16').classList.remove('active');
        document.querySelector('.key_172').classList.remove('active');
        document.querySelector('.key_162').classList.remove('active');
      }, 100);
    }
    if (!['key_16', 'key_17', 'key_18', 'key_20', 'key_162', 'key_172', 'key_182'].includes(event.target.classList[1])) {
      InputBody.print(window[event.target.classList[1]].content);
    }
  }
});

document.body.addEventListener('mouseup', (event) => {
  if (event.target.classList[0] === 'key_button') {
    event.preventDefault();
    if (!['key_16', 'key_17', 'key_18', 'key_20', 'key_162', 'key_172', 'key_182'].includes(event.target.classList[1])) {
      document.querySelector(`.${event.target.classList[1]}`).classList.remove('active');
    }
  }
});
