#!/bin/bash
cd api
git pull
npm i
npm audit fix
cd ..
cd gateway
git pull
npm i
npm audit fix
cd ..
cd cdn
git pull
npm i
npm audit fix

#end
cd ..
exit 0
