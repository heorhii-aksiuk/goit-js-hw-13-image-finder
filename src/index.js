import './sass/main.scss';

import debounce from 'lodash.debounce';

import ApiService from './js/api-service';
import refs from './js/refs';
import cardTemplate from './templates/image-card.hbs';

const { inputEl, gallerySectionEl, buttonEl, listEl } = refs;
listEl.classList.add('gallery');

const apiService = new ApiService();

/*  */

inputEl.addEventListener('input', debounce(onInputChange, 1000));
buttonEl.addEventListener('click', onButtonClick)


function onInputChange(event) {
  event.preventDefault();

  apiService.searchQuery = inputEl.value.trim();
  
  if (!apiService.searchQuery.match(/^[a-zA-Z_ ]*$/) || apiService.searchQuery === '') return;

  gallerySectionEl.appendChild(listEl);
  listEl.innerHTML = '';
  apiService.resetPage()
  createMarkup()
  }

function onButtonClick() {
  apiService.nextPage();
  createMarkup()
}
  
function createMarkup() {
  apiService.fetchImages().then(data => listEl.insertAdjacentHTML('beforeend', cardTemplate(data)));
}