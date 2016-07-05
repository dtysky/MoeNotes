/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/7/5
 * Description:
 */


import { remote } from 'electron';
const dialog = remote.dialog;
import fs from 'fs';
import path from 'path';
import { bindFunctions, getNameFromPath } from '../cores/utils';
import Storage from '../cores/storage';

class FileExporter{
    constructor(){
        bindFunctions(
            this,
            [
                "showSave",
                "create",
                "open",
                "exportFile"
            ]
        );
    }

    showSave(title, callback){
        const chapter = Storage.nowBook.getNow();
        const file = Storage.nowBook.getNow(chapter);
        const fpMarkdown = Storage.nowBook.getPath(file, chapter);
        const fpSave = fpMarkdown.split(".")[0];
        dialog.showSaveDialog(
            {
                title: title,
                defaultPath: fpSave,
                filters: [
                    {name: 'PDF/HTML', extensions: ['pdf', 'html']},
                    {name: 'Light/Dark', extensions: ['light', 'dark']}
                ]
            },
            fp => {
                if(fp === undefined){
                    callback(null);
                    return;
                }
                callback(fp);
            }
        );
    }

    create(callback){
        this.showSave(
            "Create a file",
            callback
        );
    }

    exportFile(){
        this.create(
            fp => {
                console.log(fp);
            }
        );
    }
}

export default (new FileExporter());