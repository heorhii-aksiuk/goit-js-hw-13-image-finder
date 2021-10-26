import './sass/main.scss';

import debounce from 'lodash.debounce';

import ApiService from './js/api-service';
import refs from './js/refs';
import cardTemplate from './templates/image-card.hbs';

const { bodyEl, inputEl, gallerySectionEl, listEl, sentinelEl } = refs;
listEl.classList.add('gallery');

const apiService = new ApiService();

/*  */

inputEl.addEventListener('input', debounce(onInputChange, 1000));

function onInputChange(event) {
  event.preventDefault();

  apiService.searchQuery = inputEl.value.trim();

  if (!apiService.searchQuery.match(/^[a-zA-Z_ ]*$/) || apiService.searchQuery === '') return;

  gallerySectionEl.appendChild(listEl);
  listEl.innerHTML = '';
  apiService.resetPage();
  createMarkup();
}

function createMarkup() {
  apiService
    .fetchImages()
    .then(data => listEl.insertAdjacentHTML('beforeend', cardTemplate(data)))
    .catch(error => console.log(error));
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && listEl.hasChildNodes()) {
      apiService.nextPage();
      createMarkup();
    }
  });
}

const observer = new IntersectionObserver(onEntry, { rootMargin: '300px' });

observer.observe(sentinelEl);
