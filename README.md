# Sulu-Demo

Welkom bij de Sulu-Demo. Deze demo is bedoeld om verschillende aanpassingen te maken en te testen.

## Installatie

__Mac:__

```
rm -rf var/cache/*
rm -rf var/logs/*
rm -rf var/sessions/*
HTTPDUSER=`ps axo user,comm | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`
sudo chmod +a "$HTTPDUSER allow delete,write,append,file_inherit,directory_inherit" var/cache var/logs var/uploads var/uploads/* web/uploads web/uploads/* var/indexes var/sessions var/sessions/*
sudo chmod +a "`whoami` allow delete,write,append,file_inherit,directory_inherit" var/cache var/logs var/uploads var/uploads/* web/uploads web/uploads/* var/indexes var/sessions var/sessions/*
```

## Aanpassingen

__Sulu:__

- Kleuren variables
- Images variables

__Husky:__

- Logo variable

__Algemeen:__

- Alles wordt ingeladen in main.css inclusief husky. Deze wordt alleen nog maar ingeladen in de index.
