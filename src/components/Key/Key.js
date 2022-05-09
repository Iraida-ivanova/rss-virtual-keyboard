import './key.scss';
import { createDomNode } from '../../utils/utils';

export class Key {
  constructor(objKey, ...classes) {
    this.key = '';
    this.objKey = objKey;
    this.classes = classes;
  }

  createKey(lang) {
    this.key = createDomNode('div', 'key', ...this.classes);
    this.addInnerText(lang);
    this.addCode();
    return this.key;
  }

  addInnerText(lang) {
    if (lang === 'en') {
      this.key.innerText = this.objKey.charEn;
    } else {
      this.key.innerText = this.objKey.charRu;
    }
  }

  addCode() {
    if (!this.classes.includes('key_dark')) {
      this.key.dataset.code = this.objKey.code;
    }
  }
}
