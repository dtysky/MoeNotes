/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/26
 * Description:
 */

import StorageTop from '../src/storage-top';
import StorageBook from '../src/storage-book';
import mock from 'mock-fs';
import deepcopy from 'deepcopy';
import { arrayIsEqual, objectIsEqual, loadBook } from './utils';
import { initWithoutTree, filesWithoutTree, treeWithoutTree } from './testcase-storage-book';
import { initWithTree, filesWithTree, treeWithTree } from './testcase-storage-book';

import fs from 'fs';

describe("StorageBook ", () => {
    let tree = null;
    let files = null;
    let storage = null;
    describe("With .tree file", () => {
        beforeEach(() => {
            initWithTree();
            tree = deepcopy(treeWithTree);
            files = deepcopy(filesWithTree);
            storage = new StorageTop("config/.tree");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.book, tree)
            ).toBe(true);
            expect(
                objectIsEqual(JSON.parse(fs.readFileSync("./.tree")), tree)
            ).toBe(true);
            expect(
                objectIsEqual(storage.nowBook, new StorageBook("book1"))
            ).toBe(true);
            const cache = {
                book1: new StorageBook("book1"),
                book2: new StorageBook("book2")
            };
            expect(
                objectIsEqual(storage.cache, cache)
            ).toBe(true);
        });

        it("Get indexes", () => {
            expect(
                arrayIsEqual(storage.getIndexes(), tree.indexes)
            ).toBe(true);
        });

        it("Get name", () => {
            expect(storage.getName("book1")).toBe("bookA");
        });

        it("Has", () => {
            expect(storage.has("book1")).toBe(true);
            expect(storage.has("book2")).toBe(false);
        });

        it("Is empty", () => {
            expect(storage.isEmpty()).toBe(false);
        });

        it("Change", () => {
            storage.change("book2");
            expect(storage.now).toBe("book2");
            expect(
                objectIsEqual(storage.nowBook, new StorageBook("book2"))
            ).toBe(true);
        });

        it("Save", () => {
            const books = {
                now: "",
                indexes: [],
                names: []
            };
            storage.books = books;
            storage.save();
            storage.load();
            expect(
                objectIsEqual(storage.books, books)
            ).toBe(true);
        });

        it("Create", () => {
            storage.create("book4", "bookD");
            tree.indexes = ["book1", "book2", "book4"];
            tree.names.book4 = "bookD";
            expect(
                objectIsEqual(storage.book, tree)
            ).toBe(true);
            const cache = {
                book1: new StorageBook("book1"),
                book2: new StorageBook("book2"),
                book3: new StorageBook("book4")
            };
            expect(
                objectIsEqual(storage.cache, cache)
            ).toBe(true);
        });

        it("Remove", () => {
            storage.remove("book1");
            tree.indexes = ["book2"];
            delete tree.names.book1;
            expect(
                objectIsEqual(storage.book, tree)
            ).toBe(true);
            const cache = {
                book2: new StorageBook("book2")
            };
            expect(
                objectIsEqual(storage.cache, cache)
            ).toBe(true);
        });

        it("Rename", () => {
            storage.rename("book1", "bookX");
            tree.indexes = ["book1", "book2"];
            tree.names.book1 = "bookX";
            expect(
                objectIsEqual(storage.book, tree)
            ).toBe(true);
        });

        afterEach(mock.restore);
    });

    describe("Without .tree file", () => {
        beforeEach(() => {
            initWithoutTree();
            tree = deepcopy(treeWithoutTree);
            files = deepcopy(filesWithoutTree);
            storage = new StorageTop("config/.tree");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.book, tree)
            ).toBe(true);
        });

        it("Is empty", () => {
            expect(storage.isEmpty()).toBe(true);
        });

        afterEach(mock.restore);
    });

});