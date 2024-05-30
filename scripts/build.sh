#!/usr/bin/env bash
set -x
set -e

node -v && npm -v
echo "$PATH"
prefix=$(npm config get prefix)
export PATH=$PATH:$prefix/bin
echo "$PATH"

cd server && npm ci
cd ../ && npm ci

npm config set loglevel info
npm config set progress true

npm run build