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
            ).toBe(true);
            expect(
                objectIsEqual(JSON.parse(fs.readFileSync("book1/.tree")), tree)
            ).toBe(true);
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
            ).toBe(true);
            expect(
                arrayIsEqual(storage.getIndexes("cp1"), tree.chapters.cp1.indexes)
            ).toBe(true);
        });

        it("Read nowPage", () => {
            expect(storage.readNowPage()).toBe(files.book1.cp1["page1.md"]);
        });

        it("Set indexes", () => {
            storage.setIndexes(["cp3", "cp2", "cp1"]);
            expect(
                arrayIsEqual(storage.getIndexes(), ["cp3", "cp2", "cp1"])
            ).toBe(true);
            storage.setIndexes(["page2", "page1"], "cp1");
            expect(
                arrayIsEqual(storage.getIndexes("cp1"), ["page2", "page1"])
            ).toBe(true);
        });

        it("Has", () => {
            expect(storage.has("cp1")).toBe(true);
            expect(storage.has("cp4")).toBe(false);
            expect(storage.has("page1", "cp1")).toBe(true);
            expect(storage.has("page3", "cp1")).toBe(false);
        });

        it("Is empty", () => {
            storage.book.chapters.cp1.indexes = [];
            expect(storage.isEmpty("cp1")).toBe(true);
            expect(storage.isEmpty("cp2")).toBe(false);
            expect(storage.isEmpty()).toBe(false);
            storage.book.indexes = [];
            expect(storage.isEmpty()).toBe(true);
        });

        it("Can not remove", () => {
            storage.book.chapters.cp1.indexes = ["page1"];
            expect(storage.canNotRemove("cp1")).toBe(true);
            expect(storage.canNotRemove("cp2")).toBe(false);
            expect(storage.canNotRemove()).toBe(false);
            storage.book.indexes = ["cp1"];
            expect(storage.canNotRemove()).toBe(true);
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
            ).toBe(true);
            expect(storage.readNowPage()).toBe("Page1 in cp1 has been changed !");
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
            ).toBe(true);
        });

        afterEach(mock.restore);
    });
});