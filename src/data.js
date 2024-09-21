// API TMDB
// Esta api solo se utiliza para desarrollo.
const apiKey = '0fd03a39b7ac0b30c7ab5e52ebb50d49';
const urlApi = 'https://api.themoviedb.org/3';
const urlImage = 'http://image.tmdb.org/t/p/w300'
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
// GENRES
const btnGenres = document.getElementById('btn_genres');
const menuGenres = document.querySelector('.menu_genres');
const genreList = document.querySelectorAll('.menu_genres li');
const icoGenre = document.querySelector('#btn_genres i');
// MENU CATEGORY
const btnMenu = document.getElementById('btn_c');
const menu = document.querySelector('.category_items');
const menuList = document.querySelectorAll('.category_items li')
const selectCategory = document.getElementById('category_select');
const icoBtn = document.querySelector('#btn_c i');
// CAROUSEL CATEGORY
const cardBody = document.querySelectorAll('.body_card');

// imagen de prueba.
let image = '/images/images_movies_figma/poster_jw1.webp';


if(!sessionStorage.getItem('categoria')){
    // si no está la categoría creamos una por default "Now playing"
    sessionStorage.setItem('defaultCategory', urlCategory.nowPlaying);
}

// Obtiene lista de películas según la categoría que le pasemos.
const slideMovies = async (category) => {
    try {
        const getMovies = await fetch(`${urlApi}${category}?api_key=${apiKey}`)
        const resMovies = await getMovies.json();

        // Obtiene las primeras 10 películas de la lista.
        const movieListTen = resMovies.results.slice(0, 10);

        cardBody.forEach((card, index) => {
            card.innerHTML = `<img src="${urlImage}${movieListTen[index].poster_path}"><h2>${movieListTen[index].title}</h2>`
        })
        
        
    } catch (error) {
        console.error(error, 'Error en la solicitud.')
    }
}
slideMovies(urlCategory.nowPlaying)


// Función que actualiza el título de la categorya seleccionada.
const updateCategory = (i) => {
    switch (i) {
        case 0:
            console.log('NOW PLAYING')
            selectCategory.textContent = "NOW PLAYING";
            colorCategory(i);
            slideMovies(urlCategory.nowPlaying);
            sessionStorage.setItem('categoria', urlCategory.nowPlaying)
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
// Funciónes para menu GENRE
const abrirGenre = () => {
    menuGenres.classList.add('genres_active');
    icoGenre.classList.add('fa-caret-up');
    icoGenre.classList.remove('fa-caret-down');
}
const cerrarGenre = () => {
    menuGenres.classList.remove('genres_active');
    icoGenre.classList.add('fa-caret-down');
    icoGenre.classList.remove('fa-caret-up');
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
    btnGenres,
    menuGenres,
    genreList,
    icoGenre,
    btnMenu,
    menu,
    menuList,
    selectCategory,
    icoBtn,

    // Funciones.
    updateCategory,
    colorCategory,
    abrirGenre,
    cerrarGenre,
}

export {appData}