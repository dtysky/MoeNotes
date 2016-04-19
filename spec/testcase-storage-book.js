/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/28
 * Description:
 */

import mock from 'mock-fs';

const filesWithoutTree = {
    book1: {
        cp1: {
            "page1.md": "Here is page1 in cp1",
            "page2.md": "Here is page2 in cp1"
        },
        cp2: {
            "page1.md": "Here is page1 in cp2",
            "page2.md": "Here is page2 in cp2",
            "page3.x": "This page will not be parsed"
        },
        cp3: {}
    }
};

export function initWithoutTree(){
    mock(filesWithoutTree);
}

export { filesWithoutTree };

export const treeWithoutTree = {
    root: "book1",
    now: "cp1",
    indexes: [
        "cp1",
        "cp2",
        "cp3"
    ],
    chapters: {
        cp1: {
            now: "page1",
            indexes: [
                "page1",
                "page2"
            ]
        },
        cp2: {
            now: "page1",
            indexes: [
                "page1",
                "page2"
            ]
        },
        cp3: {
            now: "",
            indexes: []
        }
    }
};


const treeWithTree = {
    root: "book1",
    now: "cp1",
    indexes: [
        "cp1",
        "cp2"
    ],
    chapters: {
        cp1: {
            now: "page1",
            indexes: [
                "page1",
                "page3"
            ]
        },
        cp2: {
            now: "page1",
            indexes: [
                "page1",
                "page3"
            ]
        }
    }
};

const treeFilesWithErrorTree= `
    root: "book1",
    now: "cp3",
    indexes: [
        "cp1"
    ],
    chapters: {
        cp1: {
            now: "page1",
            indexes: [
                "page1"
            ]
        }
    }`;

export const filesWithErrorTree = {
    book1: {
        cp1: {
            "page1.md": "Here is page1 in cp1"
        },
        ".tree": treeFilesWithErrorTree
    }
};

export function initWithErrorTree() {
    mock(filesWithErrorTree);
}

export const treeWithError = {
    root: "book1",
    now: "cp1",
    indexes: [
        "cp1"
    ],
    chapters: {
        cp1: {
            now: "page1",
            indexes: [
                "page1"
            ]
        }
    }
};


const treeFilesWithTree= {
    root: "book1",
    now: "cp3",
    indexes: [
        "cp1",
        "cp2",
        "cp3"
    ],
    chapters: {
        cp1: {
            now: "page1",
            indexes: [
                "page1",
                "page2"
            ]
        },
        cp2: {
            now: "page2",
            indexes: [
                "page1",
                "page2"
            ]
        },
        cp3: {
            now: "",
            indexes: []
        }
    }
};

const filesWithTree = {
    book1: {
        cp1: {
            "page1.md": "Here is page1 in cp1",
            "page3.md": "Here is page3 in cp1"
        },
        cp2: {
            "page1.md": "Here is page1 in cp2",
            "page3.md": "Here is page3 in cp2"
        },
        ".tree": JSON.stringify(treeFilesWithTree)
    }
};

export function initWithTree(){
    mock(filesWithTree);
}

export { filesWithTree, treeWithTree };


const filesEmpty = {
    book1: {}
};

export function initEmpty(){
    mock(filesEmpty);
}

export { filesEmpty };

export const treeEmpty = {
    root: "book1",
    now: "",
    indexes: [],
    chapters: {}
};