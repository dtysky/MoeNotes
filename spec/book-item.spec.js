/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/17
 * Description: Testing for parser.
 */


import BookItem from '../src/book-item';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { initJsdom } from './utils';

describe("Component - BookItem", () => {
    process.env.BROWSER = false;
    initJsdom();
    let component = null;
    beforeEach(() => {
        component = TestUtils.renderIntoDocument(<BookItem/>)
    });

    it("Initialize", () => {

    });

    it("On change", () => {

    });

    it("On submit", () => {

    });

    it("On rename", () => {

    });

    it("On remove", () => {

    });

    it("On select", () => {

    });

    afterEach(() => {

    });
});