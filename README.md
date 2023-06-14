# YABin: Yet Another Pastebin

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A21C34E)
![GitHub Sponsor](https://img.shields.io/github/sponsors/Yureien?label=Sponsor&logo=GitHub)

## Why (yet) another pastebin?

Well, cause no pastebin I could find had ALL of the following features:

 - Modern and minimal UI (This site's design was inspired by bin).
 - Optional end-to-end encryption (we're using AES-256-GCM) with optional password protection (using PBKDF2).
 - Syntax highlighting (using Prism) that supports 297 languages.
 - API support to create and get pastes from command line.
 - View raw pastes. Normally, encrypted pastebins do not have this. With this site, you can either get the Base64-encoded encrypted paste, or decrypt it on the server side (even with the password) and get the raw paste.
 - Keyboard shortcuts!
 - And of course, being fully open-source and easily self-hostable.
 - **It can even be run on edge servers and in serverless environments!**

 ## API Documentation

See [API.md](API.md).

## How to use

**Requirements:** Node.js (tested on 18+, should work with 14+), and a SQL database (tested on PostgreSQL, should work with MySQL and SQLite).

Right now, it is using PostgreSQL (cause I had a server lying around). However, it can be run using any SQL DB such as SQLite or MySQL. To use other backends, please update the provider in [schema.prisma](src/lib/server/prisma/schema.prisma)

#### Locally

```bash
yarn install
cp .env.example .env
# Modify .env to add the database URL and other parameters
yarn dev
```

#### Using Docker

```bash
docker run --env-file .env -it -p 3000:3000 yureien/yabin:latest
```

#### In a serverless environment (Cloudflare Workers, Netlify, Vercel, etc.)

I have not yet tested this, but this is made with SvelteKit. Please take a look at the [SvelteKit documentation](https://kit.svelte.dev/docs/adapters) for more information. If there are any issues, please open an issue, and I will put up a proper guide on how to deploy on such environmments.
