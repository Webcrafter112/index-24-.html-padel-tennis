# Padel Club Althofen – Kappel

Pre-Launch One-Page-Website für den **Padel Club Althofen – Kappel** (Krappfeld, Kärnten).
Bewirbt die **Eröffnung 2026** und sammelt unverbindliche Vormerkungen / Gründungsmitglieder.

## Überblick

- **Eine einzige `index.html`** – HTML, CSS und JavaScript inline, keine Build-Tools,
  keine Frameworks. Logo & Favicon sind als Base64 eingebettet, dadurch ist die Datei
  vollständig eigenständig.
- Einzige externe Abhängigkeit: Google Fonts (**Anton** für Headlines, **Outfit** für Text);
  optional **Spline** für die 3D-Bühne im Hero.

## Sektionen

Header (Glas-Effekt beim Scrollen) · Hero (Court-Linien, Stat-Chips, Spline-Platzhalter) ·
Marquee · Der Sport · Die Anlage · So spielst du bei uns · Gründungsmitglied (3 Tarife) ·
Eröffnung mit Live-Countdown & Timeline · Kontakt mit Vormerk-Formular · Footer.

## Features

- Vereins-Farbwelt aus dem Logo (Navy, Royal, Sky, Lime).
- Scroll-Reveal-Animationen (`IntersectionObserver`), gestaffelte Verzögerung.
- Live-Countdown auf die Eröffnung (13.09.2026).
- Mobile Navigation, Header-Wechsel beim Scrollen.
- Vormerk-Formular mit Inline-Validierung und Erfolgsmeldung (Frontend-Demo).
- Barrierefrei: `aria-label`s, respektiert `prefers-reduced-motion`.

## Starten

Statische Seite – einfach `index.html` öffnen, oder lokal servieren:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## 3D-Animation einbinden (optional)

Im Hero ist eine quadratische Bühne mit Platzhalter vorbereitet. Zum Aktivieren einer
Spline-Szene das Viewer-Skript im `<head>` ergänzen und den Platzhalter durch
`<spline-viewer url="…/scene.splinecode">` ersetzen (Anleitung als Kommentar im Code).
