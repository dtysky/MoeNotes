/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Some useful tools.
 */

import fs from 'fs';
import path from 'path';


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
        return file.replace(/^.*[\\\/].*\./, '') === "md";
    });
}

export function getNameFromPath(p) {
    return p.replace(/^.*[\\\/]/, '');
}

export function arrayIsEqual(a1, a2){
    return a1.toString() === a2.toString();
}

export function arrayHas(a, e){
    return a.indexOf(e) > -1;
}