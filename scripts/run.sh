#!/bin/sh
prisma migrate deploy
pm2-runtime process.yml
