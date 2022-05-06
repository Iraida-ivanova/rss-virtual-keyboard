import './keybord.scss';
import { createDomNode } from '../../utils/utils';
import { Key } from '../Key';

export class Keybord {
  constructor() {
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
    this.keybordWrapper = createDomNode('div', 'keybord__wrapper');
    this.keybord.append(this.keybordWrapper);

    this.keybordRow1 = createDomNode('div', 'keybord__row');
    const charsOfRow1 = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
    repeatedlyAddKey(this.keybordRow1, charsOfRow1);
    addDarkKey('125px', 'Backspace', this.keybordRow1);
    this.keybordWrapper.append(this.keybordRow1);

    this.keybordRow2 = createDomNode('div', 'keybord__row');
    const charsOfRow2 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
    addDarkKey('62px', 'Tab', this.keybordRow2);
    repeatedlyAddKey(this.keybordRow2, charsOfRow2);
    addDarkKey('53px', 'Del', this.keybordRow2);
    this.keybordWrapper.append(this.keybordRow2);

    this.keybordRow3 = createDomNode('div', 'keybord__row');
    const charsOfRow3 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''];
    addDarkKey('124px', 'CapsLock', this.keybordRow3);
    repeatedlyAddKey(this.keybordRow3, charsOfRow3);
    addDarkKey('110px', 'Enter', this.keybordRow3);
    this.keybordWrapper.append(this.keybordRow3);

    this.keybordRow4 = createDomNode('div', 'keybord__row');
    const charsOfRow4 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
    addDarkKey('125px', 'Shift', this.keybordRow4, 'ShiftLeft');
    repeatedlyAddKey(this.keybordRow4, charsOfRow4);
    addDarkKey('50px', '△', this.keybordRow4);
    addDarkKey('110px', 'Shift', this.keybordRow4, 'ShiftRight');
    this.keybordWrapper.append(this.keybordRow4);

    this.keybordRow5 = createDomNode('div', 'keybord__row');
    addDarkKey('50px', 'Ctrl', this.keybordRow5, 'ControlLeft');
    addDarkKey('50px', 'Win', this.keybordRow5);
    addDarkKey('50px', 'Alt', this.keybordRow5, 'AltLeft');
    addSpaceKey(this.keybordRow5);
    addDarkKey('50px', 'Alt', this.keybordRow5, 'AltRight');
    addDarkKey('50px', 'Win', this.keybordRow5);
    addDarkKey('50px', 'Alt', this.keybordRow5);
    addDarkKey('50px', 'Alt', this.keybordRow5);
    addDarkKey('53px', 'Ctrl', this.keybordRow5, 'ControlRight');
    this.keybordWrapper.append(this.keybordRow5);
    this.keybord.dataset.language = 'en';

    return this.keybord;
  }
}

function repeatedlyAddKey(node, chars) {
  for (let i = 0; i < chars.length; i++) {
    const key = new Key(chars[i]).createKey();
    node.append(key);
  }
}

function addDarkKey(width, text, node, data = text) {
  const key = new Key(text, 'key_dark').createKey();
  key.style.width = width;
  key.dataset.code = data;
  node.append(key);
}

function addSpaceKey(node) {
  const key = new Key('').createKey();
  key.style.width = '425px';
  node.append(key);
}
