import './sass/main.scss';

import debounce from 'lodash.debounce';

import ApiService from './js/api-service';
import refs from './js/refs';
import cardTemplate from './templates/image-card.hbs';

const { inputEl, gallerySectionEl, listEl, sentinelEl } = refs;
listEl.classList.add('gallery');

const apiService = new ApiService();


/*  */


inputEl.addEventListener('input', debounce(onInputChange, 1000));
const observer = new IntersectionObserver(onEntry, { rootMargin: '300px' });
observer.observe(sentinelEl);


function onInputChange(event) {
  event.preventDefault();

  apiService.searchQuery = inputEl.value.trim();

  if (!apiService.searchQuery.match(/^[a-zA-Zа-яА-я_ ]*$/) || apiService.searchQuery === '') return;

  gallerySectionEl.appendChild(listEl);
  listEl.innerHTML = '';
  apiService.resetPage();
  createMarkup();
}


async function createMarkup() {
  try {
    const apiResponse = await apiService.fetchImages();

    if (apiResponse.length !== 0) {
      const markup = listEl.insertAdjacentHTML('beforeend', cardTemplate(apiResponse));
      return markup;

    } else {
     throw Error('По вашему запросу ничего не найдено')
    }
    
  } catch (error) {
    alert(`Ошибка: ${error.message}. Статус запроса: ${apiService.status}`);
  }
}


function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && listEl.hasChildNodes()) {
      apiService.nextPage();
      createMarkup();
    }
  });
}