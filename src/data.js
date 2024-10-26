// API TMDB
let apiKey;

function fetchApiKey() {
    if (!apiKey) {
        apiKey = fetch('/.netlify/functions/envNetlify')
            .then(response => response.json())
            .then(data => data.api_Key)
            .catch(error => {
                console.error('Error fetching the API key:', error);
                return null;
            });
    }
    return apiKey;
}
fetchApiKey();
// Esta api solo se utiliza para desarrollo.
// const apiKey = '0fd03a39b7ac0b30c7ab5e52ebb50d49';
const urlApi = 'https://api.themoviedb.org/3';
const urlImage = 'http://image.tmdb.org/t/p/w500'
const urlCategory = {
    nowPlaying: '/movie/now_playing',
    popular: '/movie/popular',
    topRated: '/movie/top_rated',
    upcoming: '/movie/upcoming'
}
// MENU HEADER
const menuHeader = document.querySelector('.menu_header');
const btnHeader = document.getElementById('btn_header');
const barsHeader = document.querySelector('#btn_header i');
// SEARCH HEADER
const searchHeader = document.querySelector('.search_header');
const searchMovie = document.getElementById('search');
const btnSearch = document.getElementById('btn_search_header');
// HOME MOVIE bg
const bgHome = document.querySelector('.bg_main');
const cardBgHome = document.querySelector('.cont_bg_main');
const titleHomeMovie = document.getElementById('title_movie_bg');
const raitingHomeMovie = document.getElementById('raiting');
const timeHomeMovie = document.getElementById('time_movie');
const releaseHomeMovie = document.getElementById('release');
const genreHomeMovie = document.getElementById('genre_movie_bg');
const synopsisHomeMovie = document.getElementById('synopsis_movie_bg');
const btnPlayBg = document.getElementById('btn_play_movie_bg');
const btnTrailerBg = document.getElementById('btn_play_trailer_bg');
// MENU CATEGORY
const btnMenu = document.getElementById('btn_c');
const menu = document.querySelector('.category_items');
const menuList = document.querySelectorAll('.category_items li')
const selectCategory = document.getElementById('category_select');
const icoBtn = document.querySelector('#btn_c i');
// CAROUSEL CATEGORY
const cardBody = document.querySelectorAll('.body_card');
const cardMovie = document.querySelectorAll('.card');
// GRID VIEWALL
const titleGrid = document.getElementById('title_grid');
const gridViewAll = document.querySelector('.grid_movies_all');
const cardV = document.querySelectorAll('.card_movie');
// Paginación
const numPage = document.querySelector('.num_page');
const totalPages = document.getElementById('total_pages');
const btnBack = document.getElementById('btn_back');
const btnNext = document.getElementById('btn_next');
// Cards RESULTS
const listResults = document.querySelector('.list_result');

if (!sessionStorage.getItem('categoria')) {
    // si no está la categoría creamos una por default "Now playing"
    sessionStorage.setItem('defaultCategory', urlCategory.nowPlaying);
}

const openMenu = () => {
    menuHeader.classList.add('menu_active');
    barsHeader.classList.remove('fa-bars');
    barsHeader.classList.add('fa-xmark');
    searchHeader.classList.add('search_active');
    document.body.style.overflow = 'hidden';
}

const closeMenu = () => {
    menuHeader.classList.remove('menu_active');
    barsHeader.classList.remove('fa-xmark');
    barsHeader.classList.add('fa-bars');
    searchHeader.classList.remove('search_active');
    document.body.style.overflow = 'auto';
}

const bgMovie = async () => {
    try {
        const getBg = await fetch(`${urlApi}/movie/popular?api_key=${apiKey}&page=1`);
        const resBg = await getBg.json();
        const resultMovie = resBg.results[0];

        if (resBg) {
            const detailsMovie = await fetch(`${urlApi}/movie/${resultMovie.id}?api_key=${apiKey}`);
            const resDetailsMovie = await detailsMovie.json();
            console.log(resDetailsMovie);

            cardBgHome.setAttribute('data-id', resDetailsMovie.id);

            let bgImg = document.createElement('img');
            bgImg.src = `http://image.tmdb.org/t/p/w1280${resDetailsMovie.backdrop_path}`;
            bgHome.appendChild(bgImg);

            titleHomeMovie.textContent = resDetailsMovie.title;
            raitingHomeMovie.innerHTML = `<i class="fa-regular fa-star"></i>${parseFloat(resDetailsMovie.vote_average).toFixed(1)}/10`;

            timeHomeMovie.innerHTML = `<i class="fa-regular fa-clock"></i>${Math.floor(resDetailsMovie.runtime / 60)}h:${(resDetailsMovie.runtime % 60).toString().padStart(2, 0)}m`;

            releaseHomeMovie.innerHTML = `<i class="fa-regular fa-calendar"></i>${resDetailsMovie.release_date.slice(0, 4)}`;

            let genres = '';
            resDetailsMovie.genres.forEach(genre => {
                genres += genre.name + " - ";
            })
            genreHomeMovie.textContent = genres.slice(0, -2);

            synopsisHomeMovie.textContent = resDetailsMovie.overview;

        }


    } catch (error) {
        console.error(error, 'Error al obtener el background inicial.')
    }
}

