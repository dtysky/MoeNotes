/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Some useful tools.
 */

import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import deepcopy from 'deepcopy';
import moment from 'moment';
import colorSpace from 'color-space';
import stringHash from 'string-hash';
import configManager from './configManager';
import Storage from './storage';


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
    return lodash.isEqual(a1_tmp, a2_tmp);
}

export function arrayHas(a, e){
    return a.indexOf(e) > -1;
}

export function stringToColor(string, colorConstraints){
    const config = configManager.getConfig();
    let mode = config.CDCMode;
    let CDC = config.CDCRange;
    const c1 = colorConstraints[0];
    const c2 = colorConstraints[1];
    const alpha = colorConstraints[2];
    if(colorConstraints[3] !== undefined){
        if(typeof colorConstraints[3] === "string"){
            mode = colorConstraints[3];
        }
        else{
            CDC = colorConstraints[3];
        }
    }
    if(colorConstraints[4] !== undefined){
        CDC = colorConstraints[4];
    }
    const CDCRange = CDC[1] - CDC[0];
    const CDCStart = CDC[0];
    const d = Math.round(stringHash(string) % CDCRange) + CDCStart;
    let color;
    if(mode === "hue"){
        color = colorSpace.hsl.rgb([d, c1, c2]).map(num => parseInt(num));
    }
    else if(mode === "saturation"){
        color = colorSpace.hsl.rgb([c1, d, c2]).map(num => parseInt(num));
    }
    else if(mode === "lightness"){
        color = colorSpace.hsl.rgb([c1, c2, d]).map(num => parseInt(num));
    }
    color.push(alpha);
    return "rgba(" + color.join(",") + ")";
}

function tryCatchWrapper(f, handler) {
    return function() {
        try {
            return f.apply(this, arguments);
        } catch(e) {
            return handler(e);
        }
    };
}

export function bindTryCatchWrapper(self, methods, handler) {
    methods.forEach(method => {
        self[method] = tryCatchWrapper(
            self[method], handler
        );
    });
}

export function createObjectWithErrorHandler(obj, handler){
    for(let name in obj){
        const m = obj[name];
        if(typeof m === "function"){
            obj[name] = tryCatchWrapper(m, handler);
        }
    }
    return obj;
}

export function logError(file){
    return function (error){
        const message = error.stack + "\n";
        let data = message + "\n";
        data += `StorageTop:\n${JSON.stringify(Storage.books, null, "    ")}\n`;
        data += `StorageBook:\n${JSON.stringify(Storage.nowBook.book, null, "    ")}\n\n\n`;
        data = moment().format("YYYY-MM-DD hh:mm:ss") + "\n" +data;
        fs.appendFileSync(file, data);
    };
}

export function bindFunctions(self, methods, tryCatchHandler){
    methods.forEach(method => {
        self[method] = self[method].bind(self);
        if(tryCatchHandler){
            self[method] = tryCatchWrapper(
                self[method], tryCatchHandler
            );
        }
    });
}