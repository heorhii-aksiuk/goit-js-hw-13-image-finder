const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24011643-a99499b85595b827654661749';

export default class ApiService {
  constructor() {
    this._searchQuery = '';
    this._page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url).then(response => response.json()).then( ({hits}) => hits)
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(newQuery) {
    this._searchQuery = newQuery;
  }

  nextPage() {
    this._page += 1;
  }

  resetPage() {
    this._page = 1;
  }
}
