#!/bin/bash
git clone https://github.com/fosscord/fosscord-api api
git clone https://github.com/fosscord/fosscord-gateway gateway
git clone https://github.com/fosscord/fosscord-cdn cdn

# Setup deps
cd api
npm i
npm audit fix
cd ..
cd gateway
npm i
npm audit fix
cd ..
cd cdn
npm i
npm audit fix

#end
cd ..
exit 0
