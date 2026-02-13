document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DESKTOP STICKY HEADER ---
  if (window.innerWidth >= 1024) {
    const originalHeader = document.querySelector(".hero-header");
    if (originalHeader) {
      const headerClone = originalHeader.cloneNode(true);
      headerClone.classList.add("sticky-header-clone");
      headerClone.removeAttribute("id");
      document.body.prepend(headerClone);

      window.addEventListener(
        "scroll",
        () => {
          if (window.scrollY > 400) {
            headerClone.classList.add("is-visible");
          } else {
            headerClone.classList.remove("is-visible");
          }
        },
        { passive: true },
      );
    }
  }

  // --- 2. HERO SLIDER LOGIC ---
  const heroData = [
    {
      title:
        'Master the profession of a <br><span class="hero-span">kitchen designer</span> online',
      desc: 'Online training from Kraus experts with <span class="hero-text_span">8+ years of real industry experience.</span>',
    },
    {
      title:
        'Practice from the <br><span class="hero-span">very first</span> lessons',
      desc: 'Get hands-on experience by working on <span class="hero-text_span">real-world kitchen projects</span> immediately.',
    },
    {
      title:
        'Clear and convenient <br><span class="hero-span">learning structure</span>',
      desc: 'Step-by-step modules designed to take you <span class="hero-text_span">from zero to professional</span> designer.',
    },
    {
      title:
        'Build your <br><span class="hero-span">professional portfolio</span>',
      desc: 'Complete the course with <span class="hero-text_span">ready-to-show projects</span> for your future clients.',
    },
  ];

  const heroSection = document.getElementById("hero");
  const heroTitle = document.getElementById("hero-title");
  const heroDesc = document.getElementById("hero-desc");
  const heroDots = document.querySelectorAll(".hero-dot");
  const featureCards = document.querySelectorAll(".feature-card");

  let currentHeroIndex = 0;
  let heroInterval;

  function updateHeroSlide(index) {
    heroDots.forEach((d) => d.classList.remove("active"));
    heroDots[index].classList.add("active");

    heroTitle.style.opacity = 0;
    heroTitle.style.transform = "translateY(-10px)";
    heroDesc.style.opacity = 0;

    setTimeout(() => {
      heroTitle.innerHTML = heroData[index].title;
      heroDesc.innerHTML = heroData[index].desc;

      for (let i = 1; i <= 4; i++) {
        heroSection.classList.remove(`hero-slide-${i}`);
      }
      heroSection.classList.add(`hero-slide-${index + 1}`);

      if (window.innerWidth >= 1024) {
        featureCards.forEach((card, i) => {
          card.classList.toggle("active", i === index);
        });
      }

      heroTitle.style.opacity = 1;
      heroTitle.style.transform = "translateY(0)";
      heroDesc.style.opacity = 1;
    }, 400);

    currentHeroIndex = index;
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    heroInterval = setInterval(() => {
      let nextIndex = (currentHeroIndex + 1) % heroData.length;
      updateHeroSlide(nextIndex);
    }, 5000);
  }

  function stopHeroAutoplay() {
    if (heroInterval) clearInterval(heroInterval);
  }

  if (heroSection && heroTitle && heroDesc) {
    heroDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateHeroSlide(index);
        startHeroAutoplay();
      });
    });

    if (window.innerWidth >= 1024) {
      startHeroAutoplay();
    }
  }

  // --- 3. COURSE PROGRAM ACCORDION  ---
  const programItems = document.querySelectorAll(".program-item");
  programItems.forEach((item) => {
    const header = item.querySelector(".program-header");
    const icon = item.querySelector(".program-icon-plus");

    if (header) {
      header.addEventListener("click", () => {
        programItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open");
            const otherIcon = otherItem.querySelector(".program-icon-plus");
            if (otherIcon) otherIcon.textContent = "+";
          }
        });

        item.classList.toggle("open");
        if (icon) {
          icon.textContent = item.classList.contains("open") ? "−" : "+";
        }
      });
    }
  });

  // --- 4. REVIEWS GRID SCROLLBAR ---
  const grid = document.querySelector(".reviews-grid");
  const cards = [...document.querySelectorAll(".review-card")];
  const prevBtn = document.querySelector(".reviews-arrow.prev");
  const nextBtn = document.querySelector(".reviews-arrow.next");

  let currentIndex = 0;

  function updateActive() {
    const center = grid.scrollLeft + grid.clientWidth / 2;

    let closest = cards[0];
    let min = Infinity;

    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);

      if (dist < min) {
        min = dist;
        closest = card;
      }
    });

    cards.forEach((c) => c.classList.remove("is-active"));
    closest.classList.add("is-active");

    currentIndex = cards.indexOf(closest);
    updateButtons();
  }

  function scrollToIndex(i) {
    currentIndex = Math.max(0, Math.min(i, cards.length - 1));

    grid.scrollTo({
      left:
        cards[currentIndex].offsetLeft -
        (grid.clientWidth - cards[currentIndex].offsetWidth) / 2,
      behavior: "smooth",
    });
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
  }

  prevBtn.addEventListener("click", () => scrollToIndex(currentIndex - 1));
  nextBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

  grid.addEventListener("scroll", updateActive);

  updateActive();
  updateButtons();

  // --- 5. REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && window.innerWidth >= 1024) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("active"));
  }

  // --- 6. MOBILE MENU ---
  const burgerBtn = document.getElementById("open-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      const isActive = burgerBtn.classList.toggle("is-active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        burgerBtn.classList.remove("is-active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burgerBtn.classList.remove("is-active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // --- 7. CONTACT FORM ---
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const closeStatusBtn = document.getElementById("closeStatusBtn");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const button = this.querySelector(".footer-button");
      const originalHTML = button.innerHTML;
      button.textContent = "Sending...";
      button.disabled = true;

      setTimeout(() => {
        formStatus.style.display = "flex";
        button.innerHTML = originalHTML;
        button.disabled = false;
        this.reset();
      }, 1200);
    });

    if (closeStatusBtn) {
      closeStatusBtn.addEventListener("click", () => {
        formStatus.style.display = "none";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === formStatus) formStatus.style.display = "none";
    });
  }

  // --- 8. AUTOMATIC UPDATE OF THE YEAR ---
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
