import './keybord.scss';
import { createDomNode } from '../../utils/utils';
import { Key } from '../Key';
import { keys } from '../../utils/keys';

export class Keybord {
  constructor(lang) {
    this.lang = lang;
    this.keybord = '';
    this.keybordWrapper = '';
    this.keybordRow1 = '';
    this.keybordRow2 = '';
    this.keybordRow3 = '';
    this.keybordRow4 = '';
    this.keybordRow5 = '';
  }

  createKeybord() {
    this.keybord = createDomNode('div', 'keybord');
    this.keybord.dataset.language = this.lang;
    this.keybordWrapper = createDomNode('div', 'keybord__wrapper');
    this.keybord.append(this.keybordWrapper);

    this.keybordRow1 = createDomNode('div', 'keybord__row');
    const codesOfRow1 = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'NumpadSubtract', 'Equal'];
    this.repeatedlyAddKey(this.keybordRow1, codesOfRow1);
    addDarkKey('125px', 'Backspace', this.keybordRow1);
    this.keybordWrapper.append(this.keybordRow1);

    this.keybordRow2 = createDomNode('div', 'keybord__row');
    const codesOfRow2 = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'];
    addDarkKey('62px', 'Tab', this.keybordRow2);
    this.repeatedlyAddKey(this.keybordRow2, codesOfRow2);
    addDarkKey('53px', 'Del', this.keybordRow2, 'Delete');
    this.keybordWrapper.append(this.keybordRow2);

    this.keybordRow3 = createDomNode('div', 'keybord__row');
    const charsOfRow3 = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote'];
    addDarkKey('124px', 'CapsLock', this.keybordRow3);
    this.repeatedlyAddKey(this.keybordRow3, charsOfRow3);
    addDarkKey('110px', 'Enter', this.keybordRow3);
    this.keybordWrapper.append(this.keybordRow3);

    this.keybordRow4 = createDomNode('div', 'keybord__row');
    const codesOfRow4 = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'NumpadDecimal', 'Period', 'Slash'];
    addDarkKey('125px', 'Shift', this.keybordRow4, 'ShiftLeft');
    this.repeatedlyAddKey(this.keybordRow4, codesOfRow4);
    addDarkKey('50px', '⯅', this.keybordRow4, 'ArrowUp');
    addDarkKey('110px', 'Shift', this.keybordRow4, 'ShiftRight');
    this.keybordWrapper.append(this.keybordRow4);

    this.keybordRow5 = createDomNode('div', 'keybord__row');
    addDarkKey('50px', 'Ctrl', this.keybordRow5, 'ControlLeft');
    addDarkKey('50px', 'Win', this.keybordRow5);
    addDarkKey('50px', 'Alt', this.keybordRow5, 'AltLeft');
    addSpaceKey(this.keybordRow5);
    addDarkKey('50px', 'Alt', this.keybordRow5, 'AltRight');
    addDarkKey('50px', '⯇', this.keybordRow5, 'ArrowLeft');
    addDarkKey('50px', '⯆', this.keybordRow5, 'ArrowDown');
    addDarkKey('50px', '⯈', this.keybordRow5, 'ArrowRight');
    addDarkKey('53px', 'Ctrl', this.keybordRow5, 'ControlRight');
    this.keybordWrapper.append(this.keybordRow5);

    return this.keybord;
  }

  repeatedlyAddKey(node, codes) {
    for (let i = 0; i < codes.length; i++) {
      const key = new Key(keys[codes[i]]).createKey(this.lang);
      node.append(key);
    }
  }
}

function addDarkKey(width, text, node, data = text) {
  const key = createDomNode('div', 'key_dark', 'key');
  key.innerText = text;
  key.style.width = width;
  key.dataset.code = data;
  node.append(key);
}

function addSpaceKey(node) {
  const key = createDomNode('div', 'key');
  key.innerText = ' ';
  key.style.width = '425px';
  key.dataset.code = 'Space';
  node.append(key);
}
