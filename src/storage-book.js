/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


import path from 'path';
import deepcopy from 'deepcopy';
import fs from 'fs';
import rmdir from 'rimraf';
import { getDirectories, getFiles, arrayIsEqual, arrayHas, arrayIsLike, bindFunctions } from './utils';


export default class StorageBook{
    constructor(dp){
        this.book = {};
        this.load(dp);
        bindFunctions(
            this,
            [
                "load",
                "createTree",
                "parse",
                "getIndexes",
                "getNow",
                "getPath",
                "readNowPage",
                "setIndexes",
                "has",
                "isEmpty",
                "canNotRemove",
                "change",
                "save",
                "createToDevice",
                "create",
                "removeFromDevice",
                "remove",
                "renameFromDevice",
                "rename"
            ]
        );
    }

    load(dp) {
        const treePath = path.join(dp, ".tree");
        if (!fs.existsSync(treePath)){
            fs.writeFileSync(
                treePath,
                JSON.stringify(this.createTree(dp))
            );
        }
        this.book = this.parse(dp);
    }

    createTree(dp){
        let book = {};
        book.root = dp;
        book.indexes = [];
        book.chapters = {};
        getDirectories(dp).forEach(cp => {
            const files = getFiles(path.join(dp, cp));
            book.indexes.push(cp);
            book.chapters[cp] = {};
            if (files.length === 0){
                book.chapters[cp].indexes = [];
                book.chapters[cp].now = "";
                return;
            }
            book.chapters[cp].indexes = files;
            book.chapters[cp].now = files[0];
        });
        if(book.indexes.length === 0){
            book.now = "";
        }
        else{
            book.now = book.indexes[0];
        }
        return book;
    }

    recreateIndexesWithNow(oldObj, newObj){
        if(arrayIsLike(oldObj.indexes, newObj.indexes)){
            return oldObj;
        }
        oldObj.indexes = newObj.indexes;
        if(!arrayHas(newObj.indexes, oldObj.now)){
            oldObj.now = newObj.now;
        }
        return oldObj;
    }

    parse(dp){
        const treePath = path.join(dp, ".tree");
        let treeRecord = JSON.parse(
            fs.readFileSync(treePath, "utf8")
        );
        let treeNow = this.createTree(dp);
        treeRecord = this.recreateIndexesWithNow(treeRecord, treeNow);
        for(let key in treeRecord.chapters){
            if(!arrayHas(treeNow.indexes, key)){
                treeRecord.indexes.splice(
                    treeRecord.indexes.indexOf(key) ,1
                );
                delete treeRecord.chapters[key];
                continue;
            }
            treeRecord.chapters[key] = this.recreateIndexesWithNow(
                treeRecord.chapters[key],
                treeNow.chapters[key]
            );
        }
        for(let key in treeNow.chapters){
            if(!arrayHas(treeRecord.indexes, key)){
                treeRecord.indexes.push(key);
                treeRecord.chapters[key] = treeNow.chapters[key];
            }
        }
        return treeRecord;
    }

    getNow(chapter) {
        if(chapter === undefined){
            return this.book.now;
        }
        return this.book.chapters[chapter].now;
    }

    getPath(name, chapter) {
        if(chapter === undefined){
            return path.join(
                this.book.root,
                name
            );
        }
        return path.join(
            this.book.root,
            chapter,
            name + ".md"
        );
    }

    getIndexes(chapter) {
        if(chapter === undefined){
            return deepcopy(this.book.indexes);
        }
        return deepcopy(this.book.chapters[chapter].indexes);
    }

    setIndexes(indexes, chapter) {
        if(chapter === undefined){
            if(!arrayIsLike(indexes, this.book.indexes)){
                throw new Error(
                    `New book's indexes must be similar to old one !\n${indexes}\n${this.book.indexes}`
                );
            }
            this.book.indexes = indexes;
            return;
        }
        if(!arrayIsLike(indexes, this.getIndexes(chapter))) {
            throw new Error(
                `New chapter's indexes must be similar to old one !\n${indexes}\n${this.book.chapters[chapter].indexes}`
            );
        }
        this.book.chapters[chapter].indexes = indexes;
    }

    readNowPage(){
        const chapter = this.getNow();
        return fs.readFileSync(
            this.getPath(this.getNow(chapter), chapter),
            "utf8"
        );
    }

    save(text){
        const chapter = this.getNow();
        fs.writeFileSync(
            this.getPath(this.getNow(chapter), chapter),
            text
        );
        const treePath = path.join(this.book.root, ".tree");
        fs.writeFileSync(
            treePath,
            JSON.stringify(this.book)
        );
    }

    has(name, chapter) {
        if(chapter === undefined){
            return this.book.indexes.indexOf(name) > -1;
        }
        return this.book.chapters[chapter].indexes.indexOf(name) > -1;
    }

    isEmpty(chapter) {
        if(chapter === undefined){
            return this.book.indexes.length === 0;
        }
        return this.book.chapters[chapter].indexes.length === 0;
    }

    canNotRemove(chapter) {
        if(chapter === undefined){
            return this.book.indexes.length === 1;
        }
        return this.book.chapters[chapter].indexes.length === 1;
    }

    change(name, chapter) {
        if(chapter === undefined){
            this.book.now = name;
            return;
        }
        this.book.chapters[chapter].now = name;
    }

    createToDevice(type, name) {
        let newPath = path.join(this.book.root, name);
        if(type === "folder"){
            fs.mkdir(newPath);
        }
        else{
            fs.writeFileSync(newPath + ".md", "# ");
        }
    }

    create(no, name, chapter) {
        if(chapter === undefined){
            this.book.indexes.splice(no, 0, name);
            this.book.chapters[name] = {
                indexes: [],
                now: ""
            };
            this.createToDevice("folder", name);
            return;
        }
        this.book.chapters[chapter].indexes.splice(no, 0, name);
        this.createToDevice(
            "file",
            path.join(chapter, name)
        );
    }

    removeFromDevice(type, name) {
        let nowPath = path.join(this.book.root, name);
        if(type === "file"){
            fs.unlinkSync(nowPath + ".md");
        }
        else{
            rmdir.sync(nowPath);
        }
    }

    remove(name, chapter) {
        let i;
        if(chapter === undefined){
            i = this.book.indexes.indexOf(name);
            this.book.indexes.splice(i, 1);
            delete this.book.chapters[name];
            this.removeFromDevice(
                "folder",
                name
            );
            return;
        }
        i = this.book.chapters[chapter].indexes.indexOf(name);
        this.book.chapters[chapter].indexes.splice(i, 1);
        this.removeFromDevice(
            "file",
            path.join(chapter, name)
        );
    }

    renameFromDevice(oldname, name) {
        let oldPath = path.join(this.book.root, oldname);
        let newPath = path.join(this.book.root, name);
        fs.rename(oldPath, newPath);
    }

    rename(oldName, name, chapter) {
        let i;
        if(chapter === undefined){
            i = this.book.indexes.indexOf(oldName);
            this.book.indexes[i] = name;
            this.book.chapters[name] = deepcopy(this.book.chapters[oldName]);
            delete this.book.chapters[oldName];
            this.renameFromDevice(
                oldName,
                name
            );
            return;
        }
        i = this.book.chapters[chapter].indexes.indexOf(oldName);
        this.book.chapters[chapter].indexes[i] = name;
        this.renameFromDevice(
            path.join(chapter, oldName) + ".md",
            path.join(chapter, name) + ".md"
        );
    }
}