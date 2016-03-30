/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


import path from 'path';
import deepcopy from 'deepcopy';


export class StorageTop {
    constructor(){
        this.books = {
            indexes: [
                "test1",
                "test2",
                "test3",
                "test4"
            ],
            names: {
                test1: "book1",
                test2: "book22",
                test3: "book333",
                test4: "book4444"
            },
            paths: {
                test1: "./book1",
                test2: "./book2",
                test3: "./book3",
                test4: "./book4"
            }
        };
    }

    load() {
        //如果已经存在.tree

        //否则,创建

    }

    parse(){
        var tmp = {
            root: dp,
            nowChapter: dp + "/" + "test1",
            indexes: [],
            chapters: {}
        };
        ["test1", "test2", "test3", "test4"].forEach((name) => {
            tmp.indexes.push(dp +"/" + name);
            tmp.chapters[dp +"/" + name] = {
                indexes: [
                    name + "test1",
                    name + "test2",
                    name + "test3",
                    name + "test4"
                ],
                nowPage: name
            };
        });
        return tmp;
    }

    getNow(){
        return this.nowBook.index;
    }

    getIndexes() {
        return this.books.indexes;
    }

    getName(index) {
        return this.books.names[index];
    }

    isEmpty() {
        return this.books.indexes.length === 0;
    }

    change(index) {
        if(index === this.nowBook.index){
            return;
        }
        this.nowBook = this.parse(
            this.books.paths[index]
        );
        this.nowBook.index = index;
    }

    create(name) {
        var nowPath = path.join(this.nowBook.root, name);
        //create
    }

    remove(index) {
        const i = this.books.indexes.indexOf(index);
        this.books.indexes.splice(i, 1);
        delete this.books.names[index];
        delete this.books.paths[index];
    }

    rename(index, name) {
        this.books.names[index] = name;
    }
    
}