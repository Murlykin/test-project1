
// function setAddToQueueListener() {
//   const addToQueueButtons = document.querySelectorAll('[data-add-to-queue]');

//   addToQueueButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       const filmId = button.getAttribute('data-add-to-queue');
//       const dataToSave = JSON.stringify([filmId]);
      
//       localStorage.setItem('Queue', dataToSave);
//     });
//   });
// }





localStorage.getItem('Queue');
const filmsAsString = localStorage.getItem('Queue');
const filmsIds = JSON.parse(filmsAsString);
filmsIds.forEach(id => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8378c884a6341b6bb6a7cfb362550079`);
});
localStorage.setItem('Queue', ' ');











function addToFilm(e) {

    const cartFilm = getCartFilm() || {}, // получаем данные 
        parentBox = this.data - add - to - queue; // родительский элемент кнопки "Добавить в корзину"
    itemId = this.getAttribute('id'), // ID товара

        function openFilm(e) {
            let cartData = getCartFilm(), // вытаскиваем все данные 
                totalItems = '';
            // если что-то в библеотеке уже есть, начинаем формировать данные для вывода
            if (cartData !== null) {
                totalItems = `<li class="film-list__item">
            <a href="#" class="film-list__link">              
              <img class="film-list__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
              <div class="film-list__box">              
                  <h2 class="film-list__title">${title}</h2>
                  <p class="film-list__genres">${genreArrayShort} <span class="film-list__date"></span>${releaseDate}</p>
              </div>                          
            </a>

            <button data-add-to-queue="${id}">Add to queue</button>
            <button>Add to watched</button>
          </li>`;
                for (let items in cartData) {
                    totalItems += '<tr>';
                    for (let i = 0; i < cartData[items].length; i++) {
                        totalItems += '<td>' + cartData[items][i] + '</td>';
                    }
                    totalItems += '</tr>';
                }
                totalItems += '</table>';
                cartCont.innerHTML = totalItems;
            } else {
                // если в библиотеке пусто, то сигнализируем об этом
                cartCont.innerHTML = 'No films!';
            }
            return false;
        }
}