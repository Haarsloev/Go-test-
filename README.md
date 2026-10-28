# DNDGO v1.9.1 – opstartsrettelse

## Vigtig rettelse
En fejl i dansk-oversættelsen ændrede `localStorage` til `localLager` i `load()` og `save()`. Det forhindrede indlæsning og lagring af karakterer. Begge kald er rettet tilbage til browserens rigtige API. Der er **ikke** tilføjet kode, der sletter gemte data.

Denne udgave indeholder fortsat level-up popup, hunting-rettelser og øvrige v1.9-funktioner. Test i et separat GitHub Pages-repository og behold backup.

### Upload
Upload `index.html` samt `css/` og `js/` med samme struktur. `play.html` er en selvstændig HTML-version.

### Teststatus
JavaScript-syntaks og ZIP-filstruktur er kontrolleret. Browser-test var ikke tilgængelig i kørselsmiljøet.
