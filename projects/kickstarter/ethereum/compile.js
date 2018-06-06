const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

console.log("Removing build folder.");
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

console.log("Reading contracts.");
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

console.log("Compiling contracts.");
const output = solc.compile(source, 1).contracts;

console.log("Creating build folder.");
fs.ensureDirSync(buildPath);

console.log("Creating output files.");
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
};

console.log("Compilation finished!");
