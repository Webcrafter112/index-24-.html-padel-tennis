# Aurelia Padel — Premium Padel Tennis Landing Page

A high-end, cinematic landing page for a luxury padel tennis brand.
Minimalistic luxury aesthetic (white / beige / sand / soft blue / black accents),
Apple × Nike feel, with smooth 60fps GSAP animations.

**Tagline:** *Play With Passion.* — Every match begins with one courageous step.

## ✨ Features

- **Fullscreen cinematic hero** — autoplay background video with an elegant
  Ken-Burns image fallback when no video asset is present.
- **GSAP animations** — hero entrance timeline, scroll-triggered reveals,
  parallax image blocks, and subtle background parallax.
- **Glassmorphism navigation** that adapts on scroll, with an animated mobile menu.
- **Micro-interactions** — magnetic buttons, 3D card tilt, custom cursor glow,
  floating glowing light orbs, and an animated marquee.
- **Sections:** Hero · Why Padel · Benefits · Coaching · Gallery · Testimonials · FAQ · Contact.
- **Animated stat counters** and an accessible accordion FAQ.
- **Front-end booking form** with inline validation.

## 🧱 Tech

- HTML5 (semantic, accessible — skip link, ARIA, reduced-motion support)
- Tailwind CSS (CDN, with a custom luxury theme)
- Vanilla JavaScript (no build step)
- GSAP + ScrollTrigger
- Lazy-loaded images/video, preconnects, SEO + Open Graph + JSON-LD

## 📁 Structure

```
index.html              # Markup + Tailwind config + SEO metadata
assets/css/styles.css   # Glassmorphism, glow, grain, marquee, reveals
assets/js/main.js       # Interactions + GSAP timelines
assets/video/           # Drop hero.mp4 here (see its README)
```

## 🚀 Run

It's a static site — just open `index.html`, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🎬 Adding the hero video

Place a cinematic reel at `assets/video/hero.mp4`. The page detects it
automatically and fades it in; otherwise the image fallback stays.
See `assets/video/README.md` for the suggested storyboard and encoding tips.

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (animations disabled, content visible).
- Keyboard-navigable, focus-visible skip link, ARIA-labelled controls.
- Lazy loading, `decoding="async"`, and `fetchpriority` hints for fast loads.
