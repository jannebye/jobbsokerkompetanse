const fs = require('fs');


const bundle = JSON.parse(fs.readFileSync('../../build/dist/tekster/bundle.json', 'utf8'));
console.log(bundle[0]["cv-spm-01"]);
console.log(bundle);
