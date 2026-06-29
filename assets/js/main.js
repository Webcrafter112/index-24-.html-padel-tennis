/* =========================================================
   Aurelia Padel — interactions & GSAP animations
   ========================================================= */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onReady = (fn) =>
    document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

  onReady(init);

  function init() {
    setYear();
    initLoader();
    initNav();
    initMobileMenu();
    initLazyVideo();
    initCounters();
    initFAQ();
    initForm();
    initCursorGlow();
    initMagnetic();
    initTilt();
    // GSAP-driven motion (graceful fallback to CSS .reveal if GSAP missing)
    if (window.gsap && !prefersReduced) {
      initGSAP();
    } else {
      fallbackReveal();
    }
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Loader ---------- */
  function initLoader() {
    const bar = document.getElementById('loader-bar');
    if (bar) {
      // Animate the bar quickly; finish on window load.
      requestAnimationFrame(() => { bar.style.transition = 'width 1.2s ease'; bar.style.width = '85%'; });
    }
    const finish = () => {
      if (bar) bar.style.width = '100%';
      setTimeout(() => document.body.classList.add('loaded'), 350);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    // Safety net so the loader never traps the user.
    setTimeout(() => document.body.classList.add('loaded'), 3500);
  }

  /* ---------- Glassmorphism nav state on scroll ---------- */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const setOpen = (open) => {
      btn.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- Lazy-load hero video (only if a real source exists) ---------- */
  function initLazyVideo() {
    const video = document.getElementById('hero-video');
    const fallback = document.getElementById('hero-fallback');
    if (!video) return;

    const source = video.querySelector('source[data-src]');
    if (!source) return;

    // Probe whether the video asset actually exists before committing.
    const probe = new XMLHttpRequest();
    try {
      probe.open('HEAD', source.dataset.src, true);
      probe.onreadystatechange = function () {
        if (probe.readyState === 4) {
          if (probe.status >= 200 && probe.status < 400) {
            source.src = source.dataset.src;
            video.load();
            video.addEventListener('canplay', () => {
              video.style.opacity = '1';
              if (fallback) fallback.style.opacity = '0';
            }, { once: true });
            video.play().catch(() => {/* autoplay blocked — keep fallback */});
          }
          // else: keep the cinematic image fallback (no console noise)
        }
      };
      probe.send();
    } catch (_) { /* keep fallback */ }
  }

  /* ---------- Animated stat counters ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const run = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const dur = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- FAQ: keep one open at a time (accordion) ---------- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) items.forEach((o) => { if (o !== item) o.open = false; });
      });
    });
  }

  /* ---------- Booking form (front-end demo handling) ---------- */
  function initForm() {
    const form = document.getElementById('booking-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const valid = name.value.trim() && /\S+@\S+\.\S+/.test(email.value);

      if (!valid) {
        showStatus(status, 'Please add your name and a valid email.', false);
        return;
      }
      showStatus(status, `Thank you, ${name.value.trim().split(' ')[0]}. We'll be in touch within 24 hours.`, true);
      form.reset();
    });
  }

  function showStatus(el, msg, ok) {
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
    el.style.color = ok ? '' : '#e0a08a';
  }

  /* ---------- Custom cursor glow ---------- */
  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.matchMedia('(pointer: coarse)').matches) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let gx = x, gy = y;

    window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; glow.style.opacity = '1'; });
    document.querySelectorAll('a, button, .tilt, summary').forEach((el) => {
      el.addEventListener('mouseenter', () => glow.classList.add('grow'));
      el.addEventListener('mouseleave', () => glow.classList.remove('grow'));
    });

    const loop = () => {
      gx += (x - gx) * 0.18;
      gy += (y - gy) * 0.18;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Magnetic buttons (micro-interaction) ---------- */
  function initMagnetic() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.btn-magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- 3D tilt on benefit cards ---------- */
  function initTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.tilt').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- GSAP: hero intro, scroll reveals, parallax ---------- */
  function initGSAP() {
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // Hero entrance timeline (after loader)
    const heroTl = gsap.timeline({ delay: 0.4, defaults: { ease: 'power3.out' } });
    heroTl
      .from('[data-hero="kicker"]', { y: 24, opacity: 0, duration: 0.9 })
      .from('[data-hero="line"]', { y: 60, opacity: 0, duration: 1.1, stagger: 0.12 }, '-=0.5')
      .from('[data-hero="sub"]', { y: 24, opacity: 0, duration: 0.9 }, '-=0.6')
      .from('[data-hero="cta"]', { y: 24, opacity: 0, duration: 0.9 }, '-=0.6')
      .from('[data-hero="cue"]', { opacity: 0, duration: 0.8 }, '-=0.4');

    // Scroll reveals
    gsap.utils.toArray('.reveal').forEach((el) => {
      el.classList.add('gsap-managed');
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
        }
      );
    });

    // Parallax image blocks
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 0.1;
      gsap.to(el, {
        yPercent: -amount * 100,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // Subtle hero parallax on background while scrolling
    if (window.ScrollTrigger) {
      gsap.to('#hero-fallback, #hero-video', {
        yPercent: 16, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }

  /* ---------- Fallback reveal (no GSAP / reduced motion) ---------- */
  function fallbackReveal() {
    const els = document.querySelectorAll('.reveal');
    if (prefersReduced) { els.forEach((el) => el.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
  }
})();
