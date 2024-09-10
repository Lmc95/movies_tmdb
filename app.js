window.addEventListener('load', () => {
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
  
  const btnMenu = document.getElementById('btn_c');
  const menu = document.querySelector('.category_items');
  const menuList = document.querySelectorAll('.category_items li')
  
  const selectCategory = document.getElementById('category_select');
  const icoBtn = document.querySelector('#btn_c i');
  
  const menuHeader = document.querySelector('.menu_header');
  const btnHeader = document.getElementById('btn_header');
  const barsHeader = document.querySelector('#btn_header i');

  const searchHeader = document.querySelector('.search_header');

  const updateCategory = (i) => {
    switch (i) {
      case 0:
        console.log('click')
        selectCategory.textContent = "NOW PLAYING";
        colorCategory(i)
        break;
      case 1:
        selectCategory.textContent = "TRENDING";
        colorCategory(i)
        break;
      case 2:
        selectCategory.textContent = "POPULAR";
        colorCategory(i)
        break;
      case 3:
        selectCategory.textContent = "TOP RATED";
        colorCategory(i)
        break;
      case 4:
        selectCategory.textContent = "UPCOMING";
        colorCategory(i)
        break;
      default:
        break;
    }
  }

  const colorCategory = (c) => {
    menuList.forEach((item, index) => {
      if(index != c) {
        item.style.color = '#DDDDDD';
        item.classList.remove('items_after');
      }else {
        item.style.color = '#1F9BE8';
        item.classList.add('items_after');
      }
    })
  }

  btnMenu.addEventListener('click', () => {
    if (!menu.classList.contains('items_active')) {
      // SI NO CONTIENE "items_active"
      menu.classList.add('items_active');
      icoBtn.classList.add('fa-caret-up');
      icoBtn.classList.remove('fa-caret-down');
      
    } else {
      menu.classList.remove('items_active');
      icoBtn.classList.add('fa-caret-down');
      icoBtn.classList.remove('fa-caret-up');
    }
  })

  menuList.forEach((item, index) => {
    item.addEventListener('click', () => {
      menu.classList.remove('items_active');
      updateCategory(index);


    })
  })

  btnHeader.addEventListener('click', () => {
    if(!menuHeader.classList.contains('menu_active')) {
      menuHeader.classList.add('menu_active');
      barsHeader.classList.remove('fa-bars');
      barsHeader.classList.add('fa-xmark');
      searchHeader.classList.add('search_active');
      document.body.style.overflow = 'hidden';
    }else {
      menuHeader.classList.remove('menu_active');
      barsHeader.classList.remove('fa-xmark');
      barsHeader.classList.add('fa-bars');
      searchHeader.classList.remove('search_active');
      document.body.style.overflow = 'auto';
    }
  })


})