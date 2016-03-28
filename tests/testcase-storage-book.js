/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/28
 * Description:
 */

import mock from 'mock-fs';

export function initWithoutTree(){
    mock({
        book1: {
            cp1: {
                "page1.md": "Here is page1 in cp1",
                "page2.md": "Here is page2 in cp1"
            },
            cp2: {
                "page1.md": "Here is page1 in cp2",
                "page2.md": "Here is page2 in cp2"
            }
        }
    })
}

export const filesWithoutTree = {
    book1: {
        cp1: {
            "page1.md": "Here is page1 in cp1",
            "page2.md": "Here is page2 in cp1"
        },
        cp2: {
            "page1.md": "Here is page1 in cp2",
            "page2.md": "Here is page2 in cp2"
        }
    }
};

export const treeWithoutTree = {
    index: "book1",
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
                "page2"
            ]
        },
        cp2: {
            now: "page2",
            indexes: [
                "page1",
                "page2"
            ]
        }
    }
};