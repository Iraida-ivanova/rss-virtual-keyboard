import './style.scss';
import { createDomNode } from './utils/utils';
import { Keybord } from './components/Keybord';
import { LETTERSru, LETTERSen } from './utils/letters';

const main = createDomNode('div', 'main');
const virtualKeybord = createDomNode('div', 'virtual-keybord');
const textarea = createDomNode('textarea', 'textarea');
textarea.setAttribute('rows', 5);
textarea.setAttribute('cols', 50);
const lang = getLanguage();
const keybord = new Keybord(lang).createKeybord();
const description = createDomNode('p', 'description');
const language = createDomNode('p', 'language');
description.innerText = 'Клавиатура создана в операционной системе Windows';
language.innerText = 'Для переключения языка комбинация Ctrl + Shift';

document.body.append(main);
main.append(virtualKeybord);
virtualKeybord.append(textarea);
virtualKeybord.append(keybord);
main.append(description);
main.append(language);
const virtualKeys = document.querySelectorAll('.key');

window.onload = function onload() {
  addVirtualKeyClickhandler();
  addKeyClickhandler();
  addCtrlShiftClickHandler();
};
function getLanguage() {
  return localStorage.getItem('lang');
}
function addVirtualKeyClickhandler() {
  let key = '';
  keybord.addEventListener('mousedown', (event) => {
    event.preventDefault();
    key = event.target;
    if (key.classList.contains('key')) {
      highlightKey(key);
      print(key);
    }
  });
  document.addEventListener('mouseup', () => {
    virtualKeys.forEach((el) => removeHighlite(el));
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
function addCtrlShiftClickHandler() {
  const pressed = new Set();
  document.addEventListener('keydown', ({ code }) => {
    changeLanguage(pressed, code);
  });
  keybord.addEventListener('mousedown', (event) => {
    let code = '';
    if (event.target.classList.contains('key')) {
      code = event.target.dataset.code;
      changeLanguage(pressed, code);
    }
  });
  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
  keybord.addEventListener('mouseup', (event) => {
    pressed.delete(event.target.dataset.code);
  });
}
function changeLanguage(pressed, code) {
  pressed.add(code);
  if ((pressed.has('ControlLeft') || pressed.has('ControlRight')) && (pressed.has('ShiftLeft') || pressed.has('ShiftRight'))) {
    pressed.clear();

    changeInnerText();
    if (keybord.dataset.language === 'en') {
      keybord.dataset.language = 'ru';
      localStorage.setItem('lang', 'ru');
    } else {
      keybord.dataset.language = 'en';
      localStorage.setItem('lang', 'en');
    }
  }
}
function changeInnerText() {
  if (keybord.dataset.language === 'en') {
    virtualKeys.forEach((key) => {
      if (key.classList.contains('key_upperCase')) {
        key.innerText = LETTERSru.get(key.innerText.toLowerCase()) || key.innerText;
        key.innerText.toUpperCase();
      } else {
        key.innerText = LETTERSru.get(key.innerText) || key.innerText;
      }
    });
  } else {
    virtualKeys.forEach((key) => {
      if (key.classList.contains('key_upperCase')) {
        key.innerText = LETTERSen.get(key.innerText.toLowerCase()) || key.innerText;
        key.innerText.toUpperCase();
      } else {
        key.innerText = LETTERSen.get(key.innerText) || key.innerText;
      }
    });
  }
}
function highlightKey(element) {
  element.classList.add('key-push');
}
function removeHighlite(element) {
  element.classList.remove('key-push');
}
function print(element) {
  if (!element.classList.contains('key_dark')) {
    if (element.dataset.code === 'Space') {
      textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end');
    } else {
      textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
    }
    textarea.focus();
  } else {
    switch (element.dataset.code) {
      case 'Backspace':
        textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
        textarea.focus();
        break;
      case 'Delete':
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1, 'select');
        textarea.focus();
        break;
      case 'Enter':
        textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
        break;
      case 'Tab':
        textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
        break;
      case 'CapsLock':
        virtualKeys.forEach((el) => {
          if (!el.classList.contains('key_dark')) {
            el.classList.toggle('key_upperCase');
          }
        });
        break;
      case ('ShiftLeft' || 'ShiftRight'):
        break;
      case 'ArrowUp':
        textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
        break;
      case 'ArrowLeft':
        textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
        break;
      case 'ArrowRight':
        textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
        break;
      case 'ArrowDown':
        textarea.setRangeText(element.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
        break;
      default:
        textarea.focus();
    }
  }
}
