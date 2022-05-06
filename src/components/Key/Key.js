import './key.scss';
import { createDomNode } from '../../utils/utils';

export class Key {
  constructor(char, ...classes) {
    this.key = '';
    this.char = char;
    this.classes = classes;
  }

  createKey() {
    this.key = createDomNode('div', 'key', ...this.classes);
    this.key.innerText = this.char;
    this.addCode();
    return this.key;
  }

  addCode() {
    if (!this.classes.includes('key_dark')) {
      if (!Number.isNaN(Number(this.char))) {
        this.key.dataset.code = `Digit${this.char}`;
      } else {
        switch (this.char) {
          case '`':
            this.key.dataset.code = 'Backquote';
            break;
          case '-':
            this.key.dataset.code = 'NumpadSubtract';
            break;
          case '=':
            this.key.dataset.code = 'Equal';
            break;
          case '[':
            this.key.dataset.code = 'BracketLeft';
            break;
          case ']':
            this.key.dataset.code = 'BracketRight';
            break;
          case ';':
            this.key.dataset.code = 'Semicolon';
            break;
          case '\'':
            this.key.dataset.code = 'Quote';
            break;
          case '\\':
            this.key.dataset.code = 'Backslash';
            break;
          case ',':
            this.key.dataset.code = 'NumpadDecimal';
            break;
          case '.':
            this.key.dataset.code = 'Period';
            break;
          case '/':
            this.key.dataset.code = 'Slash';
            break;
          case '':
            this.key.dataset.code = 'Space';
            break;
          default:
            this.key.dataset.code = `Key${this.char.toUpperCase()}`;
        }
      }
    }
  }
}
