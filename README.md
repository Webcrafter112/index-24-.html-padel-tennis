# Padel Club Althofen – Kappel

Pre-Launch One-Page-Website für den **Padel Club Althofen – Kappel** (Krappfeld, Kärnten).
Bewirbt die **Eröffnung 2026** und sammelt unverbindliche Vormerkungen / Gründungsmitglieder.

## Überblick

- **Eine einzige `index.html`** – HTML, CSS und JavaScript inline, keine Build-Tools,
  keine Frameworks. Logo & Favicon sind als Base64 eingebettet, dadurch ist die Datei
  vollständig eigenständig.
- Externe Abhängigkeiten (CDN): Google Fonts (**Anton**/**Outfit**), **GSAP** +
  ScrollTrigger, **Three.js** (3D-Hero). Alle laden mit `defer` und haben Fallbacks.

## Sektionen

Header (Glas-Effekt beim Scrollen) · Hero (Live-3D-Court, Stat-Chips) ·
Marquee · Der Sport · Die Anlage · So spielst du bei uns · Gründungsmitglied (3 Tarife) ·
Eröffnung mit Live-Countdown & Timeline · Kontakt mit Vormerk-Formular · Footer.

## Features

- **Live-3D-Padelcourt im Hero** (Three.js): rotierender Court mit Glaswänden,
  springendem Ball, Lichtsetup und sanfter Maus-Interaktion. Fällt automatisch
  auf eine SVG-Grafik zurück, falls Three.js nicht lädt oder reduzierte Bewegung
  gewünscht ist.
- **Chatbot** (regelbasiert, rechts unten): beantwortet die häufigsten Fragen
  (Eröffnung, Standort, Courts, Preise, Flutlicht, Verleih, Anfänger, Regeln,
  Schulen, Buchung, Kontakt, Crowdfunding) per Stichwort-Erkennung, mit
  Quick-Reply-Buttons und freier Texteingabe.
- **Fixer WhatsApp-Button** (links unten) mit vorbefüllter Nachricht.
- GSAP-Premium-Animationen: Hero-Intro, Scroll-Parallax.
- Schwebende Lichteffekte, Cursor-Glow, magnetische Buttons, Hover-Lift.
- Vereins-Farbwelt aus dem Logo (Navy, Royal, Sky, Lime).
- Scroll-Reveal-Animationen (`IntersectionObserver`), gestaffelte Verzögerung.
- Live-Countdown auf die Eröffnung (Sommer 2026).
- Mobile Navigation, Header-Wechsel beim Scrollen.
- Vormerk-Formular mit Inline-Validierung und Erfolgsmeldung (Frontend-Demo).
- Barrierefrei: `aria-label`s, respektiert `prefers-reduced-motion`.
- Inhalte auf Basis recherchierter Fakten zum Projekt (Initiator Philip Leitner,
  Standort neben der Eishalle Althofen, 2 Courts zum Start, Flutlicht bis 22 Uhr,
  Verleih-Automaten, kostenlos für Schulen, Finanzierung via Crowdfunding).

## Noch einzutragen

- **WhatsApp-Nummer:** im Button `#waFab` (Attribut `href`, `wa.me/<Nummer>`,
  Format Ländercode ohne „+", z. B. `4366412345678`). Der Chatbot übernimmt die
  Nummer automatisch von dort.
- **Genauer Eröffnungstermin:** `OPENING_DATE` im Script (aktuell 15.07.2026 als
  Platzhalter für „Sommer 2026").

## Starten

Statische Seite – einfach `index.html` öffnen, oder lokal servieren:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## 3D-Animation

Der Hero zeigt einen mit **Three.js** live gerenderten Padelcourt (rotierend,
Glaswände, springender Ball, Maus-Interaktion). Lädt Three.js nicht oder ist
`prefers-reduced-motion` aktiv, bleibt die SVG-Grafik als Fallback sichtbar.
Der gesamte Code steckt im `<script>`-Block am Ende von `index.html`
(„3D-PADELCOURT").
