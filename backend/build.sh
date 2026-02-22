#!/bin/bash
npm install
npx prisma generate
npx tsc
node dist/seed.js
