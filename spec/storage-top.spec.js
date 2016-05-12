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
import { initWithoutTree, filesWithoutTree, treeWithoutTree } from './testcase-storage-top';
import { initWithTree, filesWithTree, treeWithTree } from './testcase-storage-top';
import { initWithErrorTree, filesWithErrorTree, treeWithError } from './testcase-storage-top';

import fs from 'fs';

describe("StorageTop ", () => {
    let tree = null;
    let files = null;
    let storage = null;
    describe("With .tree file", () => {
        beforeEach(() => {
            initWithTree();
            tree = deepcopy(treeWithTree);
            files = deepcopy(filesWithTree);
            storage = new StorageTop("user/.tree");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.books, tree)
            ).toBeTruthy();
            expect(
                objectIsEqual(storage.nowBook.book, (new StorageBook("book1")).book)
            ).toBeTruthy();
            const cache = {
                book1: new StorageBook("book1"),
                book2: new StorageBook("book2")
            };
            expect(
                objectIsEqual(Object.getOwnPropertyNames(storage.cache), Object.getOwnPropertyNames(cache))
            ).toBeTruthy();
        });

        it("Get indexes", () => {
            expect(
                arrayIsEqual(storage.getIndexes(), tree.indexes)
            ).toBeTruthy();
        });

        it("Get name", () => {
            expect(storage.getName("book1")).toBe("bookA");
        });

        it("Get now", () => {
            expect(storage.getNow()).toBe("book1");
        });

        it("Has", () => {
            expect(storage.has("book1")).toBeTruthy();
            expect(storage.has("book3")).toBeFalsy();
        });

        it("Is empty", () => {
            expect(storage.isEmpty()).toBeFalsy();
        });

        it("Change", () => {
            storage.change("book2");
            expect(storage.books.now).toBe("book2");
            expect(
                objectIsEqual(storage.nowBook.book, (new StorageBook("book2")).book)
            ).toBeTruthy();
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
            ).toBeTruthy();
        });

        it("Create", () => {
            storage.create("book3");
            tree.indexes = ["book1", "book2", "book3"];
            tree.names.book3 = "book3";
            expect(
                objectIsEqual(storage.books, tree)
            ).toBeTruthy();
            const cache = {
                book1: new StorageBook("book1"),
                book2: new StorageBook("book2"),
                book3: new StorageBook("book3")
            };
            expect(
                objectIsEqual(Object.getOwnPropertyNames(storage.cache), Object.getOwnPropertyNames(cache))
            ).toBeTruthy();
        });

        it("Remove", () => {
            storage.remove("book1");
            tree.indexes = ["book2"];
            delete tree.names.book1;
            expect(
                objectIsEqual(storage.books, tree)
            ).toBeTruthy();
            const cache = {
                book2: new StorageBook("book2")
            };
            expect(
                objectIsEqual(Object.getOwnPropertyNames(storage.cache), Object.getOwnPropertyNames(cache))
            ).toBeTruthy();
        });

        it("Rename", () => {
            storage.rename("book1", "bookX");
            tree.indexes = ["book1", "book2"];
            tree.names.book1 = "bookX";
            expect(
                objectIsEqual(storage.books, tree)
            ).toBeTruthy();
        });

        afterEach(mock.restore);
    });

    describe("Without .tree file", () => {
        beforeEach(() => {
            initWithoutTree();
            tree = deepcopy(treeWithoutTree);
            files = deepcopy(filesWithoutTree);
            storage = new StorageTop("user/.tree");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.books, tree)
            ).toBeTruthy();
            expect(
                objectIsEqual(storage.nowBook, {})
            ).toBeTruthy();
            expect(
                objectIsEqual(storage.cache, {})
            ).toBeTruthy();
        });

        it("Is empty", () => {
            expect(storage.isEmpty()).toBeTruthy();
        });

        afterEach(mock.restore);
    });

    describe("With error .tree file", () => {
        beforeEach(() => {
            initWithErrorTree();
            tree = deepcopy(treeWithError);
            files = deepcopy(filesWithErrorTree);
            storage = new StorageTop("user/.tree");
        });

        it("Initialize", () => {
            expect(
                objectIsEqual(storage.books, tree)
            ).toBeTruthy();
        });

        afterEach(mock.restore);
    });
});