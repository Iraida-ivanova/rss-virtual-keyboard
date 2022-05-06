import './style.scss';
import { createDomNode } from './utils/utils';
import { Keybord } from './components/Keybord';
import { LETTERSru, LETTERSen } from './utils/letters';

const main = createDomNode('div', 'main');
const textarea = createDomNode('textarea', 'textarea');
const keybord = new Keybord().createKeybord();

document.body.append(main);
main.append(textarea);
main.append(keybord);
const virtualKeys = document.querySelectorAll('.key');

window.onload = function onload() {
  addVirtualKeyClickhandler();
  addKeyClickhandler();
  addCtrlShiftClickHandler('ControlLeft', 'ShiftLeft');
  addCtrlShiftClickHandler('ControlRight', 'ShiftRight');
  addCtrlShiftClickHandler('ControlLeft', 'ShiftRight');
  addCtrlShiftClickHandler('ControlRight', 'ShiftLeft');
};
function addVirtualKeyClickhandler() {
  keybord.addEventListener('click', (event) => {
    if (event.target.classList.contains('key')) {
      event.target.classList.add('key-push');
    }
  });
  keybord.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('key')) {
      event.target.classList.remove('key-push');
    }
  });
}
function addKeyClickhandler() {
  document.addEventListener('keydown', (event) => {
    virtualKeys.forEach((key) => {
      if (event.code === key.dataset.code) {
        key.classList.add('key-push');
      }
    });
  });
  document.addEventListener('keyup', () => {
    virtualKeys.forEach((key) => {
      key.classList.remove('key-push');
    });
  });
}
function addCtrlShiftClickHandler(...codes) {
  const pressed = new Set();
  document.addEventListener('keydown', ({ code }) => {
    changeLanguage(pressed, code, codes);
  });
  keybord.addEventListener('click', (event) => {
    let code = '';
    if (event.target.classList.contains('key')) {
      code = event.target.dataset.code;
      changeLanguage(pressed, code, codes);
    }
  });
  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
  keybord.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('key')) {
      pressed.delete(event.target.dataset.code);
    }
  });
}
function changeLanguage(pressed, code, codes) {
  pressed.add(code);
  /* eslint-disable-next-line */
  for (const el of codes) {
    if (!pressed.has(el)) {
      return;
    }
  }

  pressed.clear();

  changeInnerText();
  if (keybord.dataset.language === 'en') {
    keybord.dataset.language = 'ru';
  } else {
    keybord.dataset.language = 'en';
  }
}
function changeInnerText() {
  if (keybord.dataset.language === 'en') {
    virtualKeys.forEach((key) => {
      key.innerText = LETTERSru.get(key.innerText) || key.innerText;
    });
  } else {
    virtualKeys.forEach((key) => {
      key.innerText = LETTERSen.get(key.innerText) || key.innerText;
    });
  }
}
