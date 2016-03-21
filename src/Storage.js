/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


const path = require('path');


function Storage() {
    //name: path
    this.books = {};
    //{indexes, {name, path}}
    this.nowBook = {
        root: ".",
        indexes: [
            "test1",
            "test2",
            "test3",
            "test4"
        ],
        chapters: {
            test1: {
                indexes: [
                    "test1",
                    "test2",
                    "test3",
                    "test4"
                ]
            },
            test2: {
                indexes: [
                    "test1",
                    "test2",
                    "test3",
                    "test4"
                ]
            },
            test3: {
                indexes: [
                    "test1",
                    "test2",
                    "test3",
                    "test4"
                ]
            },
            test4: {
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

Storage.prototype.getChapter = function(name) {
    return this.nowBook.chapters[name].indexes;
};

Storage.prototype.create = function(type, fp) {

};

Storage.prototype.createBook = function(name, fp) {

};

Storage.prototype.createChapter = function(book, name) {

};

Storage.prototype.createPage = function(book, chapter, name) {

};

Storage.prototype.setBookIndexes = function(indexes) {
    this.nowBook.indexes = indexes;
};

Storage.prototype.setChapterIndexes = function(chapter, indexes) {
    this.nowBook.chapters[chapter].indexes = indexes;
};

Storage.prototype.remove = function(name) {
    var nowPath = path.join(this.nowBook.root, name);
    //remove
};

Storage.prototype.removePage = function(chapter, name) {
    var i = this.nowBook.chapters[chapter].indexes.indexOf(name);
    this.nowBook.chapters[chapter].indexes.splice(i, 1);
    this.remove(
        path.join(chapter, name)
    );
};

Storage.prototype.rename = function(oldname, name) {
    var oldPath = path.join(this.nowBook.root, oldname);
    var newPath = path.join(this.nowBook.root, name);
    //rename
};

Storage.prototype.renamePage = function(chapter, oldName, name) {
    var i = this.nowBook.chapters[chapter].indexes.indexOf(oldName);
    this.nowBook.chapters[chapter].indexes[i] = name;
    this.rename(
        path.join(chapter, oldName),
        path.join(chapter, name)
    );
};

module.exports = new Storage();