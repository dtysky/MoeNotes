/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Testing for parser.
 */

const fs = require('fs');
const path = require('path');
const paths = require('../helpers/config').paths;
const srcPath = paths.srcPath;
const parser = require(
    path.join(srcPath, 'parser')
);
const testPage = fs.readFileSync('test-parser.md').toString();

function test(page){
    fs.writeFileSync('test-parser.html', parser.parse(page));
}

test(testPage);