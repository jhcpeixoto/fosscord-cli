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
exit 0