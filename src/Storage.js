/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


const path = require('path');


function Storage() {
    //name: path
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
    //{indexes, {name, path}}
    this.nowBook = {
        index: "test1",
        root: ".",
        nowChapter: "test1",
        indexes: [
            "test1",
            "test2",
            "test3",
            "test4"
        ],
        chapters: {
            test1: {
                nowPage: "test1",
                indexes: [
                    "test1",
                    "test2",
                    "test3",
                    "test4"
                ]
            },
            test2: {
                nowPage: "test2",
                indexes: [
                    "test1",
                    "test2",
                    "test3",
                    "test4"
                ]
            },
            test3: {
                nowPage: "test3",
                indexes: [
                    "test1",
                    "test2",
                    "test3",
                    "test4"
                ]
            },
            test4: {
                nowPage: "test4",
                indexes: [
                    "test1",
                    "test2",
                    "test3",
                    "test4"
                ]
            }
        }

    };
}


Storage.prototype.loadBook = function(fp) {
    //如果已经存在.tree

    //否则,创建

};

Storage.prototype.getNowBook = function(){
    return this.nowBook.index;
};

Storage.prototype.getBookIndexes = function() {
    return this.books.indexes;
};

Storage.prototype.getBookName = function(index) {
    return this.books.names[index];
};

Storage.prototype.parseBook = function(dp){
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
};

Storage.prototype.changeBook = function(index) {
    if(index === this.nowBook.index){
        return;
    }
    this.nowBook = this.parseBook(
        this.books.paths[index]
    );
    this.nowBook.index = index;
};


Storage.prototype.removeBook = function(index) {
    const i = this.books.indexes.indexOf(index);
    this.books.indexes.splice(i, 1);
    delete this.books.names[index];
    if(index === this.nowBook.index){
        this.nowBook = this.parseBook(
            this.books.paths[this.books.indexes[0]]
        );
        this.nowBook.index = this.books.indexes[0];
    }
};

Storage.prototype.renameBook = function(index, name) {
    this.books.names[index] = name;
};

Storage.prototype.createBook = function(name) {
    var nowPath = path.join(this.nowBook.root, name);
    //create
};

Storage.prototype.getNow = function(chapter) {
    if(chapter === undefined){
        return this.nowBook.nowChapter;
    }
    return this.nowBook.chapters[chapter].nowPage;
};

Storage.prototype.getIndexes = function(chapter) {
    if(chapter === undefined){
        return this.nowBook.indexes;
    }
    return this.nowBook.chapters[chapter].indexes;
};

Storage.prototype.getPath = function(name, chapter) {
    if(chapter === undefined){
        return path.join(
            this.nowBook.root,
            name
        );
    }
    return path.join(
        this.nowBook.root,
        chapter,
        name
    );
};

Storage.prototype.readNowPage = function(){
    const chapter = this.getNow();
    return this.getPath(
        this.getNow(chapter),
        chapter
    );
};

Storage.prototype.createToDevice = function(type, fp) {

};

Storage.prototype.create = function(name, chapter) {
    if(chapter === undefined){
        this.nowBook.indexes.push(name);
        this.createToDevice(
            name
        );
        return;
    }
    this.nowBook.chapters[chapter].indexes.push(name);
    this.createToDevice(
        path.join(chapter, name)
    );
};


Storage.prototype.setIndexes = function(indexes, chapter) {
    if(chapter === undefined){
        this.nowBook.indexes = indexes;
        return;
    }
    this.nowBook.chapters[chapter].indexes = indexes;
};

Storage.prototype.removeFromDevice = function(name) {
    var nowPath = path.join(this.nowBook.root, name);
    //remove
};

Storage.prototype.remove = function(name, chapter) {
    var i;
    if(chapter === undefined){
        i = this.nowBook.indexes.indexOf(name);
        this.nowBook.indexes.splice(i, 1);
        if(name === this.nowBook.nowChapter){
            this.nowBook.nowChapter = this.nowBook.indexes[0];
        }
        this.removeFromDevice(
            name
        );
        return;
    }
    i = this.nowBook.chapters[chapter].indexes.indexOf(name);
    this.nowBook.chapters[chapter].indexes.splice(i, 1);
    if(name === this.nowBook.chapters[chapter].nowPage){
        this.nowBook.chapters[chapter].nowPage = this.nowBook.chapters[chapter].indexes[0];
    }
    this.removeFromDevice(
        path.join(chapter, name)
    );
};

Storage.prototype.renameFromDevice = function(oldname, name) {
    var oldPath = path.join(this.nowBook.root, oldname);
    var newPath = path.join(this.nowBook.root, name);
    //rename
};

Storage.prototype.rename = function(oldName, name, chapter) {
    var i;
    if(chapter === undefined){
        i = this.nowBook.indexes.indexOf(oldName);
        this.nowBook.indexes[i] = name;
        this.renameFromDevice(
            oldName,
            name
        );
        return;
    }
    i = this.nowBook.chapters[chapter].indexes.indexOf(oldName);
    this.nowBook.chapters[chapter].indexes[i] = name;
    this.renameFromDevice(
        path.join(chapter, oldName),
        path.join(chapter, name)
    );
};

Storage.prototype.has = function(name, chapter) {
    if(chapter === undefined){
        return this.nowBook.indexes.indexOf(name) > -1;
    }
    return this.nowBook.chapters[chapter].indexes.indexOf(name) > -1;
};

Storage.prototype.isEmpty = function(chapter) {
    if(chapter === undefined){
        return this.nowBook.indexes.length === 0;
    }
    return this.nowBook.chapters[chapter].indexes.length === 0;
};

Storage.prototype.change = function(name, chapter) {
    if(chapter === undefined){
        this.nowBook.nowChapter = name;
        return;
    }
    this.nowBook.chapters[chapter].nowPage = name;
};

module.exports = new Storage();