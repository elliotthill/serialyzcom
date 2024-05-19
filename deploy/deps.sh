#!/usr/bin/env bash
cd /srv/www/node/serialyz

#Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

#NPM
#npm install

#Squeaky Bun Time
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

bun install --production
cd client
#No .env file in client
NODE_ENV=production bun install --production
NODE_ENV=production bun pack
NODE_ENV=production bun tailwind
cd ..

bun run server/cron/deploy.ts
