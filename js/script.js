(function($) {
	
	"use strict";

  /* Mobile Menu */
  var MobileMenu = function() {

      var toggleButton = $('.header-menu-toggle'),
          nav = $('.header-nav-wrap');

      toggleButton.on('click', function(event){
          event.preventDefault();

          toggleButton.toggleClass('is-clicked');
          nav.slideToggle();
      });

      if (toggleButton.is(':visible')) nav.addClass('mobile');

     
      nav.find('a').on("click", function() {

          if (nav.hasClass('mobile')) {
              toggleButton.toggleClass('is-clicked');
              nav.slideToggle(); 
          }
      });

  };

  // init Chocolat light box
  var initChocolat = function() {
  Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  $(document).ready(function () {
    MobileMenu();
    initChocolat();

    /*slider*/
    var swiper = new Swiper(".mySwiper", {
      autoHeight: true,
      spaceBetween: 20,
      navigation: {
        nextEl: ".slide-button-next",
        prevEl: ".slide-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    /* Video */
    var $videoSrc;  
    $('.play-btn').click(function() {
        $videoSrc = $(this).data( "src" );
    });

    $('#myModal').on('shown.bs.modal', function (e) {

    $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
    })

    $('#myModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src',$videoSrc); 
    })

    function initializeChart() {
      $('.chart').easyPieChart({
        easing: 'easeOutBounce',
        // Aumenta el tamaño para hacer el círculo un poco más grande:
        size: 300, 
        lineWidth: 8,
        barColor: '#6565ff',
        trackColor: '#fff',
        scaleColor: '#fff',
        lineCap: 'square',
        animate: {
          duration: 4000,
          enabled: true
        },
        onStep: function(from, to, percent) {
          // 1) Blur adjust:
          const maxBlur = 8; 
          const blurValue = maxBlur * (1 - (percent/100));
          
          // 2) Apply blur in .chart
          $(this.el).find('img').css('filter', `blur(${blurValue}px)`);
        }
      });
    }

    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {          
          initializeChart();
          observer.unobserve(entry.target);
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection);

    const servicesWrap = document.getElementsByClassName('services-wrap')[0];
    observer.observe(servicesWrap);

  });

  window.addEventListener("load", function () {
    /* Preloader */
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide-preloader");
  });

})(window.jQuery);