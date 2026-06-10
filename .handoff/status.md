# Status (2026-06-10 ~21:30)
## DONE
- Phase 0+1 komplett: Repo, Taxonomie, Branding (#e0794d/#52230f), Build grün
- GitHub JobsinglesDE/handwerksingles-magazin (main) · Vercel-Projekt prj_EiWR7bdffbRYEMz9kkn4BuzUNetm (Skeleton-Deploy READY auf handwerksingles-magazin.vercel.app/magazin)
- Vercel-GitHub-Integration FEHLT (403, nur Org-Owner) → Tommy muss Repo in Vercel-GitHub-App freigeben; bis dahin Deploy via agents/vercel-deploy-dir.sh
- CONTENT KOMPLETT (45 Pieces): 30 Artikel (Pillar+13 Spokes partnersuche, 6 Hubs+6 Spokes berufsbilder, 4 News-Portraits), 4 Personen-Hubs (tschulique, chiara-von-monteton, jonas-winkler, gipser-felix — featuredImage leer, kein lizenzfreies Foto; Fakten Tavily-belegt), 8 Kammern (aus /tmp/hwk-research.json), 3 Stories
- handwerk-news/[slug]-Route ergänzt (fehlte!) · Build 78 Seiten grün · seoTitles ≤57 gefixt
- IG-Handles: Vault JS-Network/Handwerksingles/_Instagram-Accounts.md
## LÄUFT
- scripts/render-heroes-handwerk.mjs (FLUX.2-pro Heroes aus featuredImageAlt, 41 Bilder, setzt Frontmatter) — Background-Task
## OFFEN
1. Nach Renders: npm run build → commit alles → push → vercel-deploy-dir.sh --prod → Live-QC auf vercel.app/magazin
2. Review-Paket Tommy: Preview-URL + Hinweis Vercel-GitHub-App + ICONY-Proxy erst nach Review (seine Entscheidung)
3. Daily Log + Memory (project_handwerksingles_magazin) + Vault-Task abhaken
4. Phase 3 (NACH Review): ICONY-Proxy, GSC, IndexNow-Key, sites.json, qc-post KEYSTATIC_SITES, gsc-sitemap-resubmit-Eintrag
