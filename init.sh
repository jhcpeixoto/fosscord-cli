#!/bin/bash
git clone https://github.com/fosscord/fosscord-api api
git clone https://github.com/fosscord/fosscord-gateway gateway

# Setup deps
cd api
npm i
npm audit fix
cd ..
cd gateway
npm i
npm audit fix

cd ..
exit 0