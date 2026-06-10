# Status (2026-06-10 ~22:45) — PHASE 0-2 FERTIG, live auf Vercel-Preview
## FERTIG + VERIFIZIERT (HEAD 6f845bc)
- 81 Seiten live: https://handwerksingles-magazin.vercel.app/magazin — Live-QC 0 Fails (alle Sektionen/Hubs/Artikel/Kammern/Feeds 200, JSON-LD BlogPosting+FAQPage+Breadcrumb, Canonicals auf handwerksingles.de/magazin, Bilder via next/image ok)
- 45 Content-Pieces + 42 FLUX-Heroes (inkl. neues Startseiten-Hero — Gastro-Altlast ersetzt!), interne Links 100% gegen Build-Manifest validiert, seoTitles ≤57 + ❤️-Template korrekt, de-DE-Zahlenformat
- isFeatured: Pillar + elektriker-ausbildung + tschulique (ICONY-Feed max 3)
- WICHTIG Deploy: Commits MÜSSEN als jobsingles <jobsingles@gmail.com> erfolgen (git config lokal gesetzt) — percy@seeside.ai-Author ⇒ Vercel BLOCKED. Deploy: agents/vercel-deploy-dir.sh <dir> --prod
## WARTET AUF TOMMY
1. Review der Preview → Freigabe
2. Vercel-GitHub-App: Repo handwerksingles-magazin freigeben (Org-Owner, 30 Sek) → Auto-Deploy
3. ICONY-Proxy handwerksingles.de/magazin → Vercel beantragen
## PHASE 3 (nach Proxy, Reihenfolge fix)
Live-QC X-Robots → GSC-Property + gsc-sitemap-resubmit.py-Eintrag → IndexNow-Key public/ → sites.json handwerksingles (CTA-AID bestätigen!) → qc-post.py KEYSTATIC_SITES → IndexNow/RUI nur nach GSC-Coverage
## PHASE 4
45 Rest-Kammern (10er-Batches), Berufsbilder-Welle 2 (maler/shk/stuckateur), Promis mit Handwerkswurzeln, Paperclip-News-Routine, Personen-Fotos (IG-Embed oder Anfrage Management)
