<h1 align="center">YABin: Yet Another Pastebin</h1>

<p align="center">
  <a href="https://github.com/sponsors/Yureien"><img src="https://img.shields.io/github/sponsors/Yureien?label=Sponsor&logo=GitHub" alt="GitHub Sponsor" /></a>
  <a href="https://github.com/Yureien/YABin/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Yureien/YABin.svg" alt="GitHub License" /></a>
  <img alt="Stars" src="https://img.shields.io/github/stars/Yureien/YABin">
  <a href="https://bin.sohamsen.me/"><img src="https://img.shields.io/website-up-down-green-red/https/bin.sohamsen.me.svg" alt="Demo Website" /></a>
</p>
<p align="center">
 <a href="https://ko-fi.com/A0A21C34E"><img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="ko-fi" /></a>
</p>

## Demo

![Demo Video](demo.webp)

## Why (yet) another pastebin?

Well, cause no pastebin I could find had ALL of the following features:

 - Modern and minimal UI (This site's design was inspired by bin).
 - Optional end-to-end encryption (we're using AES-256-GCM) with optional password protection (using PBKDF2).
 - Syntax highlighting (using Prism) that supports 297 languages.
 - API support to create and get pastes from command line.
 - View raw pastes. Normally, encrypted pastebins do not have this. With this site, you can either get the Base64-encoded encrypted paste, or decrypt it on the server side (even with the password) and get the raw paste.
 - Keyboard shortcuts!
 - And of course, being fully open-source and easily self-hostable.
 - **Comes with a CLI tool to create and read pastes from the command line!**
 - **It can even be run on edge servers and in serverless environments!**

 ## API Documentation

See [API.md](API.md).

## CLI Usage

### Installation and Usage

```bash
pip install yabin
yabin create
yabin read "<URL>"
```

See [cli/README.md](cli/README.md) for detailed instructions and library usage.

## How to Host

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

#### In a Serverless Environment (Cloudflare Workers, Netlify, Vercel, etc.)

I have not yet tested this, but this is made with SvelteKit. Please take a look at the [SvelteKit documentation](https://kit.svelte.dev/docs/adapters) for more information. If there are any issues, please open an issue, and I will put up a proper guide on how to deploy on such environmments.

## Public Instances

If you host one and want to make it public, just open an issue and I will add it here!

1. [bin.sohamsen.me](https://bin.sohamsen.me) ![Website Status](https://img.shields.io/website-up-down-green-red/https/bin.sohamsen.me.svg)
