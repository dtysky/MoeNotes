/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


import path from 'path';
import deepcopy from 'deepcopy';
import fs from 'fs';
import { getDirectories, getFiles, getNameFromPath, arrayIsEqual, arrayHas } from './utils';

export default class StorageBook{
    constructor(dp){
        this.book = {};
        this.load(dp);
    }

    load(dp) {
        const treePath = path.join(dp, ".tree");
        if (!path.exists(treePath)){
            this.createTree(dp);
            fs.writeFileSync(
                treePath,
                JSON.stringify(this.createTree(dp))
            );
        }
        this.book = this.parse(dp);
    };

    createTree(dp){
        let book = {};
        book.root = dp;
        book.index = getNameFromPath(dp);
        book.indexes = [];
        book.chapters = {};
        getDirectories(dp).forEach(index => {
            const files = getFiles(path.join(dp, index));
            if (files.length === 0){
                return;
            }
            book.indexes.push(index);
            book.chapters.indexes = files;
            book.chapters.now = files[0];
        });
        book.now = book.indexes[0];
    }

    recreateIndexesWithNow(oldObj, newObj){
        if(arrayIsEqual(oldObj.indexes, newObj.indexes)){
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
        let treeRecord = JSON.load(treePath);
        let treeNow = this.createTree(dp);
        treeRecord = this.recreateIndexesWithNow(treeRecord, treeNow);
        for(let key in treeRecord.chapters){
            treeRecord.chapters[key] = this.recreateIndexesWithNow(
                treeRecord.chapters[key],
                treeNow.chapters[key]
            );
        }
        return treeRecord;
    };

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
            name
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
            this.book.indexes = indexes;
            return;
        }
        this.book.chapters[chapter].indexes = indexes;
    }

    readNowPage(){
        const chapter = this.getNow();
        return fs.readFileSync(
            this.getPath(this.getNow(chapter), chapter)
        );
    }

    save(text){
        const chapter = this.getNow();
        fs.writeFileSync(
            this.getPath(this.getNow(chapter), chapter),
            text
        );
        const treePath = path.join(dp, ".tree");
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
        console.log(chapter);
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
            fs.writeFileSync(newPath, "");
        }
    }

    create(no, name, chapter) {
        if(chapter === undefined){
            this.book.indexes.splice(no, 0, name);
            this.book.chapters[name] = {
                indexes: []
            };
            this.createToDevice("folder", name);
            return;
        }
        this.book.chapters[chapter].indexes.splice(no, 0, name);
        this.book.chapters[chapter].now = name;
        this.createToDevice(
            "file",
            path.join(chapter, name)
        );
    }

    removeFromDevice(name) {
        let nowPath = path.join(this.book.root, name);
        fs.unlinkSync(nowPath);
    }

    remove(name, chapter) {
        let i;
        if(chapter === undefined){
            i = this.book.indexes.indexOf(name);
            this.book.indexes.splice(i, 1);
            this.removeFromDevice(
                name
            );
            return;
        }
        i = this.book.chapters[chapter].indexes.indexOf(name);
        this.book.chapters[chapter].indexes.splice(i, 1);
        this.removeFromDevice(
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
            this.renameFromDevice(
                oldName,
                name
            );
            return;
        }
        i = this.book.chapters[chapter].indexes.indexOf(oldName);
        this.book.chapters[chapter].indexes[i] = name;
        this.renameFromDevice(
            path.join(chapter, oldName),
            path.join(chapter, name)
        );
    }
}