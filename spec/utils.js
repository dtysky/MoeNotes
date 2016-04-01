/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/28
 * Description: Useful tools for testing.
 */

import TestUtils from 'react-addons-test-utils';
import lodash from 'lodash';
import path from 'path';
import fs from 'fs';
import jsdom from 'jsdom';

function createDom(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
export { createDom };

export function DomIsEqual(domString1, domString2){
    let dom1 = jsdom.jsdom(domString1).documentElement;
    let dom2 = jsdom.jsdom(domString2).documentElement;
    return dom1.isEqualNode(dom2);
}

export function arrayIsEqual(a1, a2){
    return lodash.isEqual(a1, a2);
}

export function objectIsEqual(obj1, obj2){
    return lodash.isEqual(obj1, obj2);
}

function getDirectories(dp) {
    return fs.readdirSync(dp).filter(file => {
        return fs.statSync(path.join(dp, file)).isDirectory();
    });
}

export function getFiles(dp) {
    return fs.readdirSync(dp).filter(file => {
        if(!fs.statSync(path.join(dp, file)).isFile()){
            return null;
        }
        return file;
    });
}

export function loadBook(dp) {
    let book = {};
    book[dp] = {};
    getDirectories(dp).forEach(cp => {
        book[dp][cp] = {};
        getFiles(path.join(dp, cp)).forEach(f => {
            book[dp][cp][f] = fs.readFileSync(
                path.join(dp, cp, f),
                "utf8"
            );
        });
    });
    return book;
}

export function initJsdom(){
    let window = jsdom.jsdom('<html><head></head><body><divid="rondavu_container"></div></body></html>').defaultView;
    if(Object.keys(window).length === 0){
        throw"jsdom failed to createa usable environment, try uninstall ingand reinstall ingit";
    }
    global.window = window;
    global.document = window.document;
}