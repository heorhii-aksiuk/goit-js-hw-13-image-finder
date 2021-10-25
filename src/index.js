import './sass/main.scss';

import debounce from 'lodash.debounce';

import ApiService from './js/api-service';
import refs from './js/refs'
import cardTemplate from './templates/image-card.hbs'

const { inputEl, gallerySectionEl, listEl } = refs;
listEl.classList.add('gallery');

const apiService = new ApiService();



inputEl.addEventListener('input', debounce(onInputChange, 500))

function onInputChange(event) {
  event.preventDefault()
  apiService.searchQuery = inputEl.value
  gallerySectionEl.appendChild(listEl);
  apiService.fetchImages().then(data => listEl.insertAdjacentHTML('beforeend', cardTemplate(data)));
}


