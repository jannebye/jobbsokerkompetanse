const fs = require('fs');
const path = require('path');

function readFile(dir, file) {
    try {
        return fs.readFileSync(path.join(dir, file), 'utf8');
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

function createJson(katalog) {
    return 'const bundle = ' + JSON.stringify(read(katalog));
}

const read = (dir) =>
    fs.readdirSync(dir)
        .reduce((files, file) =>
            fs.statSync(path.join(dir, file)).isDirectory() ?
                files.concat(read(path.join(dir, file))) :
                files.concat({
                    [file.split('_')[0]] : readFile(dir, file).trim()
                }), []);

try{
    fs.writeFileSync('../../build/dist/tekster/bundle.js', createJson('../tekster/sporsmal'));
}catch (e){
    console.log("Kunne ikke skrive fil ", e);
}

console.log(
    read('../tekster/sporsmal')
);

