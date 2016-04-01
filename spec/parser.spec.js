/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Testing for parser.
 */


import parse from '../src/parser';
import { markdown, html } from './testcase-parser';
import { DomIsEqual } from './utils';

import fs from 'fs';

describe("parser", () => {
    it("Should return html base on markdown string", () => {
        expect(
            DomIsEqual(parse(markdown), html)
        ).toBeTruthy();
    })
});