/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Some useful tools.
 */

import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import deepcopy from 'deepcopy';

export function bindFunctions(self, methods){
    methods.forEach(method => {
        self[method] = self[method].bind(self);
    });
}

export function getDirectories(dp) {
    return fs.readdirSync(dp).filter(file => {
        return fs.statSync(path.join(dp, file)).isDirectory();
    });
}

export function getFiles(dp) {
    return fs.readdirSync(dp).filter(file => {
        if(!fs.statSync(path.join(dp, file)).isFile()){
            return null;
        }
        if (file.replace(/^.*\./, '') !== "md"){
            return null;
        }
        return file;
    }).map(file => {
        return file.replace(".md", '');
    });
}

export function getNameFromPath(p) {
    return p.replace(/^.*[\\\/]/, '');
}

export function arrayIsEqual(a1, a2){
    return lodash.isEqual(a1, a2);
}

export function arrayIsLike(a1, a2){
    let a1_tmp = deepcopy(a1).sort();
    let a2_tmp = deepcopy(a2).sort();
    return lodash.isEqual(a1_tmp, a2_tmp)
}

export function arrayHas(a, e){
    return a.indexOf(e) > -1;
}