# moreatm — öffentliche ATM-Fläche

Öffentliche Adresse (ohne SpaceBum9 im Host):
**https://moreatm.com**

Interner Publish-Pfad (GitHub, nicht für Besucher):
`spacebum9.github.io/moreatm` — bleibt Backend.

`CNAME` im Repo = `moreatm.com`.

## Zwei Klicks + DNS

1. https://github.com/SpaceBum9/moreatm/settings/pages  
   Source = **GitHub Actions**
2. Custom domain = **moreatm.com** · Enforce HTTPS
3. Cloudflare DNS (grau, nicht proxied bis Zertifikat steht):

```
CNAME  @    spacebum9.github.io
CNAME  www  spacebum9.github.io
```

GitHub zeigt danach ggf. einen TXT-Challenge — Token in `_github-pages-challenge-spacebum9` eintragen.

Ohne Domain-NS gibt es **keine** github.io-URL ohne Usernamen. Projektseiten heißen immer `<user>.github.io/<repo>`.
