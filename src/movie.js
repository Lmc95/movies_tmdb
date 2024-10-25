import { appData } from "./data.js";

const idMovieStorage = sessionStorage.getItem('idMovie');
const moviePlay = document.querySelector('.cont_movie_play');

const movieCard = (posterM, titleM, raitingM, timeM, releaseM, genreM, synM, trailerKey) => {
    let cardM = document.createElement('div');
    cardM.classList.add('card_movie_play');

    let imageM = '';
    if (posterM == 'http://image.tmdb.org/t/p/w300' + 'null') {
        imageM = "/images/not_image.png";
    } else {
        imageM = posterM;
    }

    cardM.innerHTML = `
    <figure class="img_movie_play"><img src="${imageM}"></img></figure>
    <div class="cont_title_play">
        <h2 id="title_play">${titleM}</h2>
        <div class="info_play">
            <p id="raiting_play"><i class="fa-regular fa-star"></i>${raitingM}/10</p>
            <p id="time_play"><i class="fa-regular fa-clock"></i>${timeM}</p>
            <p id="release_play"><i class="fa-regular fa-calendar"></i>${releaseM}</p>
        </div>
        <p id="genre_play">Genres: <span>${genreM}</span></p>
    </div>
    <div class="cont_synopsis_play">
        <p id="synopsis_play">${synM}</p>

        <div class="btn_play_trailer">
            <button>
                <i id="ico_play" class="fa-regular fa-circle-play"></i>PLAY
            </button>
            <a id="trailer_play" href="#">TRAILER</a>
        </div>
    </div>
    `;

    let contIframe = document.createElement('div');
    contIframe.classList.add('cont_video');
    let iframeM = document.createElement('iframe');
    iframeM.src = `https://www.youtube.com/embed/${trailerKey}`;
    iframeM.title = titleM;
    iframeM.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframeM.referrerPolicy = "strict-origin-when-cross-origin";
    contIframe.appendChild(iframeM);
    
    moviePlay.appendChild(cardM);
    moviePlay.appendChild(contIframe);
}

const movie = async (idMovie) => {
    try {
        const getMovie = await fetch(`${appData.urlApi}/movie/${idMovie}?api_key=${appData.apiKey}`);
        const resMovie = await getMovie.json();
        console.log(resMovie);

        // Obtenemos los videos de la película.
        const getMovieVideo = await fetch(`${appData.urlApi}/movie/${idMovie}/videos?api_key=${appData.apiKey}`);
        const resMovieVideo = await getMovieVideo.json();
        console.log(resMovieVideo.results);

        let listTrailers = [];
        resMovieVideo.results.forEach(item => {
            if (item.site == 'YouTube' && item.type == 'Trailer') {
                listTrailers.push(item);
            }
        })
        listTrailers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

        let bgMovie = document.createElement('img');
        bgMovie.src = `http://image.tmdb.org/t/p/w1280${resMovie.backdrop_path}`;
        document.querySelector('.bg_main_play').appendChild(bgMovie);

        let genresMovie = '';
        resMovie.genres.forEach(genre => {
            genresMovie += genre.name + " - ";
        })

        movieCard('http://image.tmdb.org/t/p/w300' + resMovie.poster_path, resMovie.title, parseFloat(resMovie.vote_average.toFixed(1)), `${Math.floor(resMovie.runtime / 60)}h:${(resMovie.runtime % 60).toString().padStart(2, 0)}m`, resMovie.release_date.slice(0, 4), genresMovie.slice(0, -2), resMovie.overview, listTrailers[0].key)


    } catch (error) {
        console.error(error, 'Error al obtener la película.')
    }
}

if (idMovieStorage) {
    movie(idMovieStorage);
}

// EVENT: abrir o cerrar menu del header (solo movil).
appData.btnHeader.addEventListener('click', () => {
    if (!appData.menuHeader.classList.contains('menu_active')) {
        appData.openMenu();
        document.body.style.overflow = 'hidden';
    } else {
        appData.closeMenu();
        document.body.style.overflow = 'auto';
    }
})

// EVENT: buscador de películas por nombre.
appData.btnSearch.addEventListener('click', (e) => {
    appData.searchON(e);
    window.location.href = './resultsSearch.html'
})
appData.searchMovie.addEventListener('keypress', (e) => {
    appData.searchON(e);
    if (e.key == 'Enter') {
        window.location.href = './resultsSearch.html'
    }
})