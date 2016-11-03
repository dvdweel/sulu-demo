# Sulu-Demo

Welcome to the Sulu-Demo. This demo is used to test different changes.

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

## Changes

__Information:__

- Everything is loaded in main.css including husky. The file main.css will be loaded in the index.

__Sulu:__

- Color variables
- Images variables

__Husky:__

- Logo variable

_Test Bundle:_

- There is a test bundle included in this demo. More information about this bundle can be found here: http://blog.sulu.io/how-to-develop-a-bundle-in-the-sulu-admin-1