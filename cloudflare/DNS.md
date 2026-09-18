# Cloudflare DNS — moreatm.com

Ziel: Besucher sehen nur `moreatm.com`. `spacebum9` bleibt Origin-Hostname.

CNAME-Ziel ist **`spacebum9.github.io`** — ohne `/moreatm`. GitHub routet intern über die Datei `CNAME` im Repo.

## Phase 0 — Zone

1. dash.cloudflare.com → Add a domain → `moreatm.com`
2. Plan Free
3. Zwei NS vom Dashboard beim Registrar setzen (keine alten NS mischen)
4. Warten auf Status **Active**
5. DNS → Records: alle Parking-/Registrar-A-Records löschen

## Phase 1 — GitHub-Zertifikat (grau)

Proxy = DNS only. Orange Cloud blockiert oft LetsEncrypt bei GitHub.

### Apex IPv4

| Type | Name | Content | Proxy | TTL |
|---|---|---|---|---|
| A | @ | 185.199.108.153 | DNS only | Auto |
| A | @ | 185.199.109.153 | DNS only | Auto |
| A | @ | 185.199.110.153 | DNS only | Auto |
| A | @ | 185.199.111.153 | DNS only | Auto |

### Apex IPv6

| Type | Name | Content | Proxy | TTL |
|---|---|---|---|---|
| AAAA | @ | 2606:50c0:8000::153 | DNS only | Auto |
| AAAA | @ | 2606:50c0:8001::153 | DNS only | Auto |
| AAAA | @ | 2606:50c0:8002::153 | DNS only | Auto |
| AAAA | @ | 2606:50c0:8003::153 | DNS only | Auto |

### www

| Type | Name | Content | Proxy | TTL |
|---|---|---|---|---|
| CNAME | www | spacebum9.github.io | DNS only | Auto |

Kein zweiter Apex-CNAME neben den A/AAAA. Ein Hostname = eine Satzart.

### Verifikation

GitHub → Repo Settings → Pages → Custom domain = `moreatm.com`.
Wenn Challenge kommt:

| Type | Name | Content | Proxy |
|---|---|---|---|
| TXT | `_github-pages-challenge-spacebum9` | *Token aus GitHub* | DNS only |

Enforce HTTPS erst nach grünem Zertifikat.

## Phase 2 — optional Cloudflare Proxy

Erst wenn GitHub HTTPS an moreatm.com schon läuft.

1. A + AAAA am Apex löschen
2. stattdessen:

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | @ | spacebum9.github.io | Proxied |
| CNAME | www | spacebum9.github.io | Proxied |

3. SSL/TLS → Full (strict)
4. Always Use HTTPS On
5. Min TLS 1.2
6. Automatic HTTPS Rewrites On
7. HSTS erst nach 48 h stabilem HTTPS

Orange Cloud ändert das Besucher-Zertifikat auf Cloudflare. Origin bleibt GitHub.

## Zone-Härtung

| Type | Name | Content | Proxy |
|---|---|---|---|
| TXT | @ | `v=spf1 -all` | DNS only |
| TXT | _dmarc | `v=DMARC1; p=reject; adkim=s; aspf=s` | DNS only |
| TXT | _hold | `MCT-ATM HOLD public=moreatm.com` | DNS only |
| CAA | @ | `0 issue "letsencrypt.org"` | DNS only |
| CAA | @ | `0 issuewild ";"` | DNS only |

Kein MX, solange keine Mail.

## Redirects (Cloudflare Rules)

Single Redirect:

- If hostname equals `www.moreatm.com` → `https://moreatm.com${request.uri.path}` 301 dynamisch

GitHub kann apex↔www selbst umleiten, wenn beide Records korrekt sind. Eine Regel reicht; nicht beide Richtungen gleichzeitig.

## Nicht tun

- Apex A **und** Apex CNAME gleichzeitig
- CNAME auf `spacebum9.github.io/moreatm`
- Orange Cloud in Phase 1
- ALIAS auf `moreatm.pages.dev` (falscher Origin)
- Registrar-Forwarding parallel zur Zone
- Proxied TXT Challenge

## Prüfung nach Active

```bash
dig NS moreatm.com +short
dig A moreatm.com +short
dig AAAA moreatm.com +short
dig CNAME www.moreatm.com +short
curl -sI https://moreatm.com | head
```

Erwartung Phase 1:
- A = die vier 185.199.108–111.153
- www CNAME = spacebum9.github.io.
- HTTPS 200 nach Pages-Deploy + Custom Domain
