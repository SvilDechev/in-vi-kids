/* IN-VI Kids seasonal effects.
   Autumn leaves: October 1–November 30.
   Christmas background: December 1–31.
   Winter snowfall: December 1–February 28/29.
   Local previews: ?autumn=1 (leaves), ?christmas=1 (background + snow), ?snow=1 (snow only). */
(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var previewAutumn = params.get('autumn') === '1';
  var previewChristmas = params.get('christmas') === '1';
  var previewSnow = params.get('snow') === '1';
  var now = new Date();
  var month = now.getMonth(); // 0 = January, 11 = December
  var day = now.getDate();

  var isAutumnSeason = (month === 9 && day >= 1) || (month === 10 && day <= 30);
  var isChristmasSeason = month === 11 && day >= 1 && day <= 31;
  var isWinterSnowSeason = (month === 11 && day >= 1) || month === 0 || (month === 1 && day <= 28);
  // Include February 29 in leap years.
  if (month === 1 && day === 29) isWinterSnowSeason = true;

  var showAutumnLeaves = previewAutumn || (!previewChristmas && !previewSnow && isAutumnSeason);
  var showChristmasTheme = previewChristmas || isChristmasSeason;
  var showSnow = previewChristmas || previewSnow || isWinterSnowSeason;

  if (showChristmasTheme) document.body.classList.add('christmas-theme');
  if (showAutumnLeaves) document.body.classList.add('autumn-theme');

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.innerWidth <= 760;

  if (showAutumnLeaves) {
    var leaves = document.createElement('div');
    leaves.id = 'autumn-leaves';
    leaves.setAttribute('aria-hidden', 'true');
    document.body.appendChild(leaves);

    // Fewer, larger leaves, distributed evenly across the full viewport.
    var leafCount = isMobile ? 4 : 7;
    var minSize = isMobile ? 40 : 52;
    var sizeRange = isMobile ? 12 : 18;

    for (var j = 0; j < leafCount; j++) {
      var leaf = document.createElement('img');
      leaf.className = 'autumn-leaf';
      leaf.src = 'assets/autumn-leaf-real.png';
      leaf.alt = '';
      leaf.decoding = 'async';

      // Each leaf gets its own horizontal band to avoid clustering.
      var slotWidth = 88 / leafCount;
      var left = 6 + slotWidth * j + Math.random() * slotWidth * 0.55;
      var leafDuration = 25 + Math.random() * 12;
      var sway = (isMobile ? 18 : 30) + Math.random() * (isMobile ? 12 : 22);

      leaf.style.setProperty('--leaf-left', left.toFixed(2) + '%');
      leaf.style.setProperty('--leaf-size', (minSize + Math.random() * sizeRange).toFixed(1) + 'px');
      leaf.style.setProperty('--leaf-opacity', (0.82 + Math.random() * 0.16).toFixed(2));
      leaf.style.setProperty('--leaf-blur', (Math.random() * 0.22).toFixed(2) + 'px');
      leaf.style.setProperty('--leaf-duration', leafDuration.toFixed(1) + 's');
      leaf.style.setProperty('--leaf-delay', (-Math.random() * leafDuration).toFixed(1) + 's');
      leaf.style.setProperty('--leaf-sway', sway.toFixed(1) + 'px');
      leaf.style.setProperty('--leaf-rotation', (Math.random() * 360).toFixed(0) + 'deg');

      if (reducedMotion) {
        leaf.style.top = (Math.random() * 88) + '%';
        leaf.style.animation = 'none';
      }
      leaves.appendChild(leaf);
    }
  }

  if (!showSnow) return;

  var snow = document.createElement('div');
  snow.id = 'christmas-snow';
  snow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(snow);

  var flakeCount = isMobile ? 34 : 68;
  var symbols = ['❄', '✦', '❅', '❆', '·'];
  var flakeColors = ['#ffffff', '#d9edf5', '#b9dce9', '#eaf7fc'];

  for (var i = 0; i < flakeCount; i++) {
    var flake = document.createElement('span');
    flake.className = 'christmas-flake';
    flake.textContent = symbols[i % symbols.length];
    var left = 2 + Math.random() * 96;
    var size = 13 + Math.random() * (isMobile ? 9 : 12);
    var duration = 12 + Math.random() * 12;
    var delay = -Math.random() * duration;
    var drift = (Math.random() * 2 - 1) * (isMobile ? 28 : 42);
    var opacity = 0.76 + Math.random() * 0.22;
    flake.style.setProperty('--flake-left', left.toFixed(2) + '%');
    flake.style.setProperty('--flake-color', flakeColors[Math.floor(Math.random() * flakeColors.length)]);
    flake.style.setProperty('--flake-size', size.toFixed(1) + 'px');
    flake.style.setProperty('--flake-opacity', opacity.toFixed(2));
    flake.style.setProperty('--flake-duration', duration.toFixed(1) + 's');
    flake.style.setProperty('--flake-delay', delay.toFixed(1) + 's');
    flake.style.setProperty('--flake-drift', drift.toFixed(1) + 'px');
    if (reducedMotion) {
      flake.style.top = (Math.random() * 94) + '%';
      flake.style.animation = 'none';
      flake.style.opacity = '0.78';
    }
    snow.appendChild(flake);
  }
})();
