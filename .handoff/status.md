# Status (2026-06-10 ~18:10)
## DONE — Phase 0+1 KOMPLETT, Build grün
- Repo /docker/projects/handwerksingles-magazin: alle src/-Dateien adaptiert (Sonnet-Agent + manuell), npm run build EXIT 0
- Schema/hubs/routes/sitemap/Nav fertig (siehe task.md/Plan)
- vercel.json redirects=[] (rewrites behalten) · globals.css: primary #52230f, brand-orange #e0794d, -text #b85c33
- ueber-uns: Netzwerk-Block 6 Sites alle rel="nofollow noopener" · Footer/Kontakt/Impressum-Muster wie Netzwerk
- MatchQuiz/PillarBacklinkCard/ArticleView auf beruf-Feld umgestellt, regional/series-Reste aus llms/rss/news-sitemap/seo-check entfernt
## OFFEN
1. GitHub-Repo JobsinglesDE/handwerksingles-magazin anlegen + initial push  ← NÄCHSTER SCHRITT
2. Vercel-Projekt + Env (KEYSTATIC_*) + Preview-Deploy
3. Content-Paket lt. Plan (~32 Artikel + 4 Personen-Hubs [tschulique=Julia Schäfer EINE Person!, chiara-von-monteton, jonas-winkler, gipser-felix] + 8 Kammern HIGH + 3 Stories) — volle Pipeline: Tavily-Fakten, Humanizer, FAQ, articleHref-Links, Instagram-Bilder mit Credit + _Instagram-Accounts.md nachtragen
4. QC (news_gate, kein leerer Hub, JSON-LD) → Review-Paket Tommy (Preview-URL)
5. NACH Review: ICONY-Proxy (Tommy), dann GSC/IndexNow/sites.json/qc-post/gsc-resubmit (Plan Phase 3)
