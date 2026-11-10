// IN-VI Kids – interactions for the adventures page.

const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
      function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('is-open');
        mainNav.classList.remove('is-open');
      }

      menuToggle.addEventListener('click', function () {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.classList.toggle('is-open', !isOpen);
        mainNav.classList.toggle('is-open', !isOpen);
      });

      document.addEventListener('click', function (event) {
        if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
      });

      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }

    // При отваряне на приключение показваме началото на текста под фиксираната навигация.
    document.querySelectorAll('.adventure-entry').forEach(function (entry) {
      entry.addEventListener('toggle', function () {
        if (!entry.open) return;
        const content = entry.querySelector('.adventure-entry-content');
        if (!content) return;
        requestAnimationFrame(function () {
          content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const galleryImages = Array.from(document.querySelectorAll('.adventure-gallery-image'));
    let activeImageIndex = 0;

    function openLightbox(image) {
      activeImageIndex = galleryImages.indexOf(image);
      showLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function showLightboxImage() {
      const image = galleryImages[activeImageIndex];
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCounter.textContent = (activeImageIndex + 1) + ' / ' + galleryImages.length;
    }

    function changeLightboxImage(direction) {
      activeImageIndex = (activeImageIndex + direction + galleryImages.length) % galleryImages.length;
      showLightboxImage();
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryImages.forEach(function (image) {
      image.addEventListener('click', function () { openLightbox(image); });
      image.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(image);
        }
      });
    });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.querySelector('.lightbox-prev').addEventListener('click', function () {
      changeLightboxImage(-1);
    });
    document.querySelector('.lightbox-next').addEventListener('click', function () {
      changeLightboxImage(1);
    });
    document.querySelector('.lightbox-close').addEventListener('click', function (event) {
      event.stopPropagation();
      closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (!lightbox.classList.contains('active')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') changeLightboxImage(-1);
      if (event.key === 'ArrowRight') changeLightboxImage(1);
    });

    const backToTop = document.getElementById('backToTop');
    const siteHeader = document.querySelector('.site-header');
    let headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
    let scrollUpdatePending = false;

    function updateBackToTop() {
      backToTop.classList.toggle('show', window.scrollY > headerHeight);
      scrollUpdatePending = false;
    }

    window.addEventListener('resize', function () {
      headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
      if (!scrollUpdatePending) {
        scrollUpdatePending = true;
        window.requestAnimationFrame(updateBackToTop);
      }
    }, { passive: true });

    window.addEventListener('scroll', function () {
      if (scrollUpdatePending) return;
      scrollUpdatePending = true;
      window.requestAnimationFrame(updateBackToTop);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
