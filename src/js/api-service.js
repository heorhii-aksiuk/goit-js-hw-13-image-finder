const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24011643-a99499b85595b827654661749';

export default class ApiService {
  constructor() {
    this._searchQuery = '';
    this._page = 1;
    this._statusCode = 404;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: this._searchQuery,
      page: this._page,
      per_page: 12,
      key: API_KEY,
    });

    const url = `${BASE_URL}/?${searchParams}`;

    const apifetch = await fetch(url);
    this._statusCode = apifetch.status;
    const response = await apifetch.json();
    const { hits } = response;

    return hits;
  }

  get status() {
    return this._statusCode;
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
