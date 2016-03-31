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


export default class StorageTop {
    constructor(treePath){
        this.treePath = treePath;
        this.books = {};
        this.cache = {};
        this.nowBook = null;
        this.load();
        bindFunctions(
            this,
            [
                "load",
                "createTree",
                "parser",
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
            this.save();
        }
        else{
            this.parse();
        }
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
        let treeRecord = JSON.parse(
            fs.readFileSync(this.treePath, "utf8")
        );
        treeRecord.indexes.forEach(index => {
            if(!fs.existsSync(index)){
                treeRecord.indexes.splice(
                    treeRecord.indexes.indexOf(index)
                );
                delete treeRecord.names[index];
            }
            else{
                this.cache[index] = new StorageBook(index);
            }
        });
        this.books = treeRecord;
        if(this.books.indexes.length === 0){
            this.books.now = "";
        }
        else if(!arrayHas(this.books.indexes, this.books.now)){
            this.books.now = this.books.indexes[0];
        }
        this.nowBook = this.cache[this.books.now];
    }

    getIndexes() {
        return this.books.indexes;
    }

    has(index){
        return this.books.indexes.indexOf(index) > -1;
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

    create(dp, name) {
        this.books.indexes.push(dp);
        this.books.names[dp] = name;
        this.cache[dp] = new StorageBook(dp);
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