/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/26
 * Description:
 */

import StorageBook from '../src/storage-book';
import mock from 'mock-fs';
import deepcopy from 'deepcopy';
import { initWithoutTree, filesWithoutTree, treeWithoutTree } from './testcase-storage-book';
import { objectIsEqual, loadBook } from './utils';

describe("StorageBook ", () => {
    let tree = null;
    let files = null;
    let storage = null;
    describe("Without tree", () => {
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
        });

        afterEach(mock.restore);
    });
});