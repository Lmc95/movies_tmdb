import { appData } from "./data.js";

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
  