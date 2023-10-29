#!/bin/sh
prisma --schema=./src/lib/server/prisma/schema.prisma migrate deploy
pm2-runtime process.yml
