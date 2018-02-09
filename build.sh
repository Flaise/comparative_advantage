./node_modules/.bin/browserify ./src/js.js --outfile ./dist/js.js --debug
cp ./src/html.html ./dist/index.html
cp -r ./src/assets ./dist