// Obtiene lista de películas según la categoría que le pasemos.
const slideMovies = async (category) => {
    try {
        const getMovies = await fetch(`${urlApi}${category}?api_key=${apiKey}`)
        const resMovies = await getMovies.json();

        // Obtiene las primeras 10 películas de la lista.
        const movieListTen = resMovies.results.slice(0, 10);
        console.log(movieListTen)

        cardBody.forEach((card, index) => {
            card.innerHTML = `
            <div class="info_card">
            <ul>
            <li id="raiting_movie_card"><i class="fa-regular fa-star"></i>${Math.round(movieListTen[index].vote_average)}/10</li>
            <li id="release_movie_card"><i class="fa-regular fa-calendar"></i>${movieListTen[index].release_date.slice(0, 4)}</li>
            </ul>
            <p id="sypnosis_movie_card">${movieListTen[index].overview}</p>
            </div>
            <img src="${urlImage}${movieListTen[index].poster_path}">
            <h2>${movieListTen[index].title}</h2>
            `

            // Se agrega la id de la pelicula al contenedor de cada card.
            cardMovie[index].setAttribute('data-id', movieListTen[index].id);
        })


    } catch (error) {
        console.error(error, 'Error en la solicitud.')
    }
}
slideMovies(urlCategory.nowPlaying)

const searchingMovie = async (userMovie) => {
    try {
        const movieS = await fetch(`${urlApi}/search/movie?query=${userMovie}&api_key=${apiKey}&page=1`);
        const resMovieS = await movieS.json();
        console.log(resMovieS);


    } catch (error) {
        console.error(error, 'Error en la búsqueda.')
    }
}

// Función que actualiza el título de la categorya seleccionada.
const updateCategory = (i) => {
    switch (i) {
        case 0:
            console.log('NOW PLAYING')
            selectCategory.textContent = "NOW PLAYING";
            colorCategory(i);
            slideMovies(urlCategory.nowPlaying);
            sessionStorage.setItem('categoria', urlCategory.nowPlaying);
            break;
        case 1:
            console.log('POPULAR')
            selectCategory.textContent = "POPULAR";
            colorCategory(i);
            slideMovies(urlCategory.popular);
            sessionStorage.setItem('categoria', urlCategory.popular)
            break;
        case 2:
            console.log('TOP RATED')
            selectCategory.textContent = "TOP RATED";
            colorCategory(i);
            slideMovies(urlCategory.topRated);
            sessionStorage.setItem('categoria', urlCategory.topRated)
            break;
        case 3:
            console.log('UPCOMING')
            selectCategory.textContent = "UPCOMING";
            colorCategory(i);
            slideMovies(urlCategory.upcoming);
            sessionStorage.setItem('categoria', urlCategory.upcoming)
            break;
        default:
            break;
    }
}

// función que ctualiza el color de los titulos de nav_category dependiendo cual este seleccionado.
const colorCategory = (c) => {
    menuList.forEach((item, index) => {
        if (index != c) {
            item.style.color = '#DDDDDD';
            item.classList.remove('items_after');
        } else {
            item.style.color = '#1F9BE8';
            item.classList.add('items_after');
        }
    })
}

const searchON = (element) => {
    if (element.key == 'Enter') {
        console.log('SEACHR ON')
        let valueSearch = searchMovie.value;
        console.log(valueSearch)
        searchingMovie(valueSearch);
        searchMovie.value = '';
        closeMenu();
        // Enviar el valor del input al sessionStorage
        sessionStorage.setItem('search', valueSearch)
        // REDIRECCIONAR a la página que muestra los resultados de la búsqueda.
    }
}


const appData = {
    // Api.
    apiKey,
    urlApi,
    urlCategory,
    urlImage,
    // Variables.
    menuHeader,
    btnHeader,
    barsHeader,
    searchHeader,
    searchMovie,
    btnSearch,
    btnMenu,
    menu,
    menuList,
    selectCategory,
    icoBtn,
    titleGrid,
    gridViewAll,
    numPage,
    totalPages,
    btnBack,
    btnNext,
    listResults,
    cardMovie,
    btnPlayBg,
    btnTrailerBg,
    cardBgHome,
    cardV,


    // Funciones.
    updateCategory,
    colorCategory,
    searchingMovie,
    searchON,
    bgMovie,
    openMenu,
    closeMenu,
    fetchApiKey
}

export { appData }