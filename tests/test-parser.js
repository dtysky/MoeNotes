/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Testing for parser.
 */


import parse from '../src/parser';
import { markdown, html } from './testcase-parser';

describe("parser", () => {
    it("Should return html base on markdown string", () => {
        var domParser = new DOMParser();
        expect(
            domParser.parseFromString(parse(markdown), "text/xml").isEqualNode(
                domParser.parseFromString(html, "text/xml")
            )
        ).toBe(true);
    })
});