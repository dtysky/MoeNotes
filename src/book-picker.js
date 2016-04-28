/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/4/1
 * Description: Call native APIs.
 */


import { remote } from 'electron';
const dialog = remote.dialog;
import fs from 'fs';
import { bindFunctions, logError } from './utils';
import configManager from './config';

class BookPicker{
    constructor(){
        this.lastPath = "~";
        bindFunctions(
            this,
            [
                "check",
                "show",
                "create",
                "open"
            ],
            logError(configManager.getSysConfig().logPath)
        );
    }

    check(){
        if(!fs.existsSync(this.lastPath)){
            this.lastPath = "~";
        }
    }

    show(mode, title, callback){
        this.check();
        dialog.showOpenDialog(
            {
                title: title,
                defaultPath: this.lastPath,
                properties: mode
            },
            paths => {
                if(paths === undefined){
                    callback(null);
                }
                const dp = paths[0];
                this.lastPath = dp;
                callback(dp);
            }
        );
    }

    create(callback){
        this.show(
            ["createDirectory", "openDirectory"],
            "Create a book",
            callback
        );
    }

    open(callback){
        this.show(
            ["openDirectory"],
            "Open a book",
            callback
        );
    }
}

export default (new BookPicker());