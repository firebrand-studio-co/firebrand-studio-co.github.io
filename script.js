function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  const ctaButton = document.querySelector('.cta');

  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
      // Move CTA Button into Nav Links
      navLinks.appendChild(ctaButton);
  } else {
      // Move CTA Button back to Nav Container
      document.querySelector('.nav-container').appendChild(ctaButton);
  }
}




document.addEventListener("DOMContentLoaded", function () {
  const fadeItems = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Stop observing once it's visible
          }
      });
  }, { threshold: 0.15 }); // Adjust visibility threshold

  fadeItems.forEach(item => {
      observer.observe(item);
  });
});


