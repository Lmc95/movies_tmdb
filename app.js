import { appData } from "./src/data.js";

const contGlider = new Glider(document.querySelector('.glider'), {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: '.dots',
  arrows: {
    prev: '.btn_prev',
    next: '.btn_next'
  },

  responsive: [
    {
      // screens greater than >= 430px
      breakpoint: 430,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      // screens greater than >= 630px
      breakpoint: 630,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      // screens greater than >= 810px
      breakpoint: 810,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      // screens greater than >= 1024px
      breakpoint: 1024,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    },
    {
      // screens greater than >= 1200px
      breakpoint: 1200,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 6,
        slidesToScroll: 6,
      }
    }
  ]

});

// Carga el background en la pagina Home.
appData.bgMovie();

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

    if (contGlider) {
      contGlider.scrollItem(0);
    } else {
      console.error(error);
    }
  })
})

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
appData.searchMovie.addEventListener('keypress', (e) => {
  appData.searchON(e);
  // REDIRECCIONAR a la página que muestra los resultados de la búsqueda.
  if(e.key == 'Enter'){
    window.location.href = "./src/resultsSearch.html";
  }
  // sessionStorage.setItem('resultsMovie', `${valueSearch}`);
})