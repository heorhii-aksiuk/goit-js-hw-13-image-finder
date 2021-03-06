import './sass/main.scss';
import debounce from 'lodash.debounce';
import ApiService from './js/api-service';
import {
  inputEl,
  gallerySectionEl,
  listEl,
  sentinelEl,
  errorTextEl,
  modalEl,
  closeModalBtn,
  moldalImg,
} from './js/refs';
import cardTemplate from './templates/image-card.hbs';

const apiService = new ApiService();
listEl.classList.add('gallery');


inputEl.addEventListener('input', debounce(onInputChange, 500));
listEl.addEventListener('click', openFullImage)
const observer = new IntersectionObserver(onEntry, { rootMargin: '300px' });
observer.observe(sentinelEl);

function onInputChange(event) {
  event.preventDefault();
  listEl.remove();

  apiService.searchQuery = inputEl.value.trim();

  if (!apiService.searchQuery.match(/^[a-zA-Zа-яА-я_ ]*$/) || apiService.searchQuery === '') return;

  gallerySectionEl.appendChild(listEl);
  listEl.innerHTML = '';
  apiService.resetPage();
  createMarkup();
}

async function createMarkup() {
  const nothingFound = 'По этому запросу ничего не найдено';
  errorTextEl.remove();

  try {
    const apiResponse = await apiService.fetchImages();

    if (apiResponse.length !== 0) {
      listEl.insertAdjacentHTML('beforeend', cardTemplate(apiResponse));
    } else if (apiService.total >= 1) {
      return;
    } else {
      throw Error(nothingFound);
    }
  } catch (error) {
    listEl.remove();
    gallerySectionEl.appendChild(errorTextEl);
    createErrorMessage(error, nothingFound);
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

function createErrorMessage(error, nothingFound) {
  const errorText = 'Что-то пошло не так...'
  errorTextEl.innerHTML =
    error.message === nothingFound ? error.message : `${errorText} ${error.message}`;
}

function openFullImage(event) {
  event.preventDefault()
  if (event.target.nodeName !== 'IMG') return;
  openModal(event);
}

function openModal(event) {
  moldalImg.src = event.target.dataset.source;
  modalEl.classList.add('is-open');
  closeModalBtn.addEventListener('click', onCloseBtnClick)
}

function closeModal() {
  modalEl.classList.remove('is-open')
  closeModalBtn.removeEventListener('click', onCloseBtnClick);
}

function onCloseBtnClick() {
  closeModal();
  moldalImg.src = '';
}