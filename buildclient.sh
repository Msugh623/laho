cd client
npm install
npm run build
cd ..
rm -r public/assets
cp -r client/dist/* public
mv public/index.html public/indexer.html