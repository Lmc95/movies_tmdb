import { appData } from "./data.js";


new Glider(document.querySelector('.glider'), {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: '.dots',
  arrows: {
    prev: '.btn_prev',
    next: '.btn_next'
  },

  responsive: [
    {
      // screens greater than >= 775px
      breakpoint: 430,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      // screens greater than >= 775px
      breakpoint: 630,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      // screens greater than >= 775px
      breakpoint: 810,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      // screens greater than >= 775px
      breakpoint: 1024,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    }
  ]

});



// Abre o cierra el menu de nav_category (mobile)
appData.btnMenu.addEventListener('click', () => {
  if (!appData.menu.classList.contains('items_active')) {
    // SI NO CONTIENE "items_active"
    appData.menu.classList.add('items_active');
    appData.icoBtn.classList.add('fa-caret-up');
    appData.icoBtn.classList.remove('fa-caret-down');

  } else {
    appData.menu.classList.remove('items_active');
    appData.icoBtn.classList.add('fa-caret-down');
    appData.icoBtn.classList.remove('fa-caret-up');
  }
})

// Actualiza el titulo del contenedor nav_category.
appData.menuList.forEach((item, index) => {
  item.addEventListener('click', () => {
    appData.menu.classList.remove('items_active');
    // En base a la opcion seleccionada se cambiar el titulo por ese nombre.
    appData.updateCategory(index);
  })
})

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
