/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/18
 * Description: Manage pages.
 */


function Storage() {
    //name: path
    this.books = {};
    //{indexes, {name, path}}
    this.book_now = {
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

Storage.prototype.create = function(type, fp) {

};

Storage.prototype.createBook = function(name, fp) {

};

Storage.prototype.createChapter = function(book, name) {

};

Storage.prototype.createPage = function(book, chapter, name) {

};

Storage.prototype.setBookIndexes = function(indexes) {
    this.book_now.indexes = indexes;
};

Storage.prototype.setChapterIndexes = function(chapter, indexes) {
    this.book_now.chapters[chapter].indexes = indexes;
};

Storage.prototype.remove = function(type, fp) {

};

Storage.prototype.rename = function(type, name, fp) {

};

module.exports = new Storage();