const refs = {
  inputEl: document.querySelector('input'),
  gallerySectionEl: document.querySelector('.images-gallery-js'),
  listEl: document.createElement('ul'),
  errorTextEl: document.createElement('p'),
  sentinelEl: document.querySelector('.sentinel'),
  modalEl: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('.lightbox__button'),
};

export const { inputEl, gallerySectionEl, listEl, sentinelEl, errorTextEl, modalEl, closeModalBtn } = refs;
