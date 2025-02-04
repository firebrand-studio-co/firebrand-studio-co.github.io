jQuery(document).ready(function( $ ) {

  $(window).scroll(function () {
    var height = $(window).height();
    var scroll = $(window).scrollTop();
    if (scroll) {
      $(".header-hide").addClass("scroll-header");
    } else {
      $(".header-hide").removeClass("scroll-header");
    }

  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Modal video
  new ModalVideo('.js-modal-btn', {channel: 'youtube'});

  // Init Owl Carousel
  $('.owl-carousel').owlCarousel({
    items: 4,
    autoplay: true,
    loop: true,
    margin: 30,
    dots: true,
    responsiveClass: true,
    responsive: {

      320: { items: 1},
      480: { items: 2},
      600: { items: 2},
      767: { items: 3},
      768: { items: 3},
      992: { items: 4}
    }
  });

// custom code

});

// Add click functionality only to Layer1 through Layer6
// Add click functionality only to Layer1 through Layer6
const clickableLayers = ['Layer1', 'Layer2', 'Layer3', 'Layer4', 'Layer5', 'Layer6'];

clickableLayers.forEach(layerId => {
  const layer = document.getElementById(layerId);
  if (layer) {
    layer.addEventListener('click', function () {
      this.classList.toggle('clicked'); // Toggle clicked class
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const layers = ['Layer1', 'Layer2', 'Layer3', 'Layer4', 'Layer5', 'Layer6'];
  const delay = 500; // Delay between animations (in milliseconds)

  layers.forEach((layerId, index) => {
    const layer = document.getElementById(layerId);
    if (layer) {
      setTimeout(() => {
        // Trigger the animation
        layer.style.animation = "expandContract 1s ease-in-out";
        layer.style.animationIterationCount = "1";

        // Remove animation property to allow re-animation if needed
        setTimeout(() => {
          layer.style.animation = "";
        }, 1000); // Match the animation duration
      }, index * delay);
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const handleHashNavigation = (hash) => {
    if (hash && hash.startsWith("#modal-")) {
      const modalElement = document.querySelector(hash); // Find the modal directly by hash

      // Find the associated card by matching the `data-target` attribute
      const cardElement = document.querySelector(`[data-target="${hash}"]`);

      if (cardElement) {
        // Scroll the card into view
        cardElement.closest(".feature-block").scrollIntoView({ behavior: "smooth", block: "center" });

        // Open the modal after scrolling
        setTimeout(() => {
          $(hash).modal("show");
        }, 500); // Adjust delay as needed
      } else {
        console.warn(`No card found associated with modal ID "${hash}".`);
      }
    } else if (hash && hash.startsWith("#")) {
      // Scroll to a specific section if it's not a modal
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn(`No section found with ID "${hash}".`);
      }
    } else {
      console.warn(`Invalid hash structure: "${hash}".`);
    }
  };

  // Handle the initial hash in the URL on page load
  const initialHash = window.location.hash;
  if (initialHash) {
    handleHashNavigation(initialHash);
  }

  // Add event listener for header link clicks
  const headerLinks = document.querySelectorAll("header a[href^='#']");
  headerLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      const targetHash = link.getAttribute("href");
      handleHashNavigation(targetHash);
    });
  });
});

