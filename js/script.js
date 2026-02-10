document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DESKTOP STICKY HEADER LOGIC ---
  if (window.innerWidth > 768) {
    const originalHeader = document.querySelector(".hero-header");
    if (originalHeader) {
      const headerClone = originalHeader.cloneNode(true);
      headerClone.classList.add("sticky-header-clone");
      headerClone.removeAttribute("id");
      document.body.prepend(headerClone);

      window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
          headerClone.classList.add("is-visible");
        } else {
          headerClone.classList.remove("is-visible");
        }
      });
    }
  }

  // --- 2. HERO PAGINATION DOTS ---
  const heroDots = document.querySelectorAll(".hero-dot");
  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      heroDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  // --- 3. COURSE PROGRAM ACCORDION ---
  const programItems = document.querySelectorAll(".program-item");
  programItems.forEach((item) => {
    const header = item.querySelector(".program-header");
    const icon = item.querySelector(".program-icon-plus");

    if (header) {
      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        programItems.forEach((otherItem) => {
          otherItem.classList.remove("open");
          const otherIcon = otherItem.querySelector(".program-icon-plus");
          if (otherIcon) otherIcon.textContent = "+";
        });
        if (!isOpen) {
          item.classList.add("open");
          if (icon) icon.textContent = "−";
        }
      });
    }
  });

  // --- 4. REVIEWS GRID SCROLLBAR ---
  const grid = document.querySelector(".reviews-grid");
  const track = document.querySelector(".scrollbar-track");
  const thumb = document.querySelector(".scrollbar-thumb");

  if (grid && track && thumb) {
    function updateScrollbar() {
      const containerWidth = grid.clientWidth;
      const contentWidth = grid.scrollWidth;
      const trackWidth = track.clientWidth;
      if (contentWidth <= containerWidth) {
        thumb.style.display = "none";
        return;
      }
      thumb.style.display = "block";
      const thumbWidth = (containerWidth / contentWidth) * trackWidth;
      thumb.style.width = `${Math.max(40, thumbWidth)}px`;
      const maxScroll = contentWidth - containerWidth;
      const maxThumbMove = trackWidth - thumb.offsetWidth;
      const ratio = grid.scrollLeft / maxScroll;
      thumb.style.left = `${ratio * maxThumbMove}px`;
    }
    grid.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          grid.scrollLeft += e.deltaY * 1.5;
        }
      },
      { passive: false },
    );
    grid.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);
    window.addEventListener("load", updateScrollbar);
  }

  // --- 5. REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll(".reveal");
  if (window.innerWidth > 768) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.2 },
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("active"));
  }

  // --- 6. MOBILE MENU (TOGGLE LOGIC) ---
  const burgerBtn = document.getElementById("open-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("close-mobile-menu");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      burgerBtn.classList.remove("is-active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (burgerBtn && mobileMenu) {
    const toggleMenu = () => {
      burgerBtn.classList.toggle("is-active");
      mobileMenu.classList.toggle("active");

      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    burgerBtn.addEventListener("click", toggleMenu);

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
      const originalContent = button.innerHTML;
      button.textContent = "Sending...";
      button.disabled = true;

      setTimeout(() => {
        formStatus.style.display = "flex";
        button.innerHTML = originalContent;
        button.disabled = false;
        this.reset();
      }, 1500);
    });

    if (closeStatusBtn) {
      closeStatusBtn.addEventListener("click", () => {
        formStatus.style.display = "none";
      });
    }

    formStatus.addEventListener("click", (e) => {
      if (e.target === formStatus) formStatus.style.display = "none";
    });
  }
});
