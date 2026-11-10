// IN-VI Kids – interactions for the home page.

function openLightbox(src) {
      const lightbox = document.getElementById('lightbox');
      const image = document.getElementById('lightbox-image');

      image.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox(event) {
      if (event && event.target.id === 'lightbox-image') return;

      document.getElementById('lightbox').classList.remove('active');
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });

    document.getElementById('lightbox').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-close').addEventListener('click', function (event) {
      event.stopPropagation();
      closeLightbox();
    });

    document.querySelectorAll('.lightbox-trigger').forEach(function (image) {
      image.addEventListener('click', function () {
        openLightbox(image.src);
      });

      image.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(image.src);
        }
      });
    });

    // Видеото в секцията „За нас“ се стартира само от потребителя.

    const heroVideo = document.querySelector('.hero-banner-video');

    // На мобилни устройства използваме лек статичен кадър вместо autoplay видео.
    // На desktop видеото се възпроизвежда само докато е видимо на екрана.
    if (heroVideo && window.matchMedia('(min-width: 761px)').matches) {
      let heroVideoIsVisible = false;
      heroVideo.loop = true;

      function playHeroVideo() {
        if (!heroVideoIsVisible || document.hidden) return;

        // Възстановяваме началото, ако браузърът е оставил видеото в края.
        if (heroVideo.ended) {
          heroVideo.currentTime = 0;
        }

        const playPromise = heroVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {
            // Видеото остава с наличен poster, ако autoplay бъде блокиран.
          });
        }
      }

      if ('IntersectionObserver' in window) {
        const heroVideoObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            heroVideoIsVisible = entry.isIntersecting && entry.intersectionRatio >= 0.6;
            if (heroVideoIsVisible) {
              playHeroVideo();
            } else {
              heroVideo.pause();
            }
          });
        }, { threshold: [0, 0.6] });

        heroVideoObserver.observe(heroVideo);
      } else {
        heroVideoIsVisible = true;
        playHeroVideo();
      }

      // Допълнителна защита при край на клипа и връщане към отворения таб.
      heroVideo.addEventListener('ended', function () {
        heroVideo.currentTime = 0;
        playHeroVideo();
      });

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          heroVideo.pause();
        } else {
          playHeroVideo();
        }
      });
    }

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
        const clickedInsideMenu = mainNav.contains(event.target) || menuToggle.contains(event.target);

        if (!clickedInsideMenu) {
          closeMenu();
        }
      });

      mainNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          closeMenu();
        });
      });
    }

document.querySelectorAll('.news-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        const card = button.closest('.news-card');
        const details = document.getElementById(button.getAttribute('aria-controls'));
        const isOpen = button.getAttribute('aria-expanded') === 'true';

        // Close the other news items so only one is expanded at a time.
        document.querySelectorAll('.news-toggle').forEach(function (otherButton) {
          if (otherButton !== button) {
            otherButton.setAttribute('aria-expanded', 'false');
            otherButton.innerHTML = 'Научи повече <span>↓</span>';
            const otherDetails = document.getElementById(otherButton.getAttribute('aria-controls'));
            if (otherDetails) otherDetails.hidden = true;
            const otherCard = otherButton.closest('.news-card');
            if (otherCard) otherCard.classList.remove('is-expanded');
          }
        });

        if (isOpen) {
          button.setAttribute('aria-expanded', 'false');
          button.innerHTML = 'Научи повече <span>↓</span>';
          details.hidden = true;
          card.classList.remove('is-expanded');
        } else {
          button.setAttribute('aria-expanded', 'true');
          button.innerHTML = 'Скрий <span>↑</span>';
          details.hidden = false;
          card.classList.add('is-expanded');
        }
      });
    });

    document.addEventListener('click', function (event) {
      const button = event.target.closest('.review-toggle');
      if (!button) return;

      const card = button.closest('.review-card');
      if (!card) return;

      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      button.textContent = isExpanded ? 'Виж още' : 'Скрий';
      card.classList.toggle('is-expanded', !isExpanded);
    });

    // Links from the hero banners open the relevant news item instead of
    // jumping to an unrelated section.
    document.querySelectorAll('.hero-banner a[href^="#news"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        const button = target.querySelector('.news-toggle');
        if (button && button.getAttribute('aria-expanded') !== 'true') button.click();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    const backToTop = document.getElementById('backToTop');

    const header = document.querySelector('.site-header');
    let headerHeight = header ? header.offsetHeight : 0;
    let scrollUpdatePending = false;

    function updateBackToTop() {
      backToTop.classList.toggle('show', window.scrollY > headerHeight);
      scrollUpdatePending = false;
    }

    window.addEventListener('resize', function () {
      headerHeight = header ? header.offsetHeight : 0;
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
