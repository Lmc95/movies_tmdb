import { appData } from "./data.js";

const titleGrid = document.getElementById('title_grid');
const gridViewAll = document.querySelector('.grid_movies_all');

// Paginación
const numPage = document.querySelector('.num_page');
const totalPages = document.getElementById('total_pages');
const btnBack = document.getElementById('btn_back');
const btnNext = document.getElementById('btn_next');
let currentPage = 1;


let storageCategory;

// Si no está la key categoria se mostrara por default "now playing" caso contrario se mostrara la categoria seleccionada anteriormente en "index.html"
if (!sessionStorage.getItem('categoria')) {
  storageCategory = sessionStorage.getItem('defaultCategory');
} else {
  storageCategory = sessionStorage.getItem('categoria');
}


// Actualiza el título del grid viewAll.
switch (storageCategory) {
  case appData.urlCategory.nowPlaying:
    titleGrid.textContent = 'NOW PLAYING';
    break;
  case appData.urlCategory.popular:
    titleGrid.textContent = 'POPULAR';
    break;
  case appData.urlCategory.topRated:
    titleGrid.textContent = 'TOP RATED';
    break;
  case appData.urlCategory.upcoming:
    titleGrid.textContent = 'UPCOMING';
    break;
  default:
    console.log('Error categoria no disponible.')
    break;
}

const pagination = () => {
  numPage.textContent = currentPage;
  setTimeout(() => {
    gridViewAll.innerHTML = '';
    viewAllCategory();
  }, 500);
}

// Validar urls, le pasaremos la categoria que se encuentra en el sessionStorage.
const validUrl = (urlCategory) => {
  const urls = [appData.urlCategory.nowPlaying, appData.urlCategory.popular, appData.urlCategory.topRated, appData.urlCategory.upcoming];
  return urls.includes(urlCategory);
}

// Crear carta
const createCardGrid = (imgMovie, titleMovie, raitingMovie, releaseMovie, sypMovie) => {
  let cardMovie = document.createElement('div');
  cardMovie.classList.add('card_movie');

  // Info movie
  let infoCardMovie = document.createElement('div');
  infoCardMovie.classList.add('card_info_movie');
  infoCardMovie.innerHTML = `
  <ul>
  <li id="raiting_movie_card"><i class="fa-regular fa-star"></i>${raitingMovie}/10</li>
  <li id="release_movie_card"><i class="fa-regular fa-calendar"></i>${releaseMovie}</li>
  </ul>
  <p id="sypnosis_movie_card">${sypMovie}</p>
  `

  let cardBodyMovie = document.createElement('div');
  cardBodyMovie.classList.add('card_body_movie');
  cardMovie.appendChild(cardBodyMovie);
  cardBodyMovie.appendChild(infoCardMovie);

  let cardImgBody = document.createElement('img');
  if (imgMovie == appData.urlImage + 'null') {
    cardImgBody.src = '/images/not_image.svg';
  } else {
    cardImgBody.src = imgMovie;
  }
  cardBodyMovie.appendChild(cardImgBody);

  let cardMovieH2 = document.createElement('h2');
  cardMovieH2.textContent = titleMovie
  cardMovie.appendChild(cardMovieH2);

  gridViewAll.appendChild(cardMovie);
}

const viewAllCategory = async () => {
  console.log(storageCategory);
  try {
    const testCategory = await fetch(`${appData.urlApi}${storageCategory}?api_key=${appData.apiKey}&language=es-ES&page=${currentPage}`)
    const resTest = await testCategory.json();
    console.log(resTest);

    numPage.textContent = currentPage;

    // Límite de 500 páginas, (A revisar si hay manera de cambiar el límite de 500)
    if(resTest.total_pages > 500) {
      totalPages.textContent = 500;
    }else {
      totalPages.textContent = resTest.total_pages;
    }

    if (currentPage == 1) {
      btnBack.disabled = true;
      console.log('BACK OFF')
    } else {
      btnBack.disabled = false;
      console.log('BACK ON')
    }

    if (currentPage >= resTest.total_pages) {
      btnNext.disabled = true;
      console.log('NEXT OFF')
    } else {
      btnNext.disabled = false;
      console.log('NEXT ON')
    }

    resTest.results.forEach((movie, index) => {
      createCardGrid(appData.urlImage + movie.poster_path, movie.title, Math.round(movie.vote_average), movie.release_date.slice(0, 4), movie.overview);
    })


  } catch (error) {
    console.error(error, 'Error en la solicitud de la categoría seleccionada.')
  }
}


// Verificar si la url es válida, de no serlo se mostrara ERROR.
if (validUrl(storageCategory)) {
  // Una espera para cargar el grid
  setTimeout(() => {
    viewAllCategory();
  }, 1000);
} else {
  console.log('ERROR: url no válida.')
}


// EVENT: abrir o cerrar menu del header (solo movil).
appData.btnHeader.addEventListener('click', () => {
  if (!appData.menuHeader.classList.contains('menu_active')) {
    appData.menuHeader.classList.add('menu_active');
    appData.barsHeader.classList.remove('fa-bars');
    appData.barsHeader.classList.add('fa-xmark');
    appData.searchHeader.classList.add('search_active');
    document.body.style.overflow = 'hidden';
  } else {
    appData.menuHeader.classList.remove('menu_active');
    appData.barsHeader.classList.remove('fa-xmark');
    appData.barsHeader.classList.add('fa-bars');
    appData.searchHeader.classList.remove('search_active');
    document.body.style.overflow = 'auto';
  }
})


// EVENT: abrir o cerrar menu de la opcion GENRE.
appData.btnGenres.addEventListener('click', () => {
  if (!appData.menuGenres.classList.contains('genres_active')) {
    appData.abrirGenre();
  } else {
    appData.cerrarGenre();
  }
})

appData.genreList.forEach(item => {
  item.addEventListener('click', () => {
    appData.cerrarGenre();
  })
})

const valueSearchPage = document.querySelector('.search_page');
const btnSearchPage = document.getElementById('btn_num_page');

// EVENT: cambiar página anterior y siguiente.
btnBack.addEventListener('click', () => {
  currentPage--;
  pagination();
})
btnNext.addEventListener('click', () => {
  currentPage++;
  pagination();
})

// EVENT: filtrar página ingresando un número.
btnSearchPage.addEventListener('click', () => {
  let pageValue = parseInt(valueSearchPage.value);
  valueSearchPage.value = '';
  currentPage = pageValue;
  pagination();
})
valueSearchPage.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    let pageValue = parseInt(valueSearchPage.value);
    valueSearchPage.value = '';
    currentPage = pageValue;
    pagination();
  }
})

