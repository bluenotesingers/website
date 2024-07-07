// Function to handle smooth scrolling to a section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  }
}

// Function to handle highlighting the active section in the navigation bar
function highlightActiveSection() {
  const sections = $('.section');
  const navLinks = $('.navbar-nav .nav-link');
  const scrollPosition = $(window).scrollTop();

  sections.each(function () {
    const top = $(this).offset().top;
    const bottom = top + $(this).outerHeight();

    if (scrollPosition >= top - 5 && scrollPosition <= bottom - 5) {
      navLinks.removeClass('section-active');
      const sectionId = $(this).attr('id');
      const correspondingNavLink = $(`.navbar-nav .nav-link[href="#${sectionId}"]`);
      correspondingNavLink.addClass('section-active');
    }
  });
}

// Add event listener for scroll to handle highlighting active section
$(window).on('scroll', function () {
  highlightActiveSection();
});

// Highlight active section on page load
$(document).ready(function () {
  highlightActiveSection();
});

// Function to handle clicking on navigation links
$('.nav-link.section-link').on('click', function (e) {
  e.preventDefault(); // Prevent default behavior (i.e., don't navigate to the link's href)
  const sectionId = $(this).attr('href');
  scrollToSection(sectionId.substring(1)); // Remove the "#" from the href
});

$('#sopraneCarousel').carousel({ interval: 4117 })
$('#altoCarousel').carousel({ interval: 4623 })
$('#tenorCarousel').carousel({ interval: 4847 })
$('#basseCarousel').carousel({ interval: 4971 })
$('#musicienCarousel').carousel({ interval: 4767 })

$('.carousel .carousel-item').each(function(){
  var minPerSlide = 3;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  for (var i=0;i<minPerSlide;i++) {
    next=next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    
    next.children(':first-child').clone().appendTo($(this));
  }
});


// Function to create the HTML code for each card
function createCardHTML(basse) {
  return `
    <div class="carousel-item">
      <div class="col-md-4">
        <div class="card card-body">
          <div class="text-center">
            <img class="img-fluid" src="${basse.imageSrc}" alt="${basse.name}">
          </div>
          <div class="card-content">
            <div class="card-name">${basse.name}</div>
            <div class="card-quote">"${basse.quote}"</div>
          </div>
        </div>
      </div>
    </div>
  `;
}


// Function to update the carousel with the members data
function updateCarousel(pupitre) {
  const carouselInner = $("#" + pupitre + "Carousel .carousel-inner");
  carouselInner.empty();

  // Fetch the members data from members.json using AJAX
  $.ajax({
    url: "data/members.json",
    dataType: "json",
    success: function(data) {
      // Get the members data for the specified pupitre
      const members = data[pupitre];

      // Add each member card to the carousel
      for (let i = 0; i < members.length; i++) {
        const cardHTML = createCardHTML(members[i]);
        carouselInner.append(cardHTML);
      }

      // Set the first item as active
      carouselInner.children().first().addClass("active");
      $('.carousel .carousel-item').each(function(){
        var minPerSlide = 3;
        var next = $(this).next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        
        for (var i=0;i<minPerSlide;i++) {
          next=next.next();
          if (!next.length) {
            next = $(this).siblings(':first');
          }
          
          next.children(':first-child').clone().appendTo($(this));
        }
      });
    },
    error: function() {
      console.log("Error fetching members data.");
      const cardHTML = createCardHTML({
        name: pupitre,
        quote: "...",
        imageSrc: "http://placehold.it/380?text=" + pupitre,
      });
      carouselInner.append(cardHTML);
      carouselInner.children().first().addClass("active");
    }
  });
}


// Call the updateCarousel function with the basses data
$(document).ready(function() {
  updateCarousel("soprane");
  updateCarousel("alto");
  updateCarousel("tenor");
  updateCarousel("basse");
  updateCarousel("musicien");
});
