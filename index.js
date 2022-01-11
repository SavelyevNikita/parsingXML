const path = require('path');
const iconv = require('iconv-lite');
const fs = require('fs');
const pathSVBU_7 = path.resolve(__dirname, 'NPP_models(svbu-7)');
const pathSVSU = path.resolve(__dirname, 'NPP_models(SVSU)');
function getNameOfFile(path, OutFileName) {
    fs.promises.readdir(__dirname).then(filenames => {
        for (let filename of filenames) {
            if (filename == OutFileName) {
                fs.unlinkSync(OutFileName);
            }
        }
    });

    fs.promises.readdir(path)
        .then(filenames => {
            let i = 0;
            for (let filename of filenames) {
                const readStream = fs.createReadStream(path + '\\' + filename);
                // iconv.encode(readStream.setEncoding('utf8'), 'win1251')
                readStream.setEncoding('utf8');
                readStream.on('data', (chunk) => {
                    chunk.split(/\r?\n/).forEach(line => {
                        // if (line.includes('<title>') && !line.includes('&quot;') && !line.includes('00')) {
                        if (line.includes('<title>') && !line.match(/[0-9][0-9][A-Z][A-Z][A-Z][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9]_[A-Z][A-Z][0-9][0-9]/gm) && !line.match(/[0-9][0-9][A-Z][A-Z][A-Z][0-9][0-9][A-Z][A-Z][0-9][0-9][0-9]/gm) && !line.includes('&quot;')) {
                            // console.log(iconv.encode(line, 'win1251'));
                            console.log(`${i} ${filename} ${line}`);
                            writeToFile(OutFileName, `${i} ${filename} ${line}`);
                        }
                    });
                    i += 1;
                })
            }
        });
}
getNameOfFile(pathSVBU_7, 'list.txt');

function writeToFile(OutFileName, filename) {
    fs.appendFileSync(OutFileName, `${filename}\n`);
}