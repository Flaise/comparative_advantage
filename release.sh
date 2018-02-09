./node_modules/.bin/browserify ./src/js.js --outfile ./dist/js.js
cp ./src/html.html ./dist/index.html
cp -r ./src/assets ./dist
cd ./dist
zip -r ../comparative_advantage.zip .
