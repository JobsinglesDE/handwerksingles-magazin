# Artikel-Spec handwerksingles-magazin (für Content-Subagents)

Repo: /docker/projects/handwerksingles-magazin · Artikel = `content/articles/{slug}.mdoc`

## Frontmatter (EXAKT diese Felder, YAML zwischen `---`)
```yaml
title: 'Titel des Artikels'        # H1, ≤60 Zeichen, KEIN ❤️ (Layout hängt es an <title> an)
focusKeyword: 'haupt keyword'
category: partnersuche             # partnersuche | berufsbilder | handwerk-news
person: ''                         # nur bei News über Craftfluencer: person-Hub-Slug
gewerk: ''                         # '' | bau | ausbau | elektro | holz | kfz | shk
beruf: ''                          # '' | elektriker | kfz-mechatroniker | dachdecker | tischler | zimmermann | maurer | maler-lackierer | anlagenmechaniker-shk | stuckateur | handwerkerin-allgemein
type: cluster                      # pillar | pillar-sub | cluster | berufsbild | news
excerpt: >-
  1-2 Sätze Teaser.
featuredImage: ''                  # LEER lassen — Heroes werden zentral gerendert
featuredImageAlt: 'Beschreibung des gewünschten Bildmotivs'
featuredImageCredit: ''
author: tommy-honold
calloutQuestion: 'Eine prägnante Frage?'
calloutAnswer: >-
  Direkte Antwort, 2-3 Sätze (AEO-Snippet).
faqItems:
  - question: '...?'
    answer: >-
      ...
takeaways:
  - '...'
status: published
isNews: false                      # true nur bei category handwerk-news
isFeatured: false
tags:
  - tag1
seoTitle: 'SEO-Titel ohne Herz'    # ≤57 Zeichen (Template hängt " ❤️" an)
seoDescription: 'Meta-Description' # ≤160 Zeichen
publishedAt: 2026-06-10
theme: dark
---
(Markdoc-Body)
```

## Body-Regeln
- 700–1100 Wörter (Pillar 1400–1800), H2-Struktur (3-6 H2), kurze Absätze.
- **Echte Umlaute ä/ö/ü/ß** — NIE ae/oe/ue-Ersatz.
- **Tavily/Web-Fakten PFLICHT** bei Zahlen (Gehälter, Ausbildungsdauer, Statistiken): vorher recherchieren, realistische aktuelle Werte, keine erfundenen Zahlen. Quellen-Niveau: offizielle Stellen (HWK, ZDH, BA/Entgeltatlas, destatis).
- **Humanizer**: natürlich schreiben — keine KI-Floskeln, keine Dreierlisten-Manie, keine "In der heutigen Welt"-Intros, kein übertriebenes Em-Dash, variable Satzlängen, konkrete Bilder statt Abstrakta.
- **Interne Links**: 3-6 pro Artikel, Markdown `[Anker](/magazin/{pfad})` — IMMER mit /magazin-Präfix! Pfade: Pillar=/magazin/singles-partnersuche/der-ultimative-guide-zur-partnersuche-fuer-handwerker · Beruf-Hubs=/magazin/berufsbilder/{elektriker|kfz-mechatroniker|dachdecker|tischler|zimmermann|maurer} · Personen=/magazin/handwerker/{slug} · Sektion=/magazin/singles-partnersuche etc. NIE auf nicht-geplante URLs linken.
- **Externe Links**: max 1-2, IMMER `{% link href="https://..." rel="nofollow noopener" %}text{% /link %}` — falls Markdoc-Tag unklar, einfach NICHT extern verlinken (Quelle im Text nennen ohne Link).
- **CTA**: kein eigener CTA-Block nötig (Template rendert CTAs automatisch).
- Partnersuche-Spokes: am Ende 1 Absatz Brücke zur Partnersuche + Link auf Pillar. Pillar verlinkt ALLE 13 Spokes.
- Berufsbild-Artikel: Singles-/Dating-Angle als eigener H2 gegen Ende (Differenzierung vs. ausbildung.de).
