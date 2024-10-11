import { appData } from "./data.js";

const resList = document.querySelector('.list_results');
const noResults = document.getElementById('no_results');
const contResults = document.querySelector('.cont_results')
const page = document.getElementById('page_num');
let numP = 1;

const cardsResult = (imgRes, titleRes, raitingRes, timeRes, releaseRes, genreRes, synRes) => {
  let card = document.createElement('div');
  card.classList.add('card_result');

  let figureResult = document.createElement('figure');
  figureResult.id = 'img_card_result';
  if (imgRes == 'http://image.tmdb.org/t/p/w300' + 'null') {
    figureResult.innerHTML = '<img src="/images/not_image.png">';
  } else {
    figureResult.innerHTML = `<img src="${imgRes}">`;
  }
  card.appendChild(figureResult);

  let infoResult = document.createElement('div');
  infoResult.classList.add('info_card_result');
  card.appendChild(infoResult);

  let h2Result = document.createElement('h2');
  h2Result.id = 'title_movie_result'
  h2Result.textContent = titleRes;
  infoResult.appendChild(h2Result);

  let ulDetailsResult = document.createElement('ul');
  ulDetailsResult.classList.add('details_movie_result');
  ulDetailsResult.innerHTML = `
  <li id="raiting_result">${raitingRes}</li>
  <li id="time_movie_result">${timeRes}</li>
  <li id="release_result">${releaseRes}</li>
  <li id="genre_movie_result">${genreRes}</li>`;
  infoResult.appendChild(ulDetailsResult);

  let pSynopsisResult = document.createElement('p');
  pSynopsisResult.id = 'synopsis_movie_result';
  pSynopsisResult.textContent = synRes;
  infoResult.appendChild(pSynopsisResult);

  let btnResult = document.createElement('button');
  btnResult.id = 'view_movie_result';
  btnResult.textContent = 'View movie';
  infoResult.appendChild(btnResult);

  resList.appendChild(card);

}

const detailResult = async (resultId) => {
  try {
    const getRes = await fetch(`${appData.urlApi}/movie/${resultId}?api_key=${appData.apiKey}`);
    const datRes = await getRes.json();

    let genresResult = '';
    datRes.genres.forEach(genre => {
      genresResult += genre.name + " - ";
    })

    cardsResult(
      'http://image.tmdb.org/t/p/w300' + datRes.poster_path, datRes.title, Math.round(datRes.vote_average), `${Math.floor(datRes.runtime / 60)}h:${(datRes.runtime % 60).toString().padStart(2, 0)}m`, datRes.release_date.slice(0, 4), genresResult.slice(0, -2), datRes.overview
    )

  } catch (error) {
    console.error(error, 'Error al obtener los detalles de los resultados')
  }
}

// CREAR funcion que obtenga los resultados de busqueda.
const getResultMovie = async (movie, pageNum) => {
  try {
    const getResult = await fetch(`${appData.urlApi}/search/movie?query=${movie}&api_key=${appData.apiKey}&page=${pageNum}`);
    const dataResult = await getResult.json();

    console.log(dataResult);

    if (dataResult.results.length > 0) {
      noResults.style.display = 'none';
      // Crear cartas dinamicamente
      dataResult.results.forEach(result => {
        detailResult(result.id)
        console.log(result.id)
      });
    } else {
      noResults.style.display = 'block';
    }

    // Botón "Mostrar más películas".
    if(numP == dataResult.total_pages) {
      page.style.display = 'none'
    }else {
      page.style.display = 'block'
    }


  } catch (error) {
    console.error(error, 'Error al obtener los resultados.')
  }
}

// Carga de datos en grid con tiempo de espera.
const cargar = (nP) => {
  if (sessionStorage.getItem('search')) {
    // mostrar "cargando..."
    console.log('Cargando películas...')
    // hacer petición.
    document.getElementById('title_result').textContent = sessionStorage.getItem('search');
    getResultMovie(sessionStorage.getItem('search'), nP);
    // tiempo de espera para que carguen las películas.
    setTimeout(() => {
      console.log('Películas cargadas con exito.')
      contResults.style.opacity = '1';
    }, 2000);
  }
}
cargar(numP)

appData.btnHeader.addEventListener('click', () => {
  // ESTAS CONDICIONES DEBEN IR EN DATA.JS Y LLAMARLAS EN CADA PAGINA
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

page.addEventListener('click', () => {
  // CREAR PAGINACIÓN SIMPLE "Cargar mas".
  console.log('CLICK')
  numP++;
  cargar(numP);
})

// EVENT: buscador de películas por nombre.
appData.searchMovie.addEventListener('keypress', (e) => {
  appData.searchON(e);

  // En caso de usar el buscador desde esta página se recargara.
  if (e.key == 'Enter') {
    let number = 1;
    // mostrar "cargando..." y luego redireccionamos ya con los datos cargados.
    console.log('Cargando...')
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
})
