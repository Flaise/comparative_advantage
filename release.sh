rm -r ./dist
./node_modules/.bin/browserify ./src/js.js --outfile ./dist/js.js
cp ./src/html.html ./dist/index.html
cp -r ./src/assets ./dist
rm ./comparative_advantage.zip
cd ./dist
zip -r ../comparative_advantage.zip .
