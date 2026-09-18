# moreatm.com — MCT / GARAS ATM-Fläche

Öffentliche Übergabeschicht. Vorschlag ≠ Ausführung.

| Schicht | Ort |
|---|---|
| ATM-Fläche | this repo → Cloudflare Pages → moreatm.com |
| Systemkarte | https://mct-garas-system.crystalmike.chatgpt.site |
| Governance | https://github.com/SpaceBum9/MCT-1700021 |
| Runtime | https://github.com/SpaceBum9/MCT-2600027 |

Status: **HOLD** bis Cloudflare-Zone Active und Custom Domain gebunden.

## Was hier nicht passiert

- kein Send / Withdraw
- kein Autopilot
- keine Ableitung von Berechtigung aus Domain-Existenz
- PayPal-Pool nur observe-only

## Cloudflare — einmalig im Dashboard

1. Domain `moreatm.com` besitzen / Registrar offen.
2. dash.cloudflare.com → Add a domain → `moreatm.com`.
3. Angezeigte Nameserver beim Registrar setzen.
4. Warten auf Zone **Active**.
5. Workers & Pages → Create → Connect to Git → `SpaceBum9/moreatm` → project name `moreatm` → production branch `main` → output `/` (static).
6. Custom domains: `moreatm.com` + `www.moreatm.com`.
7. DNS-Import: Datei `cloudflare/dns.csv` (siehe unten) oder Records manuell.
8. SSL/TLS: Full (strict) nach Pages-Bindung. Always HTTPS On. Min TLS 1.2.

Namen der Cloudflare-NS sind account-spezifisch. Nicht raten — nur die zwei aus *dieser* Zone verwenden.

## Dateien

- `index.html` — öffentliche Fläche
- `wrangler.toml` + `src/worker.js` — optionaler Worker-Origin
- `cloudflare/dns.csv` — BIND-kompatibler Import
- `cloudflare/HOLD.md` — Trace
- `_headers` / `_redirects` — Pages
