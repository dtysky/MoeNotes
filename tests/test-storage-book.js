/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/26
 * Description:
 */

import StorageBook from '../src/storage-book';
import mock from 'mock-fs';
import deepcopy from 'deepcopy';
import { initWithoutTree, filesWithoutTree, treeWithoutTree } from './testcase-storage-book';

describe("StorageBook ", () => {
    let tree = null;
    describe("Without tree", () => {
        beforeEach(() => {
            filesWithoutTree();
            tree = deepcopy(tree);
        });
        it("Load, ", () => {

        });
        afterEach(mock.restore);
    });
});