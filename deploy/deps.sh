#!/usr/bin/env bash

#Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

#NPM
#npm install

#Squeaky Bun Time
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

bun install --production
pwd
cd "$(dirname "${BASH_SOURCE[0]}")/client"
bun install --production
bun pack
bun tailwind
cd ..
