/* Paani Boss — veo3prompt.guide
 * Footer year, sticky-header state, scroll reveal, screenshot slideshow.
 * Every lookup is guarded so this single file can be included on the landing
 * page and on the legal pages without errors. */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------- footer year ---------------- */
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    /* ---------------- sticky header shadow ---------------- */
    var header = document.getElementById('siteHeader');
    if (header) {
        var setStuck = function () {
            header.classList.toggle('is-stuck', window.scrollY > 8);
        };
        setStuck();
        window.addEventListener('scroll', setStuck, { passive: true });
    }

    /* ---------------- scroll reveal ---------------- */
    var revealables = document.querySelectorAll('.reveal');
    if (revealables.length) {
        if (reduceMotion || !('IntersectionObserver' in window)) {
            // No animation available or wanted: show everything immediately.
            Array.prototype.forEach.call(revealables, function (el) {
                el.classList.add('is-visible');
            });
        } else {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

            Array.prototype.forEach.call(revealables, function (el, i) {
                el.style.transitionDelay = Math.min(i % 3, 2) * 70 + 'ms';
                observer.observe(el);
            });
        }
    }

    /* ---------------- screenshot slideshow ---------------- */
    var track = document.getElementById('slidesTrack');
    var dotsWrap = document.getElementById('slideDots');
    var prevBtn = document.getElementById('slidePrev');
    var nextBtn = document.getElementById('slideNext');
    if (!track || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.children);
    if (!slides.length) return;

    var index = 0;
    var timer = null;

    slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Show screenshot ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
    });

    var dots = Array.prototype.slice.call(dotsWrap.children);

    function render() {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach(function (dot, i) {
            var current = i === index;
            dot.classList.toggle('active', current);
            dot.setAttribute('aria-current', current ? 'true' : 'false');
        });
    }

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        render();
        restartAutoplay();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function stopAutoplay() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    function restartAutoplay() {
        if (reduceMotion) return;
        stopAutoplay();
        timer = setInterval(next, 4800);
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Pause while hovering or while the tab is in the background.
    var frame = track.closest('.slideshow') || track;
    frame.addEventListener('mouseenter', stopAutoplay);
    frame.addEventListener('mouseleave', restartAutoplay);
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAutoplay(); else restartAutoplay();
    });

    // Keyboard support when focus is inside the gallery.
    frame.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') { prev(); event.preventDefault(); }
        if (event.key === 'ArrowRight') { next(); event.preventDefault(); }
    });

    render();
    restartAutoplay();
})();
