document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // MOBILE NAVIGATION ENGINE
  // ==========================================
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinksContainer = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      if (navLinksContainer) navLinksContainer.classList.toggle("active");
    });
  }

  // Close mobile menu upon executing an anchor shift
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        if (navLinksContainer) navLinksContainer.classList.remove("active");
      }
    });
  });

  // ==========================================
  // HIGH-PERFORMANCE INTERSECTION OBSERVER
  // ==========================================
  const sections = document.querySelectorAll(".id-anchor, #hero");
  const revealElements = document.querySelectorAll(".reveal");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Strict focus targeting layout metrics
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // Scroll-Reveal Animation Engine Trigger
  const revealOptions = {
    root: null,
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.05,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target); // Optimize DOM tracking cycles
      }
    });
  }, revealOptions);

  revealElements.forEach((element) => revealObserver.observe(element));

  // Force trigger immediate visibility for hero segment parameters
  setTimeout(() => {
    const heroElements = document.querySelectorAll("#hero .reveal");
    heroElements.forEach((el) => el.classList.add("active"));
  }, 150);
});
