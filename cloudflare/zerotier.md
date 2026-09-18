# moreatm.com ↔ ZeroTier 10.14.0.0

HOLD · 2026-09-18
Vorschlag ≠ Ausführung. Keine Send-/Withdraw-Rail. Apex bleibt öffentlich und zeigt **nicht** in die Overlay-Netze.

## Grenze

| Hostname | Sicht | Ziel |
|---|---|---|
| moreatm.com | öffentlich | GitHub Pages |
| www.moreatm.com | öffentlich | GitHub Pages |
| zt.moreatm.com | Overlay | 10.14.0.1 |
| gw.moreatm.com | Overlay | 10.14.0.1 |
| obs.moreatm.com | optional Tunnel | cloudflared → 10.14.1.10 |

`10.14.0.0/16` ist RFC1918. Ein A-Record darauf im öffentlichen DNS ist nur für Knoten nutzbar, die schon im ZeroTier-Netz sind. Internet-Besucher erreichen diese IPs nicht — das ist Absicht.

Apex **niemals** auf 10.14.x.x legen. Orange Cloud auf 10.14.x.x ebenfalls nicht.

## Adressplan

Prefix: `10.14.0.0/16`

| Block | Nutzung |
|---|---|
| 10.14.0.0/24 | Infrastruktur |
| 10.14.0.1 | Gateway / erster Controller-Knoten |
| 10.14.0.2 | cloudflared (nur wenn Observe-Tunnel explizit frei) |
| 10.14.1.0/24 | ATM observe / MCP |
| 10.14.1.10 | Observe-Endpoint (HTTP intern) |
| 10.14.14.0/24 | MCT-2600027 Runtime |
| 10.14.170.0/24 | MCT-1700021 Governance |
| rest | unassigned |

ZeroTier Managed Route im Controller:
`10.14.0.0/16` via this network (kein zweites Default-Gateway).

Network-Name im Code: `mct170021-zero-tier`
Network-ID: **hier eintragen** (16 Hex, aus ZeroTier Central).

## Cloudflare DNS (DNS only, grau)

```
A      zt     10.14.0.1      DNS only
A      gw     10.14.0.1      DNS only
A      obs    10.14.1.10     DNS only   # erst nach Host-Existenz
TXT    _zt    "net=10.14.0.0/16 hold=1 public=0"  DNS only
```

Nicht anlegen, bevor der Knoten 10.14.0.1 wirklich im Overlay antwortet.

## Observe-Tunnel (optional, nicht Apex)

Nur wenn ein interner HTTP-Port beobachtet werden soll, ohne das Overlay zu öffnen:

1. cloudflared auf dem ZT-Knoten 10.14.0.2
2. Ingress: `obs.moreatm.com` → `http://10.14.1.10:8080`
3. Cloudflare Access davor (E-Mail / OTP), kein anonymes Internet
4. Kein Tunnel auf `moreatm.com`

`cloudflared` + ZeroTier auf demselben Host: Tunnel sieht 10.14er, Besucher sehen Cloudflare, nicht das Overlay.

## Was diese Datei nicht tut

- ZeroTier Central nicht anfassen
- keine Members authorizen
- keine Cloudflare-Zone schreiben
- keine Ports öffnen
- kein Fiat, kein Wallet
