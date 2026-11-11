/*
 * Единен източник на общите видими данни за IN-VI Kids.
 * Променяйте тук контактите, навигационните надписи и информацията за местоположението.
 * SEO метаданните, основното редакционно съдържание и JSON-LD остават в HTML.
 */
(() => {
  "use strict";

  const SITE_CONFIG = Object.freeze({
    brandName: "IN-VI Kids",
    phoneDisplay: "+359 895 47 17 52",
    phoneHref: "tel:+359895471752",
    email: "in.vi.kids.bg@gmail.com",
    emailHref: "mailto:in.vi.kids.bg@gmail.com",
    facebookUrl: "https://www.facebook.com/share/1D1tHALR4r/",
    instagramUrl: "https://www.instagram.com/in_vi_kids/",
    addressStreet: "ул. „проф. Милко Бичев“ 1",
    addressArea: "до метростанция „Театрална“, София",
    addressIntro: "Ще ни намерите на ул. „проф. Милко Бичев“ 1, София, в непосредствена близост до парк Заимов.",
    contactHeading: "IN-VI Kids се намира до метростанция „Театрална“.",
    brandHomeLabel: "IN-VI Kids - начало",
    metroDetails: "Линия 3 · метростанция „Театрална“",
    busDetails: "11 · 213 · 404",
    tramDetails: "20 · 21 · 22",
    mapEmbedUrl: "https://www.google.com/maps?q=%D1%83%D0%BB.%20%D0%BF%D1%80%D0%BE%D1%84.%20%D0%9C%D0%B8%D0%BB%D0%BA%D0%BE%20%D0%91%D0%B8%D1%87%D0%B5%D0%B2%201%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F&output=embed"
  });

  const setConfiguredText = () => {
    document.querySelectorAll("[data-site-text]").forEach((element) => {
      const key = element.dataset.siteText;
      if (Object.prototype.hasOwnProperty.call(SITE_CONFIG, key)) {
        element.textContent = SITE_CONFIG[key];
      }
    });

    document.querySelectorAll("[data-site-href]").forEach((element) => {
      const key = element.dataset.siteHref;
      if (Object.prototype.hasOwnProperty.call(SITE_CONFIG, key)) {
        element.setAttribute("href", SITE_CONFIG[key]);
      }
    });

    document.querySelectorAll("[data-site-src]").forEach((element) => {
      const key = element.dataset.siteSrc;
      if (Object.prototype.hasOwnProperty.call(SITE_CONFIG, key)) {
        element.setAttribute("src", SITE_CONFIG[key]);
      }
    });

    document.querySelectorAll("[data-site-aria-label]").forEach((element) => {
      const key = element.dataset.siteAriaLabel;
      if (Object.prototype.hasOwnProperty.call(SITE_CONFIG, key)) {
        element.setAttribute("aria-label", SITE_CONFIG[key]);
      }
    });

    document.querySelectorAll("[data-site-alt]").forEach((element) => {
      const key = element.dataset.siteAlt;
      if (Object.prototype.hasOwnProperty.call(SITE_CONFIG, key)) {
        element.setAttribute("alt", SITE_CONFIG[key]);
      }
    });
  };

  setConfiguredText();
  window.INVIKidsSite = SITE_CONFIG;
})();
