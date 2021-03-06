const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24011643-a99499b85595b827654661749';

export default class ApiService {
  constructor() {
    this._searchQuery = '';
    this._page = 1;
    this._total = 0;
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

    const apifetch = await fetch(`${BASE_URL}/?${searchParams}`);
    const response = await apifetch.json();
    const { hits } = response;
    this._total = response.total;
    
    return hits;
  }
  
  get searchQuery() {
    return this._searchQuery;
  }
  
  set searchQuery(newQuery) {
    this._searchQuery = newQuery;
  }
  
  get page() {
    return this._page;
  }
  
  nextPage() {
    this._page += 1;
  }
  
  resetPage() {
    this._page = 1;
  }

  get total() {
    return this._total;
  }
}
