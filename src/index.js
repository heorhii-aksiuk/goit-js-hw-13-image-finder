import './sass/main.scss';

import debounce from 'lodash.debounce';

import ApiService from './js/api-service';
import refs from './js/refs'

const { inputEl } = refs;

const apiService = new ApiService();


inputEl.addEventListener('input', debounce(onInputChange, 500))


function onInputChange(event) {
  event.preventDefault()
  apiService.searchQuery = inputEl.value
  apiService.fetchImages();


}


