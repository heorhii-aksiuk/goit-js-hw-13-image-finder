import './sass/main.scss';

import debounce from 'lodash.debounce';

import ApiService from './js/api-service';
import refs from './js/refs'
import galleryTemplate from './templates/images-gallery.hbs'

const { inputEl, gallerySectionEl } = refs;
const apiService = new ApiService();


inputEl.addEventListener('input', debounce(onInputChange, 500))

function onInputChange(event) {
  event.preventDefault()
  apiService.searchQuery = inputEl.value
  apiService.fetchImages().then(data => gallerySectionEl.insertAdjacentHTML('beforeend', galleryTemplate(data)))
}

console.log(galleryTemplate());


