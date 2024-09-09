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
})