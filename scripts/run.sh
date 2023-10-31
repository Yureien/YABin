#!/bin/sh

set -e
prisma migrate deploy --schema=./src/lib/server/prisma/schema.prisma
pm2-runtime process.yml
