import { appData } from "./data.js";

const resList = document.querySelector('.list_results');
const noResults = document.getElementById('no_results');
const contResults = document.querySelector('.cont_results')
const page = document.getElementById('page_num');
let numP = 1;

const cardsResult = (imgRes, titleRes, raitingRes, timeRes, releaseRes, genreRes, synRes, idRes) => {
  let card = document.createElement('div');
  card.classList.add('card_result');
  card.setAttribute('data-id', idRes);

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
  <li id="raiting_result"><i class="fa-regular fa-star"></i>${raitingRes}</li>
  <li id="time_movie_result"><i class="fa-regular fa-clock"></i>${timeRes}</li>
  <li id="release_result"><i class="fa-regular fa-calendar"></i>${releaseRes}</li>
  <li>|</li>
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
  const apiKey = await appData.fetchApiKey();
  try {
    const getRes = await fetch(`${appData.urlApi}/movie/${resultId}?api_key=${apiKey}`);
    const datRes = await getRes.json();

    let genresResult = '';
    datRes.genres.forEach(genre => {
      genresResult += genre.name + " - ";
    })

    cardsResult(
      'http://image.tmdb.org/t/p/w300' + datRes.poster_path, datRes.title, Math.round(datRes.vote_average), `${Math.floor(datRes.runtime / 60)}h:${(datRes.runtime % 60).toString().padStart(2, 0)}m`, datRes.release_date.slice(0, 4), genresResult.slice(0, -2), datRes.overview, resultId);

  } catch (error) {
    console.error(error, 'Error al obtener los detalles de los resultados')
  }
}

// CREAR funcion que obtenga los resultados de busqueda.
const getResultMovie = async (movie, pageNum) => {
  const apiKey = await appData.fetchApiKey();
  try {
    const getResult = await fetch(`${appData.urlApi}/search/movie?query=${movie}&api_key=${apiKey}&page=${pageNum}`);
    const dataResult = await getResult.json();

    console.log(dataResult);
    let resultList = [];
    
    // Muestra un mensaje de "resultados no encontrados"
    if (dataResult.results.length > 0) {
      noResults.style.display = 'none';
      // Crear cartas dinamicamente
      dataResult.results.forEach(result => {
        // Se filtra que solo las películas con info sean almacenadas en un array.
        if(!result.backdrop_path || result.video){
          //
        }else {
          resultList.push(result.id)
          console.log(result.id)
        }
      });

      // Se cargan las películas que fueron almacenadas anteriormente
      resultList.forEach(item => {
        detailResult(item)
      })


    } else {
      noResults.style.display = 'block';
      document.getElementById('no_results_search').textContent = movie;
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


const movie1 = async (idMovie) => {
  try {
    
    const getVideo = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${apiKey}&language=en-US`)
    const resVideo = await getVideo.json();

    console.log(resVideo);

    // EJEMPLO:
    // url de trailer para mostrar
    console.log(`https://www.youtube.com/watch?v=${resVideo.results[0].key}`)

  } catch (error) {
    console.error(error, 'Error al obtener video de película')
  }
}

resList.addEventListener('click', (e) => {
  const cardM = e.target.closest('.card_result');
  
  if(cardM) {
    const cardId = cardM.getAttribute('data-id');
    console.log('click en card');

    movie1(cardId);

    // Guardar id de película y redireccionar a la página de la misma.
    sessionStorage.setItem('idMovie', cardId);
    // redireccionar a página
    window.location.href = './movie.html'
  }
})


appData.btnHeader.addEventListener('click', () => {
  if (!appData.menuHeader.classList.contains('menu_active')) {
    appData.openMenu();
    document.body.style.overflow = 'hidden';
  } else {
    appData.openMenu();
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
appData.btnSearch.addEventListener('click', (e) => {
  appData.searchON(e);
  console.log('Cargando...')
    setTimeout(() => {
      location.reload();
    }, 2000);
})

appData.searchMovie.addEventListener('keypress', (e) => {
  appData.searchON(e);

  // En caso de usar el buscador desde esta página se recargara.
  if (e.key == 'Enter') {
    // mostrar "cargando..." y luego redireccionamos ya con los datos cargados.
    console.log('Cargando...')
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
})
