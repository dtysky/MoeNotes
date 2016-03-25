/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Testing for parser.
 */

import fs from 'fs';
import path from 'path';
import paths from '../helpers/config';

const srcPath = paths.srcPath;
const parser = require(
    path.join(srcPath, 'parser')
);

describe("parser", () => {
    it("Should return html base on markdown string", () => {
        //const testPage = fs.readFileSync('test-parser.md').toString();
        //
        //function test(page){
        //    fs.writeFileSync('test-parser.html', parser.parse(page));
        //}
        //
        //test(testPage);
        expect(1 === 2).toBe(true);
    })
});