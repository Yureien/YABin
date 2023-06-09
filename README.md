# YABin: Yet Another Pastebin

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A21C34E)
![GitHub Sponsor](https://img.shields.io/github/sponsors/Yureien?label=Sponsor&logo=GitHub) ![https://git.sohamsen.me/GhostDev/yabin/badges/main/pipeline.svg](https://github.com/Yureien/YABin)

**WARNING: Still under development. There WILL be breaking changes.**

## Why (yet) another pastebin?

Well, cause no pastebin I could find had ALL of the following features:

 - Modern and minimal UI (This site's design was inspired by bin).
 - Optional end-to-end encryption (we're using AES-256-GCM) with optional password protection (using PBKDF2).
 - Syntax highlighting (using Prism) that supports 297 languages.
 - API support to create and get pastes from command line.
 - View raw pastes. Normally, encrypted pastebins do not have this. With this site, you can either get the Base64-encoded encrypted paste, or decrypt it on the server side (even with the password) and get the raw paste.
 - Keyboard shortcuts!
 - And ofcourse, being fully open-source and easily self-hostable.

## How to use

#### Locally

```bash
yarn install
cp .env.example .env
# Modify .env to add the database URL and other parameters
yarn dev
```

#### Using Docker

```bash
docker build -t yabin:latest .
docker run --env-file .env -it -p 3000:3000 yabin:latest
```
