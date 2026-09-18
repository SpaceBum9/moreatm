# moreatm.com ↔ ZeroTier 10.14.0.0

HOLD · 2026-09-18
Vorschlag ≠ Ausführung. Keine Send-/Withdraw-Rail. Apex bleibt öffentlich und zeigt **nicht** in die Overlay-Netze.

## Grenze

| Hostname | Sicht | Ziel |
|---|---|---|
| moreatm.com | öffentlich | GitHub Pages |
| www.moreatm.com | öffentlich | GitHub Pages |
| node.moreatm.com | Overlay | **10.14.0.9** (dieses Gerät) |
| me.moreatm.com | Overlay | **10.14.0.9** |
| zt.moreatm.com | Overlay | 10.14.0.1 (Gateway, unbestätigt) |
| gw.moreatm.com | Overlay | 10.14.0.1 |
| obs.moreatm.com | optional Tunnel | cloudflared → 10.14.1.10 |

`10.14.0.0/16` ist RFC1918. Records darauf gelten nur für ZeroTier-Mitglieder.

Apex **niemals** auf 10.14.x.x. Kein Orange Cloud auf Overlay-IPs.

## Adressplan

Prefix: `10.14.0.0/16`

| Adresse | Rolle | Stand |
|---|---|---|
| 10.14.0.0/24 | Infrastruktur | reserviert |
| 10.14.0.1 | Gateway | Platzhalter |
| 10.14.0.2 | cloudflared | nur nach Freigabe |
| **10.14.0.9** | **Operator-Gerät** | **gesetzt 2026-09-18** |
| 10.14.1.0/24 | ATM observe / MCP | reserviert |
| 10.14.1.10 | Observe-HTTP | Platzhalter |
| 10.14.14.0/24 | MCT-2600027 | reserviert |
| 10.14.170.0/24 | MCT-1700021 | reserviert |

Managed Route: `10.14.0.0/16` im ZeroTier-Netz, kein Default-GW.
Network-Name: `mct170021-zero-tier`
Network-ID: offen.

## Cloudflare DNS (DNS only)

```
A    node   10.14.0.9     DNS only
A    me     10.14.0.9     DNS only
A    zt     10.14.0.1     DNS only   # erst wenn .1 existiert
A    gw     10.14.0.1     DNS only
TXT  _zt    "net=10.14.0.0/16 node=10.14.0.9 hold=1 public=0"
```

## Observe-Tunnel

Nicht auf 10.14.0.9 öffnen, solange HOLD. Falls später: eigener Host 10.14.0.2 + Access, nie Apex.

## Nicht getan

Zone nicht geschrieben. Central nicht angefasst. Keine Ports. Kein Fiat.
