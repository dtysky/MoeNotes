/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/26
 * Description:
 */

import StorageBook from '../src/storage-book';
import mock from 'mock-fs';
import deepcopy from 'deepcopy';
import { initWithoutTree, filesWithoutTree, treeWithoutTree } from './testcase-storage-book';
import { initWithTree, filesWithTree, treeWithTree } from './testcase-storage-book';
import { initEmpty, filesEmpty, treeEmpty } from './testcase-storage-book';
import { arrayIsEqual, objectIsEqual, loadBook } from './utils';

import fs from 'fs';

describe("StorageBook ", () => {
    let tree = null;
    let files = null;
    let storage = null;
    describe("Without .tree file", () => {
        beforeEach(() => {
            initWithoutTree();
            tree = deepcopy(treeWithoutTree);
            files = deepcopy(filesWithoutTree);
            storage = new StorageBook("book1");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
            expect(
                objectIsEqual(JSON.parse(fs.readFileSync("book1/.tree")), tree)
            ).toBeTruthy();
        });

        it("Get now", () => {
            storage.book.now = "cp2";
            expect(storage.getNow()).toBe("cp2");
            storage.book.chapters["cp2"].now = "page2";
            expect(storage.getNow("cp2")).toBe("page2");
        });

        it("Get path", () => {
            expect(storage.getPath("cp1")).toBe("book1/cp1");
            expect(storage.getPath("page1", "cp1")).toBe("book1/cp1/page1.md");
        });

        it("Get indexes", () => {
            expect(
                arrayIsEqual(storage.getIndexes(), tree.indexes)
            ).toBeTruthy();
            expect(
                arrayIsEqual(storage.getIndexes("cp1"), tree.chapters.cp1.indexes)
            ).toBeTruthy();
        });

        it("Read nowPage", () => {
            expect(storage.readNowPage()).toBe(files.book1.cp1["page1.md"]);
        });

        it("Set indexes", () => {
            try{
                storage.setIndexes(["cp2", "cp1"]);
            }
            catch(e){
                expect(e.message.split("\n")[0]).toBe("New book's indexes must be similar to old one !");
            }
            storage.setIndexes(["cp3", "cp2", "cp1"]);
            expect(
                arrayIsEqual(storage.getIndexes(), ["cp3", "cp2", "cp1"])
            ).toBeTruthy();
            try{
                storage.setIndexes(["page3", "page1"], "cp1");
            }
            catch(e){
                expect(e.message.split("\n")[0]).toBe("New chapter's indexes must be similar to old one !");
            }
            storage.setIndexes(["page2", "page1"], "cp1");
            expect(
                arrayIsEqual(storage.getIndexes("cp1"), ["page2", "page1"])
            ).toBeTruthy();
        });

        it("Has", () => {
            expect(storage.has("cp1")).toBeTruthy();
            expect(storage.has("cp4")).toBeFalsy();
            expect(storage.has("page1", "cp1")).toBeTruthy();
            expect(storage.has("page3", "cp1")).toBeFalsy();
        });

        it("Is empty", () => {
            storage.book.chapters.cp1.indexes = [];
            expect(storage.isEmpty("cp1")).toBeTruthy();
            expect(storage.isEmpty("cp2")).toBeFalsy();
            expect(storage.isEmpty()).toBeFalsy();
            storage.book.indexes = [];
            expect(storage.isEmpty()).toBeTruthy();
        });

        it("Can not remove", () => {
            storage.book.chapters.cp1.indexes = ["page1"];
            expect(storage.canNotRemove("cp1")).toBeTruthy();
            expect(storage.canNotRemove("cp2")).toBeFalsy();
            expect(storage.canNotRemove()).toBeFalsy();
            storage.book.indexes = ["cp1"];
            expect(storage.canNotRemove()).toBeTruthy();
        });

        it("Change", () => {
            storage.change("cp2");
            expect(storage.getNow()).toBe("cp2");
            storage.change("page2", "cp2");
            expect(storage.getNow("cp2")).toBe("page2");
        });

        it("Save", () => {
            storage.setIndexes(["cp3", "cp2", "cp1"]);
            storage.save("Page1 in cp1 has been changed !");
            storage.load("book1");
            expect(
                arrayIsEqual(storage.getIndexes(), ["cp3", "cp2", "cp1"])
            ).toBeTruthy();
            expect(storage.readNowPage()).toBe("Page1 in cp1 has been changed !");
        });

        it("Create", () => {
            storage.create(0, "cp0");
            tree.indexes = ["cp0", "cp1", "cp2", "cp3"];
            tree.chapters["cp0"] = {
                indexes: [],
                now: ""
            };
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
            files.book1.cp0 = {};
            expect(
                objectIsEqual(loadBook("book1"), files)
            ).toBeTruthy();
            storage.create(0, "page0", "cp0");
            tree.chapters.cp0.indexes = ["page0"];
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
            files.book1.cp0["page0.md"] = "# ";
            expect(
                objectIsEqual(loadBook("book1"), files)
            ).toBeTruthy();
        });

        it("Remove", () => {
            storage.remove("cp1");
            tree.indexes = ["cp2", "cp3"];
            delete tree.chapters.cp1;
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
            delete files.book1.cp1;
            expect(
                objectIsEqual(loadBook("book1"), files)
            ).toBeTruthy();
            storage.remove("page1", "cp2");
            tree.chapters.cp2.indexes = ["page2"];
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
            delete files.book1.cp2["page1.md"];
            expect(
                objectIsEqual(loadBook("book1"), files)
            ).toBeTruthy();
        });

        it("Rename", () => {
            storage.rename("cp1", "cp0");
            tree.indexes = ["cp0", "cp2", "cp3"];
            tree.chapters.cp0 = tree.chapters.cp1;
            delete tree.chapters.cp1;
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
            files.book1.cp0 = files.book1.cp1;
            delete files.book1.cp1;
            expect(
                objectIsEqual(loadBook("book1"), files)
            ).toBeTruthy();
            storage.rename("page1", "page0", "cp2");
            tree.chapters.cp2.indexes = ["page0", "page2"];
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
            files.book1.cp2["page0.md"] = files.book1.cp2["page1.md"];
            delete files.book1.cp2["page1.md"];
            expect(
                objectIsEqual(loadBook("book1"), files)
            ).toBeTruthy();
        });

        afterEach(mock.restore);
    });

    describe("With .tree file", () => {
        beforeEach(() => {
            initWithTree();
            tree = deepcopy(treeWithTree);
            files = deepcopy(filesWithTree);
            storage = new StorageBook("book1");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
        });

        afterEach(mock.restore);
    });

    describe("Empty dir", () => {
        beforeEach(() => {
            initEmpty();
            tree = deepcopy(treeEmpty);
            files = deepcopy(filesEmpty);
            storage = new StorageBook("book1");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.book, tree)
            ).toBeTruthy();
        });

        afterEach(mock.restore);
    });
});