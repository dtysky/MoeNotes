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
import configManager from './config';


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
    return lodash.isEqual(a1_tmp, a2_tmp);
}

export function arrayHas(a, e){
    return a.indexOf(e) > -1;
}

export function stringToColor(string, sla){
    const s = sla[0];
    const l = sla[1];
    const a = sla[2];
    const config = configManager.getConfig();
    const hueRange = config.hueRange[1] - config.hueRange[0];
    const hueStart = config.hueRange[0];
    const hue = Math.round(stringHash(string) % hueRange) + hueStart;
    let color = colorSpace.hsl.rgb([hue, s, l]).map(num => parseInt(num));
    color.push(a);
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
        let data = message + "\n\n";
        data = moment().format("YYYY-MM-DD hh:mm:ss") + "\n" +data;
        fs.appendFileSync(file, data);

    };
}