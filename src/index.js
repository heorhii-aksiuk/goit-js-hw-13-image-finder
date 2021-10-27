//Project styles
import './sass/main.scss';
//Libs
import debounce from 'lodash.debounce';
//Project files
import ApiService from './js/api-service';
import refs from './js/refs';
import cardTemplate from './templates/image-card.hbs';
//Other setup
const { inputEl, gallerySectionEl, listEl, sentinelEl, errorTextEl } = refs;
listEl.classList.add('gallery');

const apiService = new ApiService();

/*  */

inputEl.addEventListener('input', debounce(onInputChange, 1000));
const observer = new IntersectionObserver(onEntry, { rootMargin: '300px' });
observer.observe(sentinelEl);

function onInputChange(event) {
  event.preventDefault();
  listEl.remove()

  apiService.searchQuery = inputEl.value.trim();

  if (!apiService.searchQuery.match(/^[a-zA-Zа-яА-я_ ]*$/) || apiService.searchQuery === '') return;

  gallerySectionEl.appendChild(listEl);
  listEl.innerHTML = '';
  apiService.resetPage();
  createMarkup();
}

async function createMarkup() {
  errorTextEl.remove()
  try {
    const apiResponse = await apiService.fetchImages();

    if (apiResponse.length !== 0) {
      const markup = listEl.insertAdjacentHTML('beforeend', cardTemplate(apiResponse));
      return markup;

    } else if (apiService.total >= 1) {
      return;

    } else {
      throw Error('По вашему запросу ничего не найдено');
    }

  } catch (error) {
    listEl.remove();
    gallerySectionEl.appendChild(errorTextEl);
    if (error.message === 'По вашему запросу ничего не найдено') {
      errorTextEl.innerHTML = error.message;
    } else {
      errorTextEl.innerHTML = `Что-то пошло не так... ${error.message}.`;
    }
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