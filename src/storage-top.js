/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


import path from 'path';
import deepcopy from 'deepcopy';
import fs from 'fs';
import StorageBook from './storage-book';
import { getDirectories, getFiles, getNameFromPath, arrayIsEqual, arrayHas, arrayIsLike, bindFunctions } from './utils';
import { createObjectWithErrorHandler, logError } from './utils';
import configManager from './config';


export default class StorageTop {
    constructor(treePath){
        this.treePath = treePath;
        this.books = {};
        this.cache = {};
        this.nowBook = {};
        this.load();
        bindFunctions(
            this,
            [
                "load",
                "createTree",
                "parse",
                "getNow",
                "getIndexes",
                "getName",
                "has",
                "isEmpty",
                "change",
                "save",
                "create",
                "remove",
                "rename"
            ]
        );
    }

    load(){
        if(!fs.existsSync(this.treePath)){
            this.books = this.createTree();
        }
        else{
            this.parse();
        }
        this.save();
    }

    //indexes: books' paths
    createTree(){
        let books = {
            now: "",
            indexes: [],
            names: {}
        };
        return books;
    }

    parse(){
        let treeRecord;
        try{
            treeRecord = JSON.parse(
                fs.readFileSync(this.treePath, "utf8")
            );
        }
        catch(e){
            treeRecord = this.createTree();
        }
        treeRecord.indexes.forEach(index => {
            if(!fs.existsSync(index)){
                treeRecord.indexes.splice(
                    treeRecord.indexes.indexOf(index)
                );
                delete treeRecord.names[index];
            }
            else{
                this.cache[index] = createObjectWithErrorHandler(
                    new StorageBook(index), logError(configManager.getSysConfig().logPath)
                );
            }
        });
        this.books = treeRecord;
        if(this.books.indexes.length === 0){
            this.books.now = "";
        }
        else if(!arrayHas(this.books.indexes, this.books.now)){
            this.books.now = this.books.indexes[0];
            this.nowBook = this.cache[this.books.now];
        }
        else{
            this.nowBook = this.cache[this.books.now];
        }
    }

    getIndexes() {
        return this.books.indexes;
    }

    has(index){
        return this.books.indexes.indexOf(index) > -1;
    }

    getNow() {
        return this.books.now;
    }

    getName(index) {
        return this.books.names[index];
    }

    isEmpty() {
        return this.books.indexes.length === 0;
    }

    change(index) {
        this.books.now = index;
        this.nowBook = this.cache[index];
    }

    save(){
        fs.writeFileSync(
            this.treePath,
            JSON.stringify(this.books)
        );
    }

    create(dp) {
        this.books.indexes.push(dp);
        this.books.names[dp] = getNameFromPath(dp);
        this.cache[dp] = createObjectWithErrorHandler(
            new StorageBook(dp), logError(configManager.getSysConfig().logPath)
        );
    }

    remove(index) {
        const i = this.books.indexes.indexOf(index);
        this.books.indexes.splice(i, 1);
        delete this.books.names[index];
        delete this.cache[index];
    }

    rename(index, name) {
        this.books.names[index] = name;
    }
    
}