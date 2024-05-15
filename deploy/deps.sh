#!/usr/bin/env bash

#Load NVM
#export NVM_DIR="$HOME/.nvm"
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

#NPM
#npm install

#Squeaky Bun Time
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

bun install --production
cd /client
bun install --production
bun pack
cd ..
