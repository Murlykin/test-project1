
// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.default = void 0;
// const localStorageApi = {
//   //Проверяет хранилище по ключу. Возвращает: Пустой массив - если не находит, и Данные - если находит
//   getMovies(key) {
//     const keyStorage = this.load(key);
//     if (Array.isArray(keyStorage)) return keyStorage;
//     this.save(key, []);
//     return [];
//   },

//   //Добавляет фильм : Пушит переданный 'value' в LocalStorage с ключем 'key'
//   addMovie(key, value) {
//     const dataFromLocalStorage = this.load(key);
//     this.save(key, [value, ...dataFromLocalStorage]);
//   },

//   removeMovie(key, value) {
//     const dataFromLocalStorage = this.load(key);
//     const valueIndex = dataFromLocalStorage.indexOf(value);

//     if (0 <= valueIndex) {
//       dataFromLocalStorage.splice(valueIndex, 1);
//       this.save(key, dataFromLocalStorage);
//     }
//   },

//   // Принимает ключ `key` по которому будет произведена выборка.
//   load(key) {
//     try {
//       const serializedState = localStorage.getItem(key);
//       return serializedState === null ? undefined : JSON.parse(serializedState);
//     } catch (err) {
//       console.error('Get state error: ', err);
//     }
//   },

//   // Принимает ключ `key` и значение `value`.
//   save(key, value) {
//     try {
//       const serializedState = JSON.stringify(value);
//       localStorage.setItem(key, serializedState);
//     } catch (err) {
//       console.error('Set state error: ', err);
//     }
//   }

// };
// var _default = localStorageApi;
// exports.default = _default;
// "js/initStorageInModal.js":[function(require,module,exports) {
// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.initStorageBtns = void 0;

// var _localStorageApi = _interopRequireDefault(require("./localStorageApi"));

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const initStorageBtns = () => {
//   const storageEl = document.querySelector('.modal-card .storage');
//   const movieId = document.querySelector('.modal-card').dataset.action;
//   checkStorage(storageEl);
//   storageEl.addEventListener('change', onStorageBtnClick);

//   function onStorageBtnClick(e) {
//     const storageKey = e.target.value;
//     const action = e.target.checked ? 'add' : 'remove';

//     _localStorageApi.default.getMovies(storageKey);

//     makeActionInStorage({
//       storageKey,
//       movieId,
//       action
//     });
//   }

//   function checkStorage(storageEl) {
//     const btnsEl = storageEl.querySelectorAll('[type=checkbox]');
//     btnsEl.forEach(element => {
//       const storageKey = element.value;

//       const arr = _localStorageApi.default.load(storageKey); // console.log(movieId);
//       // console.log(arr.indexOf(movieId));


//       if (0 <= arr.indexOf(movieId)) element.checked = "true";
//     });
//   }
// };

// exports.initStorageBtns = initStorageBtns;

// function makeActionInStorage({
//   storageKey,
//   movieId,
//   action
// }) {
//   if (action === 'add') {
//     _localStorageApi.default.addMovie(storageKey, movieId);

//     changeLibraryCardDisplay('initial');
//   }

//   if (action === 'remove') {
//     _localStorageApi.default.removeMovie(storageKey, movieId);

//     changeLibraryCardDisplay('none');
//   }

//   function changeLibraryCardDisplay(value) {
//     const LibraryCard = document.querySelector("[data-library=\"".concat(storageKey, "\"] [data-action=\"").concat(movieId, "\"]"));
//     if (LibraryCard) LibraryCard.style.display = value;
//   }
// }
// },{"./localStorageApi":"js/localStorageApi.js"}],"js/modalFilmCard.js":[function(require,module,exports) {
// "use strict";

// var _modalFilmCard = _interopRequireDefault(require("../templates/modalFilmCard.hbs"));

// var basicLightbox = _interopRequireWildcard(require("basiclightbox"));

// require("basiclightbox/dist/basicLightbox.min.css");

// var _initStorageInModal = require("./initStorageInModal");

// function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

// function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// //local Storage
// // let page = 1;
// const apiKey = 'd91911ebb88751cf9e5c4b8fdf4412c9';
// const cardFilm = document.querySelector('.card__colection');
// cardFilm.addEventListener('click', openModal);

// function fetchOneMovieInfo(movie_id) {
//   const url = "https://api.themoviedb.org/3/movie/".concat(movie_id, "?api_key=").concat(apiKey);
//   return fetch(url).then(response => response.json()).then(data => ({ ...data,
//     popularity: data.popularity.toFixed(1)
//   }));
// }

// function openModal(e) {
//   e.preventDefault();
//   fetchOneMovieInfo(e.target.dataset.id).then(data => {
//     if (e.target.nodeName !== 'IMG') return;
//     const markup = (0, _modalFilmCard.default)(data);
//     const modal = basicLightbox.create(markup);
//     modal.show();
//     const closeBtn = document.querySelector('.modal-close-btn');
//     closeBtn.addEventListener('click', closeModal);
//     window.addEventListener('keydown', closeModalHandler);

//     function closeModalHandler(e) {
//       if (e.code === 'Escape') {
//         modal.close();
//         window.removeEventListener('keydown', closeModalHandler);
//       }
//     }

//     function closeModal(e) {
//       modal.close();
//       window.removeEventListener('keydown', closeModalHandler);
//     } //new Function


//     (0, _initStorageInModal.initStorageBtns)();
//   }).then(data => {}).catch(error => {
//     console.log('oops!');
//   });
// }
// }
