/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/28
 * Description:
 */

import mock from 'mock-fs';

const filesWithoutTree = {
    book1: {},
    book2: {},
    config: {}
};

export function initWithoutTree(){
    mock(filesWithoutTree);
}

export { filesWithoutTree };

export const treeWithoutTree = {
    now: "",
    indexes: [],
    names: {}
};


const treeWithTree = {
    now: "book1",
    indexes: [
        "book1",
        "book2"
    ],
    names: {
        book1: "bookA",
        book2: "bookB"
    }
};

const treeFilesWithTree= {
    now: "book4",
    indexes: [
        "book1",
        "book2",
        "book4"
    ],
    names: {
        book1: "bookA",
        book2: "bookB",
        book4: "bookD"
    }
};

const filesWithTree = {
    book1: {},
    book2: {},
    book3: {},
    config: {
        ".tree": JSON.stringify(treeFilesWithTree)
    }
};

export function initWithTree(){
    mock(filesWithTree);
}

export { filesWithTree, treeWithTree };