import './style.scss';
import { createDomNode } from './utils/utils';
import { Keybord } from './components/Keybord';
import { LETTERSru, LETTERSen } from './utils/letters';
import { keys } from './utils/keys';

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
language.innerText = 'Для переключения языка комбинация Ctrl + Alt';

document.body.append(main);
main.append(virtualKeybord);
virtualKeybord.append(textarea);
virtualKeybord.append(keybord);
main.append(description);
main.append(language);
const virtualKeys = document.querySelectorAll('.key');

window.onload = function onload() {
  addVirtualKeyMouseDownHandler();
  addKeydownHandler();
  addMouseUpHandler();
  document.addEventListener('keydown', changeLanguage);
};

function addVirtualKeyMouseDownHandler() {
  let key = '';
  keybord.addEventListener('mousedown', (event) => {
    event.preventDefault();
    key = event.target;
    if (key.classList.contains('key')) {
      keybord.dataset.key = key.dataset.code;
      highlightKey(key);
      print(event);
    }
  });
}
function addKeydownHandler() {
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

function print(event) {
  const element = event.target;
  if (event.shiftKey) {
    applyShiftKey(event);
    document.addEventListener('mouseover', applyShiftKey);
    document.addEventListener('mouseout', cancelShiftKey);
    document.addEventListener('click', turnOffShift);
  }
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
        keybord.classList.toggle('caps-lock');
        virtualKeys.forEach((el) => {
          if (!el.classList.contains('key_dark')) {
            el.classList.toggle('key_upperCase');
          }
        });
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

function addMouseUpHandler() {
  document.addEventListener('mouseup', onMouseup);
}
function onMouseup(event) {
  let elem = '';
  virtualKeys.forEach((el) => {
    if (el.dataset.code === keybord.dataset.key) {
      elem = el;
      if (event.target.dataset.code !== elem.dataset.code) {
        if (elem.dataset.code === 'ShiftLeft' || elem.dataset.code === 'ShiftRight') {
          keybord.dataset.shiftKey = 'true';
          highlightKey(elem);
          applyShiftKey(event);
          document.addEventListener('mouseover', applyShiftKey);
          document.addEventListener('mouseout', cancelShiftKey);
          document.addEventListener('click', turnOffShift);
        } else if (elem.dataset.code === 'ControlLeft' || elem.dataset.code === 'ControlRight') {
          highlightKey(elem);
          document.addEventListener('click', changeLanguage);
        }
      } else {
        removeHighlight(el);
      }
    }
  });
}
function applyShiftKey(event) {
  if ((event.shiftKey || keybord.dataset.shiftKey === 'true') && isChar(event)) {
    if (isLetter(event)) {
      if (keybord.classList.contains('caps-lock')) {
        event.target.classList.remove('key_upperCase');
      } else {
        event.target.classList.add('key_upperCase');
      }
    } else {
      const key = findObjKey(event);
      if (keybord.dataset.language === 'ru') {
        event.target.innerText = key[1].shiftRu;
      } else {
        event.target.innerText = key[1].shiftEn;
      }
    }
  }
}

function cancelShiftKey(event) {
  if (isChar(event)) {
    if (isLetter(event)) {
      if (!keybord.classList.contains('caps-lock')) {
        event.target.classList.remove('key_upperCase');
      } else {
        event.target.classList.add('key_upperCase');
      }
    } else {
      const key = findObjKey(event);
      if (keybord.dataset.language === 'ru') {
        event.target.innerText = key[1].charRu;
      } else {
        event.target.innerText = key[1].charEn;
      }
    }
  }
}
function turnOffShift(event) {
  if ((event.target.dataset.code === 'ShiftLeft' || event.target.dataset.code === 'ShiftRight') && keybord.dataset.shiftKey === 'true') {
    keybord.removeEventListener('mouseover', applyShiftKey);
    keybord.removeEventListener('mouseout', cancelShiftKey);
    keybord.removeEventListener('click', turnOffShift);
    removeHighlight(event.target);
    keybord.dataset.shiftKey = 'false';
  }
}

function changeLanguage(event) {
  if (event.target.dataset.code === 'AltLeft' || event.target.dataset.code === 'AltRight' || (event.altKey && event.ctrlKey)) {
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
function getLanguage() {
  return localStorage.getItem('lang');
}

function isChar(event) {
  return (event.target.classList.contains('key') && !event.target.classList.contains('key_dark'));
}
function isLetter(event) {
  return (event.target.dataset.code.startsWith('Key'));
}
function findObjKey(event) {
  return Object.entries(keys).find((el) => el[0] === event.target.dataset.code);
}

function highlightKey(element) {
  element.classList.add('key-push');
}
function removeHighlight(element) {
  element.classList.remove('key-push');
}
