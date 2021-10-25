import './sass/main.scss';

import debounce from 'lodash.debounce';

import ApiService from './js/api-service';
import refs from './js/refs';
import cardTemplate from './templates/image-card.hbs';

const { bodyEl, inputEl, gallerySectionEl, listEl } = refs;
listEl.classList.add('gallery');

const apiService = new ApiService();

/*  */

inputEl.addEventListener('input', debounce(onInputChange, 1000));
window.addEventListener('scroll', onScroll)


function onInputChange(event) {
  event.preventDefault();
  
  apiService.searchQuery = inputEl.value.trim();
  
  if (!apiService.searchQuery.match(/^[a-zA-Z_ ]*$/) || apiService.searchQuery === '') return;
  
  gallerySectionEl.appendChild(listEl);
  listEl.innerHTML = '';
  apiService.resetPage()
  createMarkup()
}

function onScroll() {
  let contentHeight = bodyEl.offsetHeight;
  let currentPosition = window.pageYOffset + window.innerHeight;

  if (currentPosition >= contentHeight) {
    apiService.nextPage();
    createMarkup();
  }
}
  
function createMarkup() {
  apiService.fetchImages().then(data => listEl.insertAdjacentHTML('beforeend', cardTemplate(data)));
}